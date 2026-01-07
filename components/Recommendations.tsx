import React from 'react';
import { Quote, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Seungmin Baek",
    role: "CEO @ Ribotics",
    content: "Solji is capable of rapid prototyping when building new product features with high uncertainties. Recommended for agile development.",
    translation: "솔지는 불확실성이 높은 신규 기능을 구축할 때 신속한 프로토타이핑이 가능한 디자이너입니다. 애자일 개발에 강력 추천합니다.",
    tags: ["Agile", "Rapid Proto"]
  },
  {
    name: "Sully Malik",
    role: "Design Lead",
    content: "Remarkable designer whose skill translates across virtually any medium. She led her team and never hesitated to turn down feedback.",
    translation: "어떤 매체에서도 빛나는 놀라운 실력을 갖춘 디자이너입니다. 팀을 훌륭히 이끌며 피드백을 수용하는 데 주저함이 없습니다.",
    tags: ["Leadership", "Versatile"]
  },
  {
    name: "Paul Taylor",
    role: "SW Developer",
    content: "I've been impressed by Solji's work ethic. Her talent in design and consistency make her a pleasure to work with.",
    translation: "솔지의 직업 윤리에 깊은 인상을 받았습니다. 뛰어난 디자인 실력과 성실함 덕분에 함께 일하는 것이 즐거웠습니다.",
    tags: ["Work Ethic", "Consistent"]
  }
];

export const Recommendations: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-8 lg:px-16 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand-600 font-bold text-[10px] mb-4 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-widest">
            <Linkedin size={14} />
            <span>LinkedIn Recommendations</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">함께 일한 동료들의 한마디</h2>
          <p className="text-slate-500 text-sm">실무에서 함께 호흡을 맞춘 동료들이 말하는 이솔지의 강점입니다.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:shadow-brand-500/5 transition-all group"
            >
              <div>
                <Quote className="text-brand-100 mb-6 group-hover:text-brand-200 transition-colors" size={32} fill="currentColor" />
                <div className="space-y-4 mb-8">
                  <p className="text-slate-700 font-medium text-sm leading-relaxed">
                    "{item.content}"
                  </p>
                  <p className="text-brand-600 font-bold text-xs border-l-2 border-brand-200 pl-3 leading-relaxed">
                    {item.translation}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-extrabold text-slate-900 text-sm">{item.name}</div>
                  <div className="flex gap-1">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[8px] bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-100 uppercase font-bold tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative dots for background */}
      <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
          ))}
        </div>
      </div>
    </section>
  );
};