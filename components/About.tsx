import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '../lib/i18n';

export const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-10 lg:px-24 relative z-10 text-center">
        <div className="space-y-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 text-brand-600 text-[11px] font-bold mb-2 uppercase tracking-widest border border-brand-100/50">
            <Sparkles size={12} />
            <span>{t('about.badge')}</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            {t('about.title.1')} <br />
            <span className="text-brand-600">{t('about.title.2')}</span>
          </h2>

          <div className="space-y-6 text-slate-600 text-base md:text-[17px] leading-relaxed max-w-3xl mx-auto">
            <p className="text-lg md:text-xl font-semibold text-slate-900">
              {t('about.p1').split(',').map((part, i, arr) =>
                i === 0 ? <React.Fragment key={i}>{part},<br className="hidden md:block" /></React.Fragment> : <React.Fragment key={i}>{part}</React.Fragment>
              )}
            </p>

            <p>
              {t('about.p2').split(t('about.highlight.1')).map((part, i, arr) =>
                i === arr.length - 1 ? (
                  part.split(t('about.highlight.2')).map((p2, j, arr2) =>
                    j === arr2.length - 1 ? p2 : <React.Fragment key={j}>{p2}<strong className="text-slate-900">{t('about.highlight.2')}</strong></React.Fragment>
                  )
                ) : <React.Fragment key={i}>{part}<strong className="text-slate-900">{t('about.highlight.1')}</strong></React.Fragment>
              )}
            </p>

            <p>
              {t('about.p3').split(t('about.highlight.3')).map((part, i, arr) =>
                i === arr.length - 1 ? part : <React.Fragment key={i}>{part}<span className="text-brand-600 font-bold">{t('about.highlight.3')}</span></React.Fragment>
              )}
            </p>

            <p className="text-slate-900 font-semibold">
              {t('about.p4').split(t('about.highlight.4')).map((part, i, arr) =>
                i === arr.length - 1 ? part : <React.Fragment key={i}>{part}<span className="text-brand-600">{t('about.highlight.4')}</span></React.Fragment>
              )}
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