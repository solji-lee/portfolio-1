import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Cpu, Zap, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const floatingTags = [
    { icon: <Code size={14} />, text: "Engineering-Driven", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <Layout size={14} />, text: "Design Systems", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: <Cpu size={14} />, text: "AI Automation", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: <Zap size={14} />, text: "Rapid Prototyping", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-brand-600 text-xs font-bold mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              Technical Product Designer
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] text-slate-900 mb-8 tracking-tighter">
              Designing <br />
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="inline-block italic text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-500 to-accent-500 pr-4"
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
              className="px-10 py-4 bg-slate-900 text-white text-base font-bold rounded-2xl hover:bg-brand-600 transition-all shadow-2xl shadow-slate-200 hover:shadow-brand-500/30 transform hover:-translate-y-1 active:scale-95"
            >
              View Projects
            </button>
            <button 
              onClick={(e) => scrollToSection(e, 'about')}
              className="px-10 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-base font-semibold rounded-2xl hover:border-brand-300 hover:text-brand-600 transition-all shadow-sm hover:shadow-lg flex items-center gap-3 active:scale-95"
            >
              About Me <ArrowDown size={18} className="animate-bounce" />
            </button>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-3 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {floatingTags.map((tag, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-100 ${tag.bg} ${tag.color} text-[12px] font-bold uppercase tracking-widest shadow-sm hover:shadow-md transition-shadow cursor-default`}
              >
                {tag.icon}
                {tag.text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Visual Element */}
        <div className="lg:col-span-4 relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: "circOut" }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-gradient-to-tr from-brand-200 to-accent-100 rounded-[3rem] blur-3xl opacity-40"></div>
            
            <div className="relative glass-panel rounded-[2.5rem] p-10 border border-white/60 shadow-2xl space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-inner"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-inner"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-400 shadow-inner"></div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 font-medium">solji_workflow.sys</div>
              </div>
              
              <div className="space-y-6">
                <div className="h-5 bg-slate-100 rounded-lg w-3/4 animate-pulse"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-brand-50 rounded-2xl border border-brand-100 flex items-center justify-center hover:scale-105 transition-transform">
                    <Zap className="text-brand-500" size={32} />
                  </div>
                  <div className="h-24 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center hover:scale-105 transition-transform">
                    <Layout className="text-slate-400" size={32} />
                  </div>
                  <div className="h-24 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-center hover:scale-105 transition-transform">
                    <Code className="text-indigo-500" size={32} />
                  </div>
                </div>
                <div className="h-14 bg-slate-900 rounded-2xl w-full flex items-center px-6 justify-between shadow-xl">
                  <div className="text-[11px] font-mono text-white/70 font-bold uppercase tracking-widest">System Ready</div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                </div>
              </div>
            </div>

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-white p-5 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4"
            >
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <Zap size={24} />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Efficiency</div>
                <div className="text-2xl font-black text-slate-900">+95%</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-14 -left-10 bg-white p-5 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4"
            >
              <div className="p-3 bg-brand-50 text-brand-600 rounded-2xl">
                <Cpu size={24} />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Tech Stack</div>
                <div className="text-[14px] font-bold text-slate-900">React • Python • AI</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-6xl bg-brand-100/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
    </section>
  );
};