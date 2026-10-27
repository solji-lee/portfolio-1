import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useTranslation } from '../lib/i18n';

export const Hero: React.FC = () => {
  const { t, language } = useTranslation();

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const skills = ['Product Design', 'UX / UI', 'Interaction & Motion', 'Design Systems', 'Mobile · IVI'];

  return (
    <section className="relative min-h-[82vh] flex items-center pt-32 md:pt-36 pb-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate-500 mb-8">
            {t('hero.badge')}
          </div>

          {/* w-fit container takes the title's width; the paragraph (w-0 min-w-full) wraps to it at every breakpoint */}
          <div className="w-fit">
            <h1 className="font-display italic text-[clamp(60px,10vw,96px)] font-bold leading-[1.08] tracking-[-0.04em] text-slate-900 mb-8 pr-3">
              {/* Line 1 smaller so its descender clears line 2 */}
              <span className="block text-[0.95em] font-bold text-slate-800">{t('hero.title.1')}</span>
              <span className="text-flow text-dots pr-1">{t('hero.title.2')}</span>
            </h1>

            <p className="w-0 min-w-full text-[15px] md:text-[17px] text-slate-600 leading-[1.7]">
              {t('hero.desc')}
              <span className="text-slate-900 font-medium">{t('hero.desc.strong')}<span className="border-b-2 border-slate-900 pb-0.5">{t('hero.desc.name')}</span>{t('hero.desc.end')}</span>
            </p>

            <motion.ul
              className="w-0 min-w-full flex flex-wrap gap-x-5 gap-y-2 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {skills.map((s) => (
                <li key={s} className="text-[13px] text-slate-500 whitespace-nowrap before:content-['—'] before:mr-2 before:text-slate-300">{s}</li>
              ))}
            </motion.ul>
          </div>
        </motion.div>

        <motion.a
          href="#projects"
          onClick={scrollToProjects}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="inline-flex items-center gap-2 mt-12 text-[13px] font-medium text-slate-900 hover:text-brand-600 transition-colors"
        >
          {language === 'ko' ? '프로젝트 보기' : 'See the work'} <ArrowDown size={14} />
        </motion.a>
      </div>
    </section>
  );
};
