import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../lib/i18n';
import { Eyebrow } from './Eyebrow';

const testimonials = [
  {
    name: "Seungmin Baek",
    role: "CEO, Ribotics",
    content: "Solji is capable of rapid prototyping when building new product features with high uncertainties. Recommended for agile development.",
    translation: "불확실성이 높은 신규 기능을 만들 때 빠르게 프로토타입을 내놓는 디자이너입니다. 애자일 개발에 추천합니다."
  },
  {
    name: "Sully Malik",
    role: "Design Lead",
    content: "Remarkable designer whose skill translates across virtually any medium. She led her team and never hesitated to turn down feedback.",
    translation: "어떤 매체에서든 실력이 통하는 디자이너입니다. 팀을 이끌었고, 피드백을 받아들이는 데 주저함이 없었습니다."
  },
  {
    name: "Paul Taylor",
    role: "Software Developer",
    content: "I've been impressed by Solji's work ethic. Her talent in design and consistency make her a pleasure to work with.",
    translation: "일하는 태도에 늘 감탄했습니다. 디자인 실력과 꾸준함 덕분에 함께 일하는 게 즐거웠습니다."
  }
];

export const Recommendations: React.FC = () => {
  const { t, language } = useTranslation();
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <Eyebrow>{t('rec.badge')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-slate-900 tracking-tight leading-[1.1]">{t('rec.title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {testimonials.map((item, idx) => (
            <motion.blockquote
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-7 md:p-8 flex flex-col justify-between"
            >
              <div className="space-y-4 mb-10">
                <p className="text-[15px] leading-[1.75] text-slate-900">
                  {language === 'ko' ? item.translation : item.content}
                </p>
                <p className="text-[13px] leading-relaxed text-slate-400">
                  {language === 'ko' ? item.content : item.translation}
                </p>
              </div>
              <footer className="pt-5 border-t border-slate-100">
                <div className="text-[14px] font-semibold text-slate-900">{item.name}</div>
                <div className="font-mono text-[11px] tracking-wide text-slate-400 mt-0.5">{item.role}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
