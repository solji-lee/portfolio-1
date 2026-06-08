import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Layout, Cpu, Zap, Users } from 'lucide-react';
import { useTranslation } from '../lib/i18n';
import { PortfolioExportPacket, getPacketHeroAssetSrc } from '../lib/portfolioPacket';

interface HeroProps {
  featuredPacket?: PortfolioExportPacket | null;
  onOpenCaseStudy?: (slug: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredPacket, onOpenCaseStudy }) => {
  const { t } = useTranslation();
  const featuredAssetSrc = featuredPacket ? getPacketHeroAssetSrc(featuredPacket) : null;

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const floatingTags = [
    { icon: <Users size={14} />, text: "Figma MCP", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: <Code size={14} />, text: "Design Ops", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <Layout size={14} />, text: "Design Systems", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: <Cpu size={14} />, text: "Vibe Coding", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: <Zap size={14} />, text: "User-Driven", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-36 md:pt-44 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">

        {/* Left Content */}
        <div className="lg:col-span-7 space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-brand-600 text-xs font-bold mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              {t('hero.badge')}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black leading-[0.9] text-slate-900 mb-8 tracking-tighter">
              {t('hero.title.1')} <br />
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="inline-block italic text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-500 to-accent-500 pr-4 pb-2"
              >
                {t('hero.title.2')}
              </motion.span>
            </h1>

            <h2 className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl">
              {t('hero.desc')}
              <div className="font-bold mt-2">
                {t('hero.desc.strong')} <strong className="text-slate-900 text-2xl border-b-4 border-slate-900 pb-0.5">{t('hero.desc.name')}</strong>{t('hero.desc.end')}
              </div>
            </h2>
          </motion.div>



          <motion.div
            className="flex flex-wrap gap-2 md:gap-3 pt-4 md:pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {floatingTags.map((tag, i) => (
              <div
                key={i}
                className={`flex items-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl border border-slate-100 ${tag.bg} ${tag.color} text-[10px] md:text-[12px] font-bold uppercase tracking-wider md:tracking-widest shadow-sm hover:shadow-md transition-shadow cursor-default ${i === 4 ? 'hidden md:flex' : ''}`}
              >
                {tag.icon}
                {tag.text}
              </div>
            ))}
          </motion.div>

          {featuredPacket?.homePromotions.hero.enabled && (
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              onClick={() => onOpenCaseStudy?.(featuredPacket.sourceSlug)}
              className="w-full max-w-3xl overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 text-left shadow-[0_24px_80px_-36px_rgba(15,23,42,0.42)] backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-slate-300"
            >
              <div className="grid gap-6 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-6">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-indigo-600">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      From sj_tool export packet
                    </div>
                    <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                      {featuredPacket.homePromotions.hero.title}
                    </h3>
                    {featuredPacket.homePromotions.hero.subtitle && (
                      <p className="mt-3 text-[15px] font-medium leading-7 text-slate-500">
                        {featuredPacket.homePromotions.hero.subtitle}
                      </p>
                    )}
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {featuredPacket.homePromotions.hero.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                      Case Study
                    </span>
                    <span className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                      {featuredPacket.meta.contentSource}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                      {featuredPacket.homePromotions.hero.ctaLabel || '케이스 스터디 보기'}
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>

                <div className="relative min-h-[220px] overflow-hidden rounded-[22px] border border-slate-200 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-800">
                  {featuredAssetSrc ? (
                    <img
                      src={featuredAssetSrc}
                      alt={featuredPacket.homePromotions.hero.asset?.alt || featuredPacket.homePromotions.hero.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col justify-end p-5 text-white">
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-indigo-200">
                        Portfolio Hero
                      </p>
                      <p className="mt-3 text-2xl font-black tracking-tight">
                        {featuredPacket.meta.title}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-200">
                        브런치 원고 기반으로 생성된 포트폴리오 packet을 홈에서 바로 소비합니다.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          )}
        </div>

        {/* Right Visual Element - Character Image */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: "circOut" }}
            className="relative"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-200/40 via-accent-100/30 to-transparent rounded-full blur-[100px] -z-10 opacity-70"></div>

            {/* Main Character Image Container */}
            <div className="relative z-10 flex items-center justify-center h-[500px]">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img
                  src="/solji-character.png"
                  alt="Solji Character"
                  className="w-full max-w-[210px] object-contain"
                />
              </motion.div>

              {/* Efficiency Floating Card - Top Left */}
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-[10%] -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 z-20 min-w-[180px]"
              >
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Zap size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Optimization</div>
                  <div className="text-xl font-black text-slate-900 tracking-tight">+300%</div>
                </div>
              </motion.div>

              {/* Tech Stack Floating Card - Bottom Right */}
              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[15%] -right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 z-20"
              >
                <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
                  <Cpu size={24} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Tech Stack</div>
                  <div className="text-[13px] font-extrabold text-slate-900">Vibe Coding • AI</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-6xl bg-brand-100/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
    </section>
  );
};
