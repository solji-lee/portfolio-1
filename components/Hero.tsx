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
    <section className="relative min-h-[86vh] flex items-center pt-32 md:pt-36 pb-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">

        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate-500 mb-8">
              {t('hero.badge')}
            </div>

            <h1 className="text-[52px] md:text-[80px] lg:text-[96px] font-bold leading-[0.95] tracking-[-0.035em] text-slate-900 mb-8">
              {t('hero.title.1')}<br />
              <span className="text-brand-600">{t('hero.title.2')}</span>
            </h1>

            <p className="text-[18px] md:text-[21px] text-slate-600 leading-relaxed max-w-2xl">
              {t('hero.desc')}
              <span className="text-slate-900 font-medium">{t('hero.desc.strong')}<span className="border-b-2 border-slate-900 pb-0.5">{t('hero.desc.name')}</span>{t('hero.desc.end')}</span>
            </p>
          </motion.div>

          <motion.ul
            className="flex flex-wrap gap-x-5 gap-y-2 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {skills.map((s) => (
              <li key={s} className="text-[13px] text-slate-500 before:content-['—'] before:mr-2 before:text-slate-300">{s}</li>
            ))}
          </motion.ul>

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

        {/* Visual */}
        <div className="lg:col-span-5 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
            className="relative h-[480px] flex items-center justify-center"
          >
            <motion.img
              src="/solji-character.png"
              alt="Solji"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-[220px] object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
