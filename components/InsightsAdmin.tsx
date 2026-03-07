import React, { useState, useEffect } from 'react';
import { InsightItem, InsightLink, getInsightsData, saveInsightsData, getNextId, defaultData } from '../lib/insightsData';

const ICON_OPTIONS = ['Globe', 'BookOpen', 'Figma', 'Github', 'Newspaper', 'ExternalLink'];
const PLATFORM_OPTIONS = ['Medium', 'Brunch', 'Figma', 'Github', 'News', 'Other'];
const TYPE_OPTIONS: { value: InsightItem['type']; label: string }[] = [
    { value: 'article', label: '📝 Article / Writing' },
    { value: 'resource', label: '🔧 Resource / Code' },
    { value: 'press', label: '📰 Press / Media' },
];

const emptyItem: Omit<InsightItem, 'id'> = {
    type: 'article',
    titleKo: '',
    titleEn: '',
    descriptionKo: '',
    descriptionEn: '',
    tags: [],
    links: [],
    createdAt: new Date().toISOString(),
};

export const InsightsAdmin: React.FC = () => {
    const [items, setItems] = useState<InsightItem[]>([]);
    const [editingItem, setEditingItem] = useState<InsightItem | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [toast, setToast] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setItems(getInsightsData());
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    const translateText = async (text: string, from: string, to: string) => {
        try {
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
            const data = await res.json();
            return data.responseData?.translatedText || text;
        } catch (e) {
            console.error('Translation error:', e);
            return text;
        }
    };

    const handleSave = async () => {
        if (!editingItem) return;
        if (!editingItem.titleKo.trim() && !editingItem.titleEn.trim()) {
            showToast('⚠️ 최소한 한 언어의 제목을 입력해주세요 (Please enter at least one title)');
            return;
        }

        setIsSaving(true);
        let finalItem = { ...editingItem };

        if (finalItem.titleKo.trim() && !finalItem.titleEn.trim()) {
            showToast('영문 제목을 자동 번역 중...');
            finalItem.titleEn = await translateText(finalItem.titleKo, 'ko', 'en');
        } else if (!finalItem.titleKo.trim() && finalItem.titleEn.trim()) {
            showToast('한글 제목을 자동 번역 중...');
            finalItem.titleKo = await translateText(finalItem.titleEn, 'en', 'ko');
        }

        if (finalItem.descriptionKo.trim() && !finalItem.descriptionEn.trim()) {
            showToast('영문 설명을 자동 번역 중...');
            finalItem.descriptionEn = await translateText(finalItem.descriptionKo, 'ko', 'en');
        } else if (!finalItem.descriptionKo.trim() && finalItem.descriptionEn.trim()) {
            showToast('한글 설명을 자동 번역 중...');
            finalItem.descriptionKo = await translateText(finalItem.descriptionEn, 'en', 'ko');
        }

        let updated: InsightItem[];
        if (isCreating) {
            const newItem = { ...finalItem, id: getNextId(items), createdAt: new Date().toISOString() };
            updated = [newItem, ...items];
        } else {
            updated = items.map(i => i.id === finalItem.id ? finalItem : i);
        }

        saveInsightsData(updated);
        setItems(updated.sort((a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        ));
        setEditingItem(null);
        setIsCreating(false);
        setIsSaving(false);
        showToast(isCreating ? '✅ 새 콘텐츠가 추가되었습니다' : '✅ 콘텐츠가 수정되었습니다');
    };

    const handleDelete = (id: number) => {
        const updated = items.filter(i => i.id !== id);
        saveInsightsData(updated);
        setItems(updated);
        setDeleteConfirm(null);
        showToast('🗑️ 콘텐츠가 삭제되었습니다');
    };

    const handleAddNew = () => {
        setEditingItem({ ...emptyItem, id: 0 } as InsightItem);
        setIsCreating(true);
        setTagInput('');
    };

    const handleEdit = (item: InsightItem) => {
        setEditingItem({ ...item });
        setIsCreating(false);
        setTagInput('');
    };

    const handleCancel = () => {
        setEditingItem(null);
        setIsCreating(false);
    };

    const handleResetToDefault = () => {
        saveInsightsData(defaultData);
        setItems(defaultData);
        setEditingItem(null);
        showToast('🔄 기본 데이터로 초기화되었습니다');
    };

    // Tag management
    const addTag = () => {
        if (!editingItem || !tagInput.trim()) return;
        if (!editingItem.tags.includes(tagInput.trim())) {
            setEditingItem({ ...editingItem, tags: [...editingItem.tags, tagInput.trim()] });
        }
        setTagInput('');
    };

    const removeTag = (tag: string) => {
        if (!editingItem) return;
        setEditingItem({ ...editingItem, tags: editingItem.tags.filter(t => t !== tag) });
    };

    // Link management
    const addLink = () => {
        if (!editingItem) return;
        const newLink: InsightLink = { lang: '', platform: 'Medium', url: '', iconName: 'Globe' };
        setEditingItem({ ...editingItem, links: [...editingItem.links, newLink] });
    };

    const updateLink = (index: number, field: keyof InsightLink, value: string) => {
        if (!editingItem) return;
        const updatedLinks = editingItem.links.map((link, i) =>
            i === index ? { ...link, [field]: value } : link
        );
        setEditingItem({ ...editingItem, links: updatedLinks });
    };

    const removeLink = (index: number) => {
        if (!editingItem) return;
        setEditingItem({ ...editingItem, links: editingItem.links.filter((_, i) => i !== index) });
    };

    const getTypeLabel = (type: string) => {
        const found = TYPE_OPTIONS.find(t => t.value === type);
        return found?.label || type;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Toast */}
            {toast && (
                <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-pulse">
                    {toast}
                </div>
            )}

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href="/" className="text-sm text-slate-400 hover:text-brand-600 transition-colors">← 사이트로 돌아가기</a>
                        <span className="text-slate-300">|</span>
                        <h1 className="text-lg font-bold text-slate-800">Insights Manager</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">{items.length}개의 콘텐츠</span>
                        <button
                            onClick={handleResetToDefault}
                            className="text-xs text-slate-400 hover:text-red-500 transition-colors"
                        >
                            기본값으로 초기화
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Add Button */}
                {!editingItem && (
                    <button
                        onClick={handleAddNew}
                        className="w-full mb-8 p-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50 transition-all font-semibold text-sm flex items-center justify-center gap-2"
                    >
                        <span className="text-xl">+</span> 새 콘텐츠 추가
                    </button>
                )}

                {/* Edit Form */}
                {editingItem && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-800">
                                {isCreating ? '✨ 새 콘텐츠 추가' : '✏️ 콘텐츠 수정'}
                            </h2>
                            <button onClick={handleCancel} className="text-slate-400 hover:text-slate-600 text-sm">
                                취소
                            </button>
                        </div>

                        <div className="space-y-5">
                            {/* Type */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">타입</label>
                                <div className="flex gap-2">
                                    {TYPE_OPTIONS.map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setEditingItem({ ...editingItem, type: opt.value })}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${editingItem.type === opt.value
                                                ? 'bg-brand-600 text-white shadow-md'
                                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Title KO */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">제목 (Korean)</label>
                                <input
                                    type="text"
                                    value={editingItem.titleKo}
                                    onChange={e => setEditingItem({ ...editingItem, titleKo: e.target.value })}
                                    placeholder="한글 제목을 입력하세요"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-800"
                                />
                            </div>

                            {/* Title EN */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">제목 (English)</label>
                                <input
                                    type="text"
                                    value={editingItem.titleEn}
                                    onChange={e => setEditingItem({ ...editingItem, titleEn: e.target.value })}
                                    placeholder="Enter English title"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-800"
                                />
                            </div>

                            {/* Description KO */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">설명 (Korean)</label>
                                <textarea
                                    value={editingItem.descriptionKo}
                                    onChange={e => setEditingItem({ ...editingItem, descriptionKo: e.target.value })}
                                    placeholder="한글 설명을 입력하세요"
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-800 resize-none"
                                />
                            </div>

                            {/* Description EN */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">설명 (English)</label>
                                <textarea
                                    value={editingItem.descriptionEn}
                                    onChange={e => setEditingItem({ ...editingItem, descriptionEn: e.target.value })}
                                    placeholder="Enter English description"
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-800 resize-none"
                                />
                            </div>

                            {/* Source (for press type) */}
                            {editingItem.type === 'press' && (
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">출처</label>
                                    <input
                                        type="text"
                                        value={editingItem.source || ''}
                                        onChange={e => setEditingItem({ ...editingItem, source: e.target.value })}
                                        placeholder="예: CA Magazine, 동아일보"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-slate-800"
                                    />
                                </div>
                            )}

                            {/* Tags */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">태그</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {editingItem.tags.map(tag => (
                                        <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-sm rounded-md border border-slate-200">
                                            {tag}
                                            <button onClick={() => removeTag(tag)} className="text-slate-400 hover:text-red-500 ml-1">×</button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={e => setTagInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                                        placeholder="태그 입력 후 Enter"
                                        className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-brand-400 outline-none text-sm"
                                    />
                                    <button
                                        onClick={addTag}
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-lg transition-colors"
                                    >
                                        추가
                                    </button>
                                </div>
                            </div>

                            {/* Links */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">링크</label>

                                {/* Article preset buttons */}
                                {editingItem.type === 'article' && (
                                    <div className="flex gap-2 mb-3">
                                        <button
                                            onClick={() => {
                                                if (!editingItem.links.some(l => l.platform === 'Medium')) {
                                                    setEditingItem({ ...editingItem, links: [...editingItem.links, { lang: 'EN', platform: 'Medium', url: '', iconName: 'Globe' }] });
                                                }
                                            }}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${editingItem.links.some(l => l.platform === 'Medium')
                                                ? 'bg-blue-50 text-blue-500 border-blue-200 cursor-default'
                                                : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                                                }`}
                                        >
                                            🌐 EN (Medium) 추가
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (!editingItem.links.some(l => l.platform === 'Brunch')) {
                                                    setEditingItem({ ...editingItem, links: [...editingItem.links, { lang: 'KR', platform: 'Brunch', url: '', iconName: 'BookOpen' }] });
                                                }
                                            }}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${editingItem.links.some(l => l.platform === 'Brunch')
                                                ? 'bg-emerald-50 text-emerald-500 border-emerald-200 cursor-default'
                                                : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                                                }`}
                                        >
                                            📖 KR (Brunch) 추가
                                        </button>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    {editingItem.links.map((link, idx) => (
                                        <div key={idx} className="flex flex-wrap gap-2 items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <input
                                                type="text"
                                                value={link.lang}
                                                onChange={e => updateLink(idx, 'lang', e.target.value)}
                                                placeholder="라벨 (EN, KR 등)"
                                                className="w-24 px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-400"
                                            />
                                            <select
                                                value={link.platform}
                                                onChange={e => updateLink(idx, 'platform', e.target.value)}
                                                className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-400 bg-white"
                                            >
                                                {PLATFORM_OPTIONS.map(p => (
                                                    <option key={p} value={p}>{p}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={link.iconName}
                                                onChange={e => updateLink(idx, 'iconName', e.target.value)}
                                                className="px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-400 bg-white"
                                            >
                                                {ICON_OPTIONS.map(ic => (
                                                    <option key={ic} value={ic}>{ic}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="url"
                                                value={link.url}
                                                onChange={e => updateLink(idx, 'url', e.target.value)}
                                                placeholder="URL"
                                                className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-400"
                                            />
                                            <button
                                                onClick={() => removeLink(idx)}
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={addLink}
                                    className="mt-2 text-sm text-brand-600 hover:text-brand-700 font-medium"
                                >
                                    + 링크 추가
                                </button>
                            </div>

                            {/* Hidden toggle */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setEditingItem({ ...editingItem, hidden: !editingItem.hidden })}
                                    className={`relative w-11 h-6 rounded-full transition-colors ${editingItem.hidden ? 'bg-red-400' : 'bg-slate-200'
                                        }`}
                                >
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${editingItem.hidden ? 'translate-x-5' : 'translate-x-0'
                                        }`} />
                                </button>
                                <span className="text-sm text-slate-500">
                                    {editingItem.hidden ? '🙈 숨김 상태 (메인 사이트에 표시되지 않음)' : '👁️ 공개 상태'}
                                </span>
                            </div>

                            {/* Save */}
                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-8 py-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-brand-200 transition-all active:scale-95"
                                >
                                    {isSaving ? '저장/번역 중...' : (isCreating ? '추가하기' : '저장하기')}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors"
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Items List */}
                <div className="space-y-3">
                    {items.length === 0 && (
                        <div className="text-center py-16 text-slate-400">
                            <p className="text-lg font-medium mb-2">아직 콘텐츠가 없습니다</p>
                            <p className="text-sm">위의 버튼을 눌러 새 콘텐츠를 추가해보세요</p>
                        </div>
                    )}
                    {items.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all ${editingItem?.id === item.id ? 'ring-2 ring-brand-400' : ''
                                } ${item.hidden ? 'opacity-50' : ''}`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-slate-400">{String(idx + 1).padStart(2, '0')}</span>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.type === 'article' ? 'bg-blue-50 text-blue-600' :
                                            item.type === 'resource' ? 'bg-emerald-50 text-emerald-600' :
                                                'bg-amber-50 text-amber-600'
                                            }`}>
                                            {item.type}
                                        </span>
                                        <div className="flex gap-1.5 overflow-hidden">
                                            {item.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-sm truncate">{item.titleKo}</h3>
                                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.descriptionKo}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => {
                                            const updated = items.map(i => i.id === item.id ? { ...i, hidden: !i.hidden } : i);
                                            saveInsightsData(updated);
                                            setItems(updated);
                                            showToast(item.hidden ? '👁️ 공개 전환' : '🙈 숨김 전환');
                                        }}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${item.hidden
                                            ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        {item.hidden ? '숨김' : '공개'}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                                    >
                                        수정
                                    </button>
                                    {deleteConfirm === item.id ? (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                            >
                                                확인
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(null)}
                                                className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                                            >
                                                취소
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setDeleteConfirm(item.id)}
                                            className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            삭제
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
