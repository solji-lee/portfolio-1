import React from 'react';

/** Small section label: mono, tracked, no icon. Replaces the old pill badges. */
export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex items-center gap-3 mb-5 ${className}`}>
    <span className="w-5 h-px bg-slate-900" />
    <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate-500">{children}</span>
  </div>
);
