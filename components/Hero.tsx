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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-brand-600 text-xs font-bold mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              Technical Product Designer
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900 mb-6 tracking-tight">
              Designing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-500 to-accent-500">
                Intelligence
              </span>
            </h1>
            
            <h2 className="text-xl lg:text-2xl text-slate-600 font-light leading-relaxed max-w-xl">
              시스템을 설계하고, AI로 효율을 혁신하는 <br/>
              테크니컬 디자이너 <strong className="text-slate-900 font-semibold underline decoration-brand-200 decoration-4 underline-offset-4">이솔지</strong>입니다.
            </h2>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <button 
              onClick={(e) => scrollToSection(e, 'projects')}
              className="px-8 py-4 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-brand-600 transition-all shadow-xl shadow-slate-200 hover:shadow-brand-500/20 transform hover:-translate-y-0.5"
            >
              View Projects
            </button>
            <button 
              onClick={(e) => scrollToSection(e, 'about')}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:border-brand-300 hover:text-brand-600 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              About Me <ArrowDown size={16} />
            </button>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-3 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {floatingTags.map((tag, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-100 ${tag.bg} ${tag.color} text-[10px] font-bold uppercase tracking-wider shadow-sm`}
              >
                {tag.icon}
                {tag.text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Visual Element */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: "circOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-100 to-accent-50 rounded-3xl blur-2xl opacity-60"></div>
            
            <div className="relative glass-panel rounded-3xl p-8 border border-white/50 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-[10px] font-mono text-slate-400">solji_workflow.sys</div>
              </div>
              
              <div className="space-y-4">
                <div className="h-4 bg-slate-100 rounded-md w-3/4 animate-pulse"></div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-20 bg-brand-50 rounded-xl border border-brand-100 flex items-center justify-center">
                    <Zap className="text-brand-500" size={24} />
                  </div>
                  <div className="h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                    <Layout className="text-slate-400" size={24} />
                  </div>
                  <div className="h-20 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center">
                    <Code className="text-indigo-500" size={24} />
                  </div>
                </div>
                <div className="h-12 bg-slate-900 rounded-xl w-full flex items-center px-4 justify-between">
                  <div className="text-[10px] font-mono text-white/60">System Ready</div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                </div>
              </div>
            </div>

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Zap size={20} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Efficiency</div>
                <div className="text-lg font-extrabold text-slate-900">+90%</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                <Cpu size={20} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Tech Stack</div>
                <div className="text-sm font-bold text-slate-900">React • Python • AI</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-brand-100/30 rounded-full blur-[120px] pointer-events-none -z-10"></div>
    </section>
  );
};