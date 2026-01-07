import React from 'react';
import { Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-10 lg:px-24 relative z-10 text-center">
        <div className="space-y-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 text-brand-600 text-[11px] font-bold mb-2 uppercase tracking-widest border border-brand-100/50">
            <Sparkles size={12} />
            <span>MISSION</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            Design that works <br/>
            <span className="text-brand-600">as good as it looks.</span>
          </h2>
          
          <div className="space-y-6 text-slate-600 text-base md:text-[17px] leading-relaxed max-w-2xl mx-auto">
            <p>
              시각적 즐거움을 넘어 <strong className="text-slate-900 font-bold">시스템의 효율과 논리</strong>를 설계합니다. 
              기술적 요구사항을 직관적인 경험으로 번역할 때 가장 보람을 느낍니다.
            </p>
            <p>
              실리콘밸리 SaaS와 현대자동차 프로젝트를 통해 디자인이 엔지니어링과 비즈니스의 <span className="text-brand-600 font-bold">강력한 연결고리</span>임을 증명해왔습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Background decoration for empty space */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
    </section>
  );
};