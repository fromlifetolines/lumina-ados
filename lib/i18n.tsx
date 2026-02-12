'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'zh-TW' | 'en' | 'ja' | 'ko';

export interface Translations {
    [key: string]: {
        [key in Language]: string;
    };
}

const translations: Translations = {
    // Navigation & General
    dashboard: {
        'zh-TW': '儀表板',
        'en': 'Dashboard',
        'ja': 'ダッシュボード',
        'ko': '대시보드',
    },
    campaigns: {
        'zh-TW': '廣告活動',
        'en': 'Campaigns',
        'ja': 'キャンペーン',
        'ko': '캠페인',
    },
    analytics: {
        'zh-TW': '分析報表',
        'en': 'Analytics',
        'ja': '分析',
        'ko': '분석',
    },
    audience: {
        'zh-TW': '受眾分析',
        'en': 'Audience',
        'ja': 'オーディエンス',
        'ko': '타겟',
    },
    pricing: {
        'zh-TW': '訂閱方案',
        'en': 'Pricing',
        'ja': '料金プラン',
        'ko': '가격 정책',
    },
    settings: {
        'zh-TW': '設定',
        'en': 'Settings',
        'ja': '設定',
        'ko': '설정',
    },
    logout: {
        'zh-TW': '登出',
        'en': 'Logout',
        'ja': 'ログアウト',
        'ko': '로그아웃',
    },
    welcome_back: {
        'zh-TW': '歡迎回來',
        'en': 'Welcome back',
        'ja': 'お帰りなさい',
        'ko': '환영합니다',
    },
    campaign_overview: {
        'zh-TW': '這是您的廣告活動成效總覽。',
        'en': "Here's your campaign performance overview.",
        'ja': 'キャンペーンのパフォーマンス概要です。',
        'ko': '귀하의 캠페인 성과 개요입니다.',
    },

    // Metrics
    total_spend: {
        'zh-TW': '總花費',
        'en': 'Total Spend',
        'ja': '総支出',
        'ko': '총 지출',
    },
    total_revenue: {
        'zh-TW': '總營收',
        'en': 'Total Revenue',
        'ja': '総売上',
        'ko': '총 수익',
    },
    roas: {
        'zh-TW': '廣告投報率',
        'en': 'Blended ROAS',
        'ja': '広告費用対効果',
        'ko': '광고 수익률',
    },
    seo_traffic: {
        'zh-TW': 'SEO 流量',
        'en': 'SEO Traffic',
        'ja': 'SEOトラフィック',
        'ko': 'SEO 트래픽',
    },
    traffic_overview: {
        'zh-TW': '流量總覽',
        'en': 'Traffic Overview',
        'ja': 'トラフィック概要',
        'ko': '트래픽 개요',
    },
    paid_vs_organic: {
        'zh-TW': '付費 vs 自然流量',
        'en': 'Paid vs. Organic performance',
        'ja': '有料 vs 自然検索',
        'ko': '유료 vs 오가닉 성과',
    },

    // Platform Breakdown
    top_creatives: {
        'zh-TW': '熱門素材',
        'en': 'Top Creatives',
        'ja': 'トップクリエイティブ',
        'ko': '인기 소재',
    },
    top_keywords: {
        'zh-TW': '熱門關鍵字',
        'en': 'Top Keywords',
        'ja': 'トップキーワード',
        'ko': '인기 키워드',
    },
    short_video_wars: {
        'zh-TW': '短影音對決',
        'en': 'Short Video Wars',
        'ja': 'ショート動画競争',
        'ko': '숏폼 경쟁',
    },

    // Scenario Planner
    consultant_planner: {
        'zh-TW': '顧問級預算規劃',
        'en': 'The "Consultant" Planner',
        'ja': 'コンサルタントプランナー',
        'ko': '"컨설턴트" 플래너',
    },
    adjust_budget: {
        'zh-TW': '調整預算以預測營收',
        'en': 'Adjust budget to see revenue projections',
        'ja': '予算を調整して収益を予測',
        'ko': '예산을 조정하여 예상 수익 확인',
    },
    monthly_budget: {
        'zh-TW': '月廣告預算',
        'en': 'Monthly Ad Budget',
        'ja': '月間広告予算',
        'ko': '월간 광고 예산',
    },
    target_roas: {
        'zh-TW': '目標 ROAS',
        'en': 'Target ROAS',
        'ja': '目標ROAS',
        'ko': '목표 ROAS',
    },
    projected_revenue: {
        'zh-TW': '預測營收',
        'en': 'Projected Revenue',
        'ja': '予想収益',
        'ko': '예상 수익',
    },
    apply_forecast: {
        'zh-TW': '套用預測',
        'en': 'Apply to Forecast',
        'ja': '予測を適用',
        'ko': '예측 적용',
    },
    profit: {
        'zh-TW': '淨利',
        'en': 'Profit',
        'ja': '利益',
        'ko': '이익',
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('zh-TW');

    const t = (key: string): string => {
        const translation = translations[key];
        if (!translation) {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }
        return translation[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
