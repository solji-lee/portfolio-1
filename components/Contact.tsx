import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../lib/i18n';
import { Eyebrow } from './Eyebrow';

const EMAIL = 'solji.lee.design@gmail.com';

const links = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/solji/' },
  { name: 'Medium', url: 'https://medium.com/@solji-lee-design' },
  { name: 'Brunch', url: 'https://brunch.co.kr/@sorji091' },
  { name: 'X', url: 'https://x.com/solji_design' },
];

export const Contact: React.FC = () => {
  const { t, language } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const CopyRow = ({ label, display, raw }: { label: string; display: string; raw: string }) => (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-200">
      <div>
        <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-slate-400 mb-1">{label}</div>
        <div className="text-[16px] md:text-[18px] text-slate-900 font-medium tracking-tight">{display}</div>
      </div>
      <button
        onClick={() => copy(raw)}
        className="inline-flex items-center gap-1.5 text-[12px] text-slate-500 hover:text-slate-900 transition-colors shrink-0"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? (language === 'ko' ? '복사됨' : 'Copied') : (language === 'ko' ? '복사' : 'Copy')}
      </button>
    </div>
  );

  return (
    <>
      {/* Contact section: anchored between recommendations and the footer */}
      <section id="contact" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white border-t border-slate-200 print:hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-slate-900 tracking-tight leading-[1.1] mb-5">{t('contact.title')}</h2>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-md">{t('contact.desc')}</p>
          </div>

          <div className="lg:col-span-6">
            <CopyRow label="Email" display={EMAIL} raw={EMAIL} />
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-5">
              {links.map(l => (
                <a
                  key={l.name}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-slate-900 hover:text-brand-600 transition-colors"
                >
                  {l.name} <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-12 lg:px-24 py-8 border-t border-slate-200 bg-white print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-2 font-mono text-[11px] tracking-wide text-slate-400">
          <span>{t('contact.rights')}</span>
          <span>{t('contact.built')}</span>
        </div>
      </footer>
    </>
  );
};
