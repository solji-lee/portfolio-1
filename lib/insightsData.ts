export interface InsightLink {
    lang: string;
    platform: string;
    url: string;
    iconName: string; // Store icon name as string for serialization
}

export interface InsightItem {
    id: number;
    type: 'article' | 'resource' | 'press';
    titleKo: string;
    titleEn: string;
    descriptionKo: string;
    descriptionEn: string;
    tags: string[];
    links: InsightLink[];
    source?: string;     // For press type
    hidden?: boolean;    // Hide from main site
    createdAt?: string;  // ISO date string
}

const STORAGE_KEY = 'solji-insights-data-v2';

export const defaultData: InsightItem[] = [
    {
        id: 0,
        type: 'resource',
        titleKo: 'Systemic Icon — 기업용 고성능 아이콘 엔진',
        titleEn: 'Systemic Icon — High-Performance Icon Engine for Enterprise',
        descriptionKo: '4만 개 이상의 아이콘을 피그마 라이브러리 없이 관리하세요. 삽입 크기에 따라 선 두께를 자동 조절하는 Auto-Weight, 선형/면형 스타일 통합 검색, 서버리스 팀 공유까지. 1비트 비트마스크 압축 기술로 가볍고 빠르게.',
        descriptionEn: 'Manage 40,000+ icons without a Figma library. Features Auto-Weight (automatic stroke scaling on insert), unified Outlined & Filled search, and serverless team sharing — all powered by 1-bit bitmask compression for maximum performance.',
        tags: ['Figma Plugin', 'IconOps', 'Open Source'],
        links: [
            { lang: 'Figma Community', platform: 'Figma', url: '#', iconName: 'Figma' },
            { lang: 'GitHub', platform: 'Github', url: 'https://github.com/solji-lee/systemic-icon', iconName: 'Github' }
        ],
        createdAt: '2026-04-01T00:00:00Z'
    },
    {
        id: 1,
        type: 'article',
        titleKo: '디자인 시스템에 AI 도입하기: Vibe Coding과 MCP 활용기',
        titleEn: 'Adopting AI in Design Systems: Vibe Coding & MCP',
        descriptionKo: '반복적인 스펙 문서화와 에셋 관리를 LLM으로 자동화하여 크리에이티브 시간을 주당 10시간 이상 확보한 방법론을 공유합니다.',
        descriptionEn: 'Sharing methodology on automating repetitive spec docs and asset management with LLMs, saving 10+ hours per week.',
        tags: ['DesignOps', 'AI', 'Workflow'],
        links: [
            { lang: 'EN', platform: 'Medium', url: '#', iconName: 'Globe' },
            { lang: 'KR', platform: 'Brunch', url: '#', iconName: 'BookOpen' }
        ],
        createdAt: '2026-03-01T00:00:00Z'
    },
    {
        id: 2,
        type: 'resource',
        titleKo: 'EAA 대응을 위한 다이나믹 폰트 스케일러',
        titleEn: 'Dynamic Font Scaler for EAA Compliance',
        descriptionKo: '수식(Formula)을 활용해 유럽 접근성 법안(EAA) 기준에 맞춘 텍스트 크기 변환을 자동화한 피그마 배리어블 템플릿입니다.',
        descriptionEn: 'Figma Variables template using Formulas to automate text size conversions for European Accessibility Act (EAA) standards.',
        tags: ['Figma Community', 'Accessibility', 'Variables'],
        links: [
            { lang: 'Open in Figma', platform: 'Figma', url: '#', iconName: 'Figma' }
        ],
        createdAt: '2026-02-15T00:00:00Z'
    },
    {
        id: 3,
        type: 'resource',
        titleKo: 'Figma to React Token Exporter',
        titleEn: 'Figma to React Token Exporter',
        descriptionKo: '피그마의 디자인 토큰을 React/Tailwind 코드로 자동 변환해주는 스크립트. 디자인과 개발의 간극을 줄여줍니다.',
        descriptionEn: 'A script that automatically converts Figma design tokens into React/Tailwind code, bridging the gap between design and dev.',
        tags: ['Open Source', 'Script', 'React'],
        links: [
            { lang: 'View Repository', platform: 'Github', url: '#', iconName: 'Github' }
        ],
        createdAt: '2026-02-01T00:00:00Z'
    },
    {
        id: 4,
        type: 'press',
        titleKo: '"3D 인터페이스로 모빌리티 경험을 혁신하다" - 솔지 수석 디자이너 인터뷰',
        titleEn: '"Innovating Mobility Experiences with 3D Interfaces" - Interview with Solji',
        descriptionKo: '디자인 매거진 CA와 진행한 현대자동차 커넥티드 카 앱 개편 및 iF 디자인 어워드 수상 관련 심층 인터뷰.',
        descriptionEn: 'In-depth interview with CA Magazine regarding the Hyundai Connected Car app redesign and iF Design Award win.',
        tags: ['Interview', 'CA Magazine', 'Mobility'],
        source: 'CA Magazine',
        links: [
            { lang: '기사 읽기', platform: 'News', url: '#', iconName: 'Newspaper' }
        ],
        createdAt: '2026-01-15T00:00:00Z'
    },
    {
        id: 5,
        type: 'article',
        titleKo: '글로벌 프로덕트를 위한 다국어 로컬라이제이션 시스템 구축',
        titleEn: 'Building Localization Systems for Global Products',
        descriptionKo: '단일 마스터 화면에서 10개 이상의 언어를 실시간으로 테스트하고 깨짐 현상을 방지하는 UI/UX 설계 노하우.',
        descriptionEn: 'UI/UX design know-how to test 10+ languages in real-time from a single master screen and prevent layout breaks.',
        tags: ['Global', 'Localization', 'System'],
        links: [
            { lang: 'EN', platform: 'Medium', url: '#', iconName: 'Globe' },
            { lang: 'KR', platform: 'Brunch', url: '#', iconName: 'BookOpen' }
        ],
        createdAt: '2026-01-01T00:00:00Z'
    }
];

export function getInsightsData(): InsightItem[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored) as InsightItem[];
            // Sort by createdAt descending (newest first)
            return parsed.sort((a, b) =>
                new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
            );
        }
    } catch (e) {
        console.warn('Failed to read insights data from localStorage:', e);
    }
    return defaultData;
}

export function saveInsightsData(items: InsightItem[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
        console.error('Failed to save insights data to localStorage:', e);
    }
}

export function getNextId(items: InsightItem[]): number {
    return Math.max(0, ...items.map(i => i.id)) + 1;
}
