import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronLeft, ChevronRight } from 'lucide-react';

const baseLogs = [
  "[INFO] Trading Bot initializing...",
  "[CONNECT] Binance API connected.",
  "[CONNECT] Upbit USDT connected.",
  "[CONNECT] Hero API (국내거래) connected.",
  "[MODE] Switching to trailing strategy...",
  "[ANALYSIS] BTC trending upward, RSI: 58.2",
  "[EXEC] Trailing stop activated at +3.2%",
  "[SUCCESS] Profit secured: +5.8%",
  "[INFO] Portfolio updated.",
  "[WAIT] Monitoring market..."
];

const images = [
  "/crypto-dashboard.png",
  "/crypto-terminal.png",
  "/crypto-analytics.png"
];

export const SpecialLab: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);

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
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="order-2 lg:order-1 space-y-6">
          <div className="inline-flex items-center gap-2 text-brand-600 font-bold text-[11px] mb-3 bg-brand-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-brand-100/50">
            <Activity size={14} className="animate-pulse" />
            <span>SPECIAL LAB</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Cryptocurrency <br /> Auto-Trading Bot
          </h2>

          <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
            <p>
              "금융 시장에 대한 호기심으로 <strong className="text-slate-900">암호화폐 자동거래 봇</strong>을 직접 구축했습니다."
            </p>
            <p>
              <strong className="text-brand-600">Binance</strong>와 <strong className="text-brand-600">Upbit</strong> API를 활용한 비트코인 자동거래,
              국내 증권사 <strong className="text-brand-600">영웅문 API</strong>와의 연동을 통해 복잡한 실시간 데이터 처리와 트레이딩 전략을 구현했습니다.
            </p>
            <p className="text-sm text-slate-500">
              • Git 브랜치로 트레이딩 모드 관리 (Trailing, Grid, DCA)<br />
              • 상승장 트레일링 전략으로 수익 극대화<br />
              • USDT/SWIFT 등 다양한 암호화폐 페어 지원
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
              <div className="text-lg font-mono font-bold text-slate-900">Hero API</div>
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
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 aspect-[4/3] group"
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
    </section>
  );
};