/// <reference types="vite/client" />
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ko' | 'en';

type Translations = Record<string, string>;

const translations: Record<Language, Translations> = {
    ko: {
        // Nav
        'nav.projects': 'Projects',
        'nav.insights': 'Insights',
        'nav.contact': 'Contact',

        // Hero
        'hero.badge': 'Technical Product Designer',
        'hero.title.1': 'Designing',
        'hero.title.2': 'Intelligence',
        'hero.desc': '복잡한 기능을 직관적 경험으로, AI와 시스템적 사고로 빠르고 일관되게 만들어내는 ',
        'hero.desc.strong': '테크니컬 프로덕트 디자이너 ',
        'hero.desc.name': '이솔지',
        'hero.desc.end': '입니다.',

        // Insights
        'insights.badge': 'Insights',
        'insights.title': 'Insights',
        'insights.desc': '디자인 시스템, 도구, 워크플로우에 대해 씁니다. 긴 글은 여기, 나머지는 Medium과 Brunch에.',

        // Projects
        'projects.badge': 'Selected work',
        'projects.title': 'Projects',

        // Recommendations
        'rec.badge': 'References',
        'rec.title': '함께 일한 사람들',

        // Contact
        'contact.title': "Let's talk",
        'contact.desc': '프로젝트, 협업, 커피챗 모두 환영합니다.',
        'contact.rights': '© 2026 Solji Lee',
        'contact.built': 'React · Tailwind · Framer Motion',
        'language': 'ko',
    },
    en: {
        // Nav
        'nav.projects': 'Projects',
        'nav.insights': 'Insights',
        'nav.contact': 'Contact',

        // Hero
        'hero.badge': 'Technical Product Designer',
        'hero.title.1': 'Designing',
        'hero.title.2': 'Intelligence',
        'hero.desc': 'Turning complex features into intuitive experiences, fast and consistently, with AI and systems thinking. ',
        'hero.desc.strong': 'Technical product designer ',
        'hero.desc.name': 'Solji Lee',
        'hero.desc.end': '.',

        // Insights
        'insights.badge': 'Insights',
        'insights.title': 'Insights',
        'insights.desc': 'On design systems, tools and workflow. Longer pieces here, the rest on Medium and Brunch.',

        // Projects
        'projects.badge': 'Selected work',
        'projects.title': 'Projects',

        // Recommendations
        'rec.badge': 'References',
        'rec.title': 'People I worked with',

        // Contact
        'contact.title': "Let's talk",
        'contact.desc': 'Projects, collaboration or just coffee.',
        'contact.rights': '© 2026 Solji Lee',
        'contact.built': 'React · Tailwind · Framer Motion',
        'language': 'en',
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'ko',
    setLanguage: () => { },
    t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ko');

    const t = (key: string): string => {
        return translations[language][key] || translations['ko'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => useContext(LanguageContext);

// This module exports a context + provider. On hot update, Vite would otherwise give
// already-mounted components a stale context instance and `t()` would render raw keys.
if (import.meta.hot) {
    import.meta.hot.accept(() => window.location.reload());
}
