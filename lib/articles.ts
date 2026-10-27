/**
 * Long-form articles hosted on this site (route: #insights/<slug>).
 * External writing (Medium, Brunch) still lives in insightsData.ts.
 */
export interface ArticleSection {
    heading?: { ko: string; en: string };
    paragraphs: { ko: string[]; en: string[] };
    bullets?: { ko: string[]; en: string[] };
}

export interface Article {
    slug: string;
    date: string; // ISO
    readingMinutes: number;
    tags: string[];
    title: { ko: string; en: string };
    summary: { ko: string; en: string };
    sections: ArticleSection[];
}

export const articles: Article[] = [
    {
        slug: 'design-ops-inside-the-firewall',
        date: '2026-05-01',
        readingMinutes: 6,
        tags: ['Design Ops', 'Figma Plugin', 'Localization'],
        title: {
            ko: '보안망 안에서 디자인 도구를 직접 만든 이야기',
            en: 'Building design tools inside the firewall'
        },
        summary: {
            ko: '32개 언어와 끊어진 Jira 연동. 기다리는 대신 디자인 팀이 쓸 플러그인을 직접 기획하고 만들면서 배운 것들.',
            en: '32 languages and a Jira integration that security policy had cut off. What I learned by planning and building the plugins myself instead of waiting.'
        },
        sections: [
            {
                paragraphs: {
                    ko: [
                        '현대·기아·제네시스 앱은 32개 언어로 나갑니다. 화면 한 장을 만들면 서른두 번 다른 모습이 되고, 그중 어딘가는 반드시 깨집니다. 독일어는 길고, 아랍어는 방향이 반대고, 태국어는 줄 높이가 다릅니다. 이걸 사람이 눈으로 다 검수하는 건 사실상 불가능했고, 실제로 놓친 것들이 QA 단계에서 되돌아오곤 했습니다.',
                        '여기에 하나가 더 있었습니다. 사내 보안 정책 때문에 Jira와 Figma의 표준 연동이 막혀 있었습니다. 디자이너는 티켓 상태를 확인하려고 보안망 안팎을 오가야 했고, 그 사이에 맥락이 자주 끊겼습니다.',
                        '둘 다 "원래 그런 것"으로 받아들여지던 불편이었습니다. 저는 이 두 가지를 디자인 팀의 내부 도구로 해결해 보기로 했고, 기획부터 로직 설계까지 PO 역할을 맡아 사내 개발팀과 함께 만들었습니다.'
                    ],
                    en: [
                        'The Hyundai, Kia and Genesis apps ship in 32 languages. Every screen you design becomes thirty-two different screens, and somewhere in there something always breaks. German runs long, Arabic runs right to left, Thai needs a different line height. Checking all of it by eye was not realistic, and the misses kept coming back from QA.',
                        'There was one more thing. Security policy blocked the standard Jira to Figma integration. Designers crossed in and out of the secure network just to check a ticket status, and context got lost on the way.',
                        'Both were accepted as "just how it is". I decided to treat them as problems a design team could solve with its own tools, and took the product owner role from problem definition to logic design, working with the in-house dev team.'
                    ]
                }
            },
            {
                heading: { ko: '1. Lokalise 스트링을 Figma Variables로', en: '1. Lokalise strings into Figma Variables' },
                paragraphs: {
                    ko: [
                        '첫 번째 도구는 로컬라이제이션 파이프라인입니다. 번역은 Lokalise에서 관리되는데, 디자이너는 그 결과를 화면에서 볼 방법이 없었습니다. 플러그인이 Lokalise의 스트링을 가져와 Figma Variables로 자동 변환하고 주입하도록 만들었습니다.',
                        '이렇게 하면 변수 모드를 바꾸는 것만으로 같은 화면을 32개 언어로 넘겨볼 수 있습니다. 긴 언어에서 버튼이 두 줄이 되는지, 라벨이 잘리는지가 디자인 단계에서 바로 보입니다. QA에서 돌아오던 일이 앞쪽으로 당겨졌습니다.'
                    ],
                    en: [
                        'The first tool was a localisation pipeline. Translations live in Lokalise, but designers had no way to see them on the screen. The plugin pulls strings from Lokalise and converts and injects them as Figma Variables.',
                        'From there, flipping a variable mode shows the same screen in any of the 32 languages. Whether a button wraps to two lines in German or a label truncates is visible at the design stage. Work that used to come back from QA moved to the front.'
                    ]
                }
            },
            {
                heading: { ko: '2. 보안을 지키면서 Jira를 Figma 안으로', en: '2. Jira inside Figma, without bypassing security' },
                paragraphs: {
                    ko: [
                        '두 번째는 Jira 플러그인입니다. 핵심은 보안망을 우회하지 않는 것이었습니다. 표준 연동 대신 보안 정책이 허용하는 범위 안에서 Jira 데이터를 안전하게 호출하는 로직을 보안팀과 함께 정리했고, 그 위에 피그마 안에서 디자인과 연결된 티켓 상태를 실시간으로 보고 관리하는 플러그인을 만들었습니다.',
                        '디자이너가 창을 옮기지 않아도 지금 작업 중인 화면이 어떤 티켓에 묶여 있고 어느 단계인지 보입니다. 기획, 디자인, 개발 사이에 끊겨 있던 고리가 다시 이어졌고, 히스토리는 자동으로 남습니다.'
                    ],
                    en: [
                        'The second was a Jira plugin. The non-negotiable was not bypassing the firewall. Instead of the standard integration, we worked with the security team on a way to fetch Jira data within what policy allows, and built a plugin on top that shows and manages the tickets linked to a design, live, inside Figma.',
                        'Designers no longer switch windows to find out which ticket a screen belongs to or what stage it is in. The broken link between planning, design and development is back, and history is recorded on its own.'
                    ]
                }
            },
            {
                heading: { ko: '3. 다음 단계: 기계가 읽을 수 있는 디자인', en: '3. Next: design that machines can read' },
                paragraphs: {
                    ko: [
                        '변수로 스트링을 관리하기 시작하니 부수 효과가 있었습니다. 디자인 데이터가 구조를 갖게 된 것입니다. 지금은 이 구조 위에서 MCP(Model Context Protocol)로 LLM이 32개 언어의 UI 오버플로우와 문맥 오류를 자동으로 찾아내는 QA를 준비하고 있습니다. 사람이 서른두 번 보는 대신, 모델이 먼저 보고 의심스러운 것만 올리는 방식입니다.',
                        '아직 진행 중이지만, 방향은 분명합니다. 다국어 적용을 자동화하는 것을 넘어, 디자인 파일 자체를 검수 가능한 데이터로 만드는 것입니다.'
                    ],
                    en: [
                        'Managing strings as variables had a side effect: the design data gained structure. On that structure I am now preparing an MCP (Model Context Protocol) based QA step where an LLM scans the 32 languages for UI overflow and context errors. Rather than a person looking thirty-two times, the model looks first and raises only what looks wrong.',
                        'It is still in progress, but the direction is clear. Beyond automating localisation, the goal is to make the design file itself data that can be checked.'
                    ]
                }
            },
            {
                heading: { ko: '배운 것', en: 'What I took from it' },
                paragraphs: {
                    ko: [
                        '불편은 감수하는 게 아니라 고치는 것이라는 당연한 말을, 실제로 도구를 만들면서 팀의 기본값으로 바꿀 수 있었습니다. 디자이너가 기획서를 쓰고 로직을 설계하면 개발팀과 같은 언어로 이야기할 수 있고, 그만큼 빨리 만들어집니다.'
                    ],
                    en: [
                        'The obvious line, that inconvenience is something to fix rather than put up with, became the team default once we actually shipped tools. When a designer writes the spec and designs the logic, the conversation with developers happens in the same language, and things get built faster.'
                    ]
                },
                bullets: {
                    ko: [
                        '도구는 작게 시작합니다. 플러그인 하나가 프로세스 문서 열 장보다 빨리 습관을 바꿉니다.',
                        '보안은 우회 대상이 아니라 설계 조건입니다. 허용 범위를 먼저 확인하면 길이 보입니다.',
                        '데이터에 구조를 주면 자동화는 따라옵니다. 변수로 옮긴 순간 AI 검수가 가능해졌습니다.'
                    ],
                    en: [
                        'Start small. One plugin changes habits faster than ten pages of process documentation.',
                        'Security is a design constraint, not something to route around. Check what is allowed first and a path usually appears.',
                        'Give the data structure and automation follows. Moving strings into variables is what made AI review possible.'
                    ]
                }
            }
        ]
    }
];

export const findArticle = (slug: string) => articles.find(a => a.slug === slug);
