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
            Design that works <br />
            <span className="text-brand-600">as good as it looks.</span>
          </h2>

          <div className="space-y-6 text-slate-600 text-base md:text-[17px] leading-relaxed max-w-3xl mx-auto">
            <p className="text-lg md:text-xl font-semibold text-slate-900">
              "실리콘밸리의 속도와 글로벌 대기업의 시스템을 모두 경험하며,<br className="hidden md:block" />
              디자인이 엔지니어링과 비즈니스를 잇는 가장 강력한 연결고리임을 증명해왔습니다."
            </p>

            <p>
              <strong className="text-slate-900">미국 스타트업</strong> (Xpanse, Motion2AI)에서
              데이터가 비즈니스 임팩트로 전환되는 기민한 과정을 체득했고,
              <strong className="text-slate-900"> 현대자동차</strong>라는 글로벌 기업에서
              복잡한 요구사항을 애자일한 시스템으로 효율적으로 대응했습니다.
            </p>

            <p>
              이 과정에서 디자인은 단순히 화면을 그리는 것이 아니라,
              복잡한 기술을 사용자가 이해 가능한 언어로 번역하고,
              비즈니스의 효율을 극대화하는 <span className="text-brand-600 font-bold">'전략적 도구'</span>임을 확신하게 되었습니다.
            </p>

            <p className="text-slate-900 font-semibold">
              3D 모델 도입이라는 챌린지한 환경에서의 UXUI 경험부터 AI 기반의 Design Ops까지,
              기술적 장벽을 허물고 문제를 해결하는 <span className="text-brand-600">'테크니컬 프로덕트 디자이너'</span>로서
              더욱 혁신적인 사용자 경험을 설계하고자 합니다.
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