import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowUpRight, ChevronLeft, ChevronRight, Github, Link2 } from 'lucide-react';
import { useTranslation } from '../lib/i18n';
import {
  PortfolioExportPacket,
  getPacketActionLinks,
  getPacketSpecialLabAssetSrc,
} from '../lib/portfolioPacket';

const baseLogs = [
  "[INFO] Trading Bot initializing...",
  "[CONNECT] Binance API connected.",
  "[CONNECT] Upbit USDT connected.",
  "[CONNECT] Kiwoom API (국내거래) connected.",
  "[MODE] Switching to trailing strategy...",
  "[ANALYSIS] BTC trending upward, RSI: 58.2",
  "[EXEC] Trailing stop activated at +3.2%",
  "[SUCCESS] Profit secured: +5.8%",
  "[INFO] Portfolio updated.",
  "[WAIT] Monitoring market..."
];

const images = [
  "/crypto-dashboard.png",
  "/crypto-analytics.png"
];

interface SpecialLabProps {
  featuredPacket?: PortfolioExportPacket | null;
  onOpenCaseStudy?: (slug: string) => void;
}

export const SpecialLab: React.FC<SpecialLabProps> = ({ featuredPacket, onOpenCaseStudy }) => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const featuredAssetSrc = featuredPacket ? getPacketSpecialLabAssetSrc(featuredPacket) : null;
  const featuredLinks = featuredPacket ? getPacketActionLinks(featuredPacket).slice(0, 3) : [];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < baseLogs.length) {
        const nextLog = baseLogs[currentIndex];
        if (nextLog) {
          setLogs(prev => [...prev, nextLog]);
        }
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="lab" className="py-24 md:py-32 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {featuredPacket?.homePromotions.specialLab.enabled && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-16 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_32px_90px_-42px_rgba(15,23,42,0.4)]"
          >
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 md:p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-indigo-600">
                  <Link2 size={14} />
                  {featuredPacket.homePromotions.specialLab.badge || 'SPECIAL LAB'}
                </div>
                <h3 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
                  {featuredPacket.homePromotions.specialLab.title}
                </h3>
                <p className="mt-5 max-w-xl text-[15px] leading-8 text-slate-600">
                  {featuredPacket.homePromotions.specialLab.summary}
                </p>

                {featuredPacket.links.builds.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredPacket.links.builds.slice(0, 3).map((build) => (
                      <span
                        key={build.name}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500"
                      >
                        {build.displayName}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => onOpenCaseStudy?.(featuredPacket.sourceSlug)}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    케이스 스터디 보기
                    <ArrowUpRight size={16} />
                  </button>

                  {featuredLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900"
                    >
                      {link.label === 'GitHub' ? <Github size={16} /> : <Link2 size={16} />}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="min-h-[320px] border-t border-slate-200 bg-gradient-to-br from-slate-950 via-slate-800 to-indigo-950 lg:min-h-full lg:border-l lg:border-t-0">
                {featuredAssetSrc ? (
                  <img
                    src={featuredAssetSrc}
                    alt={featuredPacket.homePromotions.specialLab.asset?.alt || featuredPacket.homePromotions.specialLab.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col justify-between p-8 text-white">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-indigo-200">
                        Portfolio Spotlight
                      </p>
                      <p className="mt-4 text-3xl font-black tracking-tight">
                        {featuredPacket.meta.title}
                      </p>
                    </div>
                    <p className="max-w-md text-sm leading-7 text-slate-200">
                      비주얼이 아직 웹 접근 가능한 경로로 연결되지 않았습니다. `portfolio-1/public`에 최종 자산을 두면 이 카드가 자동으로 이미지 모드로 전환됩니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-600 font-bold text-[11px] mb-3 bg-brand-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-brand-100/50">
              <Activity size={14} className="animate-pulse" />
              <span>{t('lab.badge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              {t('lab.title.1')} <br /> {t('lab.title.2')}
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                {t('lab.p1').split(t('lab.highlight.1')).map((part, i, arr) =>
                  i === arr.length - 1 ? part : <React.Fragment key={i}>{part}<strong className="text-slate-900">{t('lab.highlight.1')}</strong></React.Fragment>
                )}
              </p>
              <p>
                {(() => {
                  const text = t('lab.p2');
                  const h2 = t('lab.highlight.2');
                  const h3 = t('lab.highlight.3');
                  const h4 = t('lab.highlight.4');
                  const parts = text.split(new RegExp(`(${h2}|${h3}|${h4})`, 'g'));

                  return parts.map((part, i) => {
                    if (part === h2 || part === h3 || part === h4) {
                      return <strong key={i} className="text-brand-600">{part}</strong>;
                    }
                    return <React.Fragment key={i}>{part}</React.Fragment>;
                  });
                })()}
              </p>
              <p className="text-sm text-slate-500">
                {t('lab.list.1')}<br />
                {t('lab.list.2')}<br />
                {t('lab.list.3')}<br />
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              <div>
                <div className="text-lg font-mono font-bold text-slate-900">Python</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Core</div>
              </div>
              <div className="w-[1px] bg-slate-300 h-10"></div>
              <div>
                <div className="text-lg font-mono font-bold text-slate-900">Binance</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Exchange</div>
              </div>
              <div className="w-[1px] bg-slate-300 h-10"></div>
              <div>
                <div className="text-lg font-mono font-bold text-slate-900">Upbit</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Exchange</div>
              </div>
              <div className="w-[1px] bg-slate-300 h-10"></div>
              <div>
                <div className="text-lg font-mono font-bold text-slate-900">Kiwoom API</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Domestic</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            {/* Image Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 aspect-[4/3] group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={imageIndex}
                  src={images[imageIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Image Navigation */}
              <div className="absolute inset-x-0 bottom-4 px-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setImageIndex((imageIndex - 1 + images.length) % images.length)}
                  className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-slate-800 shadow-lg hover:bg-white transition-all transform active:scale-90"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-1.5 bg-slate-900/30 backdrop-blur-md px-2 py-1 rounded-full">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImageIndex(i)}
                      className={`h-1 rounded-full transition-all duration-300 ${i === imageIndex ? 'w-4 bg-white' : 'w-1 bg-white/50'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setImageIndex((imageIndex + 1) % images.length)}
                  className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-slate-800 shadow-lg hover:bg-white transition-all transform active:scale-90"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
