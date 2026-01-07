import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Cpu, Zap, ArrowDown, Users } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const floatingTags = [
    { icon: <Users size={14} />, text: "User-Driven", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: <Code size={14} />, text: "Design Ops", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <Layout size={14} />, text: "Design Systems", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: <Cpu size={14} />, text: "Vibe Coding", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: <Zap size={14} />, text: "Rapid Prototyping", color: "text-amber-600", bg: "bg-amber-50" },
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
              Technical Product Designer
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-slate-900 mb-8 tracking-tighter">
              Designing <br />
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="inline-block italic text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-500 to-accent-500 pr-4 pb-2"
              >
                Intelligence
              </motion.span>
            </h1>

            <h2 className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl">
              시스템을 설계하고, AI로 효율을 혁신하는 <br className="hidden md:block" />
              테크니컬 디자이너 <strong className="text-slate-900 font-bold underline decoration-brand-200 decoration-8 underline-offset-4">이솔지</strong>입니다.
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button
              onClick={(e) => scrollToSection(e, 'projects')}
              className="px-6 py-3 md:px-10 md:py-4 bg-slate-900 text-white text-sm md:text-base font-bold rounded-xl md:rounded-2xl hover:bg-brand-600 transition-all shadow-2xl shadow-slate-200 hover:shadow-brand-500/30 transform hover:-translate-y-1 active:scale-95"
            >
              View Projects
            </button>
            <button
              onClick={(e) => scrollToSection(e, 'about')}
              className="px-6 py-3 md:px-10 md:py-4 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-sm md:text-base font-semibold rounded-xl md:rounded-2xl hover:border-brand-300 hover:text-brand-600 transition-all shadow-sm hover:shadow-lg flex items-center gap-2 md:gap-3 active:scale-95"
            >
              About Me <ArrowDown size={18} className="animate-bounce" />
            </button>
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