import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const baseLogs = [
  "[INFO] Trading Bot initializing...",
  "[CONNECT] Upbit API connected.",
  "[ANALYSIS] RSI: 32.5 (OVERSOLD)",
  "[EXEC] Order: BUY 0.002 BTC",
  "[SUCCESS] Portfolio updated.",
  "[WAIT] Monitoring..."
];

export const SpecialLab: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="lab" className="py-16 bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-10 lg:px-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 lg:order-1 space-y-4">
          <div className="inline-flex items-center gap-2 text-brand-600 font-bold text-[10px] mb-2 bg-brand-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
             <Activity size={12} />
             <span>SPECIAL LAB</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
            Algorithmic Bot <br/> Experiment
          </h2>
          
          <div className="space-y-4 text-slate-600 leading-relaxed text-sm">
            <p>
              "금융 도메인에 대한 호기심으로 <strong className="text-slate-900">파이썬 자동매매 봇</strong>을 직접 구축했습니다."
            </p>
            <p>
              복잡한 실시간 데이터 처리와 엔지니어의 관점을 이해하는 과정이었습니다.
            </p>
          </div>
          
          <div className="mt-6 flex gap-6">
             <div>
               <div className="text-lg font-mono font-bold text-slate-900">Python</div>
               <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Core</div>
             </div>
             <div className="w-[1px] bg-slate-200 h-8"></div>
             <div>
               <div className="text-lg font-mono font-bold text-slate-900">AWS</div>
               <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Cloud</div>
             </div>
             <div className="w-[1px] bg-slate-200 h-8"></div>
             <div>
               <div className="text-lg font-mono font-bold text-slate-900">API</div>
               <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Logic</div>
             </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
           <motion.div 
             initial={{ opacity: 0, scale: 0.98 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="bg-[#1e293b] rounded-xl shadow-lg overflow-hidden font-mono text-[11px] border border-slate-700 relative"
           >
             <div className="bg-[#0f172a] px-3 py-2 flex items-center justify-between border-b border-slate-700/50">
               <div className="flex gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
               </div>
               <div className="text-slate-500 text-[10px] opacity-60">bot_main.py</div>
             </div>

             <div className="p-4 h-[180px] overflow-y-auto text-slate-300 space-y-1.5">
               {logs.map((log, i) => (
                 <div key={i} className={`${(log && typeof log === 'string' && log.includes('BUY')) ? 'text-green-400' : 'text-slate-400'}`}>
                   {log}
                 </div>
               ))}
               <div className="w-1.5 h-3 bg-slate-600 inline-block align-middle ml-1 animate-pulse" />
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};