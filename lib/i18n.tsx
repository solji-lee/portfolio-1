import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ko' | 'en';

type Translations = Record<string, string>;

const translations: Record<Language, Translations> = {
    ko: {
        // Nav
        'nav.insights': 'Insights',
        'nav.projects': 'Projects',
        'nav.about': 'About',
        'nav.contact': 'Contact',

        // Hero
        'hero.badge': 'Technical Product Designer',
        'hero.title.1': 'Designing',
        'hero.title.2': 'Intelligence',
        'hero.desc': '시스템을 설계하고, AI로 효율을 혁신하는 ',
        'hero.desc.strong': '테크니컬 디자이너 ',
        'hero.desc.name': '이솔지',
        'hero.desc.end': '입니다.',
        'hero.currently': 'Currently scaling global design systems',

        // Playground & Insights
        'insights.badge': 'PLAYGROUND & INSIGHTS',
        'insights.title': 'Playground & Insights',
        'insights.desc': '디자인 시스템을 실험하고, AI 워크플로우를 연구하며, 그 과정에서 얻은 인사이트를 글로벌 커뮤니티와 공유합니다.',
        'insights.filter.all': 'All Updates',
        'insights.filter.article': 'Writings',
        'insights.filter.resource': 'Resources & Code',
        'insights.filter.press': 'Press & Media',
        'insights.more': '더 많은 아티클 보기',

        // Projects
        'projects.badge': 'SELECTED PROJECTS',
        'projects.title': 'Featured Works',
        'projects.p1.title': 'Hyundai Connected Car App',
        'projects.p1.desc': '10+개 언어를 지원하는 글로벌 모빌리티 앱의 확장 가능한 디자인 시스템을 구축 및 운영했습니다.',
        'projects.p2.title': 'Motion 2 AI Dashboard',
        'projects.p2.desc': '물류 로봇 모니터링을 위한 복잡한 3D 데이터 시각화 대시보드를 0-to-1으로 설계했습니다.',
        'projects.p3.title': 'Xpanse Loan Portal',
        'projects.p3.desc': '미국 모기지 대출의 복잡한 프로세스를 간소화하는 B2B 금융 웹 애플리케이션 리뉴얼.',
        'projects.viewcase': 'View Case Study',

        // Special Lab
        'lab.badge': 'SPECIAL LAB',
        'lab.title.1': '국내주식 & 암호화폐',
        'lab.title.2': '자동매매 봇',
        'lab.p1': '"금융 시장에 대한 호기심으로 국내주식과 암호화폐 자동거래 봇을 직접 구축했습니다."',
        'lab.p2': 'Binance와 Upbit API를 활용한 비트코인 자동거래, 국내 증권사 영웅문 API와의 연동을 통해 개인화 된 트레이딩 전략을 구현했습니다.',
        'lab.highlight.1': '국내주식과 암호화폐 자동거래 봇',
        'lab.highlight.2': 'Binance',
        'lab.highlight.3': 'Upbit',
        'lab.highlight.4': '영웅문 API',
        'lab.list.1': '• Git 브랜치로 트레이딩 모드 관리 (Trailing, Grid, DCA)',
        'lab.list.2': '• USDT/SWIFT 등 다양한 암호화폐 페어 고려',
        'lab.list.3': '• AWS를 활용한 안정적인 24/7 자동매매',

        // About
        'about.badge': 'MISSION',
        'about.title.1': 'Design that works',
        'about.title.2': 'as good as it looks.',
        'about.p1': '"실리콘밸리의 속도와 글로벌 대기업의 시스템을 모두 경험하며, 디자인이 엔지니어링과 비즈니스를 잇는 가장 강력한 연결고리임을 증명해왔습니다."',
        'about.p2': '미국 스타트업 (Xpanse, Motion2AI)에서 데이터가 비즈니스 임팩트로 전환되는 기민한 과정을 체득했고, 현대자동차라는 글로벌 기업에서 복잡한 요구사항을 애자일한 시스템으로 효율적으로 대응했습니다.',
        'about.p3': '이 과정에서 디자인은 단순히 화면을 그리는 것이 아니라, 복잡한 기술을 사용자가 이해 가능한 언어로 번역하고, 비즈니스의 효율을 극대화하는 전략적 도구임을 확신하게 되었습니다.',
        'about.p4': '3D 모델 도입이라는 챌린지한 환경에서의 UX/UI 경험부터 AI 기반의 Design Ops까지, 기술적 장벽을 허물고 문제를 해결하는 테크니컬 프로덕트 디자이너로서 더욱 혁신적인 사용자 경험을 설계하고자 합니다.',
        'about.highlight.1': '미국 스타트업',
        'about.highlight.2': '현대자동차',
        'about.highlight.3': "'전략적 도구'",
        'about.highlight.4': "'테크니컬 프로덕트 디자이너'",

        // Recommendations (Testimonials)
        'rec.badge': 'RECOMMENDATIONS',
        'rec.title': 'What People Say',
        'rec.role.1': 'CEO @ Motion2AI',
        'rec.text.1': '솔지님은 복잡한 3D 데이터와 엔지니어링 개념을 아름답고 직관적인 UI로 번역해내는 탁월한 능력을 가졌습니다.',
        'rec.role.2': 'Lead Engineer @ Hyundai',
        'rec.text.2': '디자인 시스템뿐만 아니라 코드 단의 토큰 스트럭처까지 이해하는 보기 드문 디자이너입니다. 협업 효율이 200% 증가했습니다.',

        // Contact
        'contact.title': "Let's Build Together",
        'contact.desc': 'Designing Intelligence, Automating Workflows.',
        'contact.rights': '© 2026 Solji Lee. All rights reserved.',
        'contact.built': 'Built with React, Tailwind, and Framer Motion.',
        'contact.card.role': 'Technical Product Designer',
        'language': 'ko',
    },
    en: {
        // Nav
        'nav.insights': 'Insights',
        'nav.projects': 'Projects',
        'nav.about': 'About',
        'nav.contact': 'Contact',

        // Hero
        'hero.badge': 'Technical Product Designer',
        'hero.title.1': 'Designing',
        'hero.title.2': 'Intelligence',
        'hero.desc': 'Designing systems and accelerating efficiency with AI, ',
        'hero.desc.strong': 'Technical Designer ',
        'hero.desc.name': 'Solji Lee',
        'hero.desc.end': '.',
        'hero.currently': 'Currently scaling global design systems',

        // Playground & Insights
        'insights.badge': 'PLAYGROUND & INSIGHTS',
        'insights.title': 'Playground & Insights',
        'insights.desc': 'Experimenting with design systems, researching AI workflows, and sharing insights with the global community.',
        'insights.filter.all': 'All Updates',
        'insights.filter.article': 'Writings',
        'insights.filter.resource': 'Resources & Code',
        'insights.filter.press': 'Press & Media',
        'insights.more': 'View more articles',

        // Projects
        'projects.badge': 'SELECTED PROJECTS',
        'projects.title': 'Featured Works',
        'projects.p1.title': 'Hyundai Connected Car App',
        'projects.p1.desc': 'Built and operated a scalable design system for a global mobility app supporting 10+ languages.',
        'projects.p2.title': 'Motion 2 AI Dashboard',
        'projects.p2.desc': 'Designed a complex 3D data visualization dashboard from 0-to-1 for logistics robot monitoring.',
        'projects.p3.title': 'Xpanse Loan Portal',
        'projects.p3.desc': 'B2B financial web application redesign simplifying the complex US mortgage loan process.',
        'projects.viewcase': 'View Case Study',

        // Special Lab
        'lab.badge': 'SPECIAL LAB',
        'lab.title.1': 'Domestic Stock & Crypto',
        'lab.title.2': 'Auto-Trading Bot',
        'lab.p1': '"Driven by curiosity about financial markets, I built my own auto-trading bot for domestic stocks and cryptocurrency."',
        'lab.p2': 'Implemented personalized trading strategies through Bitcoin auto-trading using Binance and Upbit APIs, and integration with domestic broker Kiwoom API.',
        'lab.highlight.1': 'auto-trading bot',
        'lab.highlight.2': 'Binance',
        'lab.highlight.3': 'Upbit',
        'lab.highlight.4': 'Kiwoom API',
        'lab.list.1': '• Trading mode management via Git branches (Trailing, Grid, DCA)',
        'lab.list.2': '• Consideration of various crypto pairs like USDT/SWIFT',
        'lab.list.3': '• Stable 24/7 auto-trading utilizing AWS',

        // About
        'about.badge': 'MISSION',
        'about.title.1': 'Design that works',
        'about.title.2': 'as good as it looks.',
        'about.p1': '"Experiencing both the speed of a Silicon Valley startup and the system of a global enterprise, I have proven that design is the most powerful link between engineering and business."',
        'about.p2': 'At US startups (Xpanse, Motion2AI), I learned the agile process of turning data into business impact. At Hyundai Motor Company, a global enterprise, I efficiently responded to complex requirements with agile systems.',
        'about.p3': 'Through this process, I became convinced that design is not just about drawing screens, but a strategic tool that translates complex technologies into language that users can understand and maximizes business efficiency.',
        'about.p4': 'From UX/UI experiences in challenging environments like introducing 3D models to AI-driven Design Ops, I aim to design more innovative user experiences as a Technical Product Designer breaking down technical barriers and solving problems.',
        'about.highlight.1': 'US Startups',
        'about.highlight.2': 'Hyundai Motor Company',
        'about.highlight.3': "'Strategic Tool'",
        'about.highlight.4': "'Technical Product Designer'",

        // Recommendations (Testimonials)
        'rec.badge': 'RECOMMENDATIONS',
        'rec.title': 'What People Say',
        'rec.role.1': 'CEO @ Motion2AI',
        'rec.text.1': 'Solji has an exceptional ability to translate complex 3D data and engineering concepts into beautiful, intuitive UIs.',
        'rec.role.2': 'Lead Engineer @ Hyundai',
        'rec.text.2': 'A rare designer who understands both the design system and the token structure at the code level. Collaboration efficiency increased by 200%.',

        // Contact
        'contact.title': "Let's Build Together",
        'contact.desc': 'Designing Intelligence, Automating Workflows.',
        'contact.rights': '© 2026 Solji Lee. All rights reserved.',
        'contact.built': 'Built with React, Tailwind, and Framer Motion.',
        'contact.card.role': 'Technical Product Designer',
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
