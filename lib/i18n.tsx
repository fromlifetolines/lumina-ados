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
    pricing: { // Legacy key, kept for safety but UI updated to Subscription
        'zh-TW': '訂閱方案',
        'en': 'Pricing',
        'ja': '料金プラン',
        'ko': '가격 정책',
    },
    subscription: {
        'zh-TW': '訂閱方案',
        'en': 'Subscription',
        'ja': '定期購読',
        'ko': '구독',
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

    // Campaigns Page
    status: { 'zh-TW': '狀態', 'en': 'Status', 'ja': 'ステータス', 'ko': '상태' },
    platform: { 'zh-TW': '平台', 'en': 'Platform', 'ja': 'プラットフォーム', 'ko': '플랫폼' },
    campaign_name: { 'zh-TW': '活動名稱', 'en': 'Campaign Name', 'ja': 'キャンペーン名', 'ko': '캠페인명' },
    budget: { 'zh-TW': '預算', 'en': 'Budget', 'ja': '予算', 'ko': '예산' },
    spent: { 'zh-TW': '花費', 'en': 'Spent', 'ja': '消化額', 'ko': '지출액' },
    ctr: { 'zh-TW': '點擊率 (CTR)', 'en': 'CTR', 'ja': 'CTR', 'ko': 'CTR' },
    action: { 'zh-TW': '操作', 'en': 'Action', 'ja': 'アクション', 'ko': '작업' },
    active: { 'zh-TW': '進行中', 'en': 'Active', 'ja': 'アクティブ', 'ko': '활성' },
    paused: { 'zh-TW': '已暫停', 'en': 'Paused', 'ja': '一時停止', 'ko': '일시중지' },
    low_performance: { 'zh-TW': '成效低落', 'en': 'Low Performance', 'ja': 'パフォーマンス低下', 'ko': '성과 저조' },

    // Analytics Page
    platform_battle: { 'zh-TW': '平台對決 (ROI)', 'en': 'Platform Battle (ROI)', 'ja': 'プラットフォーム対決 (ROI)', 'ko': '플랫폼 대결 (ROI)' },
    conversion_funnel: { 'zh-TW': '轉換漏斗', 'en': 'Conversion Funnel', 'ja': 'コンバージョンファネル', 'ko': '전환 퍼널' },
    heatmap: { 'zh-TW': '熱力圖 (購買時間)', 'en': 'Heatmap (Purchase Time)', 'ja': 'ヒートマップ', 'ko': '히트맵' },
    cpa_trend: { 'zh-TW': 'CPA 趨勢', 'en': 'CPA Trend', 'ja': 'CPAトレンド', 'ko': 'CPA 추세' },

    // Audience Page
    demographics: { 'zh-TW': '人口統計', 'en': 'Demographics', 'ja': '人口統計', 'ko': '인구 통계' },
    gender: { 'zh-TW': '性別', 'en': 'Gender', 'ja': '性別', 'ko': '성별' },
    age_group: { 'zh-TW': '年齡層', 'en': 'Age Group', 'ja': '年齢層', 'ko': '연령대' },
    geo_distribution: { 'zh-TW': '地理分佈', 'en': 'Geo Distribution', 'ja': '地理的分布', 'ko': '지리적 분포' },
    interests: { 'zh-TW': '興趣標籤', 'en': 'Interests', 'ja': '興味・関心', 'ko': '관심사' },

    // Subscription Page
    monthly: { 'zh-TW': '月繳', 'en': 'Monthly', 'ja': '月払い', 'ko': '월간' },
    yearly: { 'zh-TW': '年繳', 'en': 'Yearly', 'ja': '年払い', 'ko': '연간' },
    save_20: { 'zh-TW': '省 20%', 'en': 'Save 20%', 'ja': '20%OFF', 'ko': '20% 절약' },
    subscribe: { 'zh-TW': '立即訂閱', 'en': 'Subscribe Now', 'ja': '今すぐ登録', 'ko': '지금 구독' },
    processing: { 'zh-TW': '處理中...', 'en': 'Processing...', 'ja': '処理中...', 'ko': '처리 중...' },
    subscribed_success: { 'zh-TW': '訂閱成功！', 'en': 'Subscribed Successfully!', 'ja': '登録完了！', 'ko': '구독 성공!' },

    // Settings Page
    profile: { 'zh-TW': '個人檔案', 'en': 'Profile', 'ja': 'プロフィール', 'ko': '프로필' },
    api_integration: { 'zh-TW': 'API 串接', 'en': 'API Integration', 'ja': 'API連携', 'ko': 'API 연동' },
    notifications: { 'zh-TW': '通知設定', 'en': 'Notifications', 'ja': '通知設定', 'ko': '알림 설정' },
    meta_pixel_id: { 'zh-TW': 'Meta Pixel ID', 'en': 'Meta Pixel ID', 'ja': 'Meta Pixel ID', 'ko': 'Meta Pixel ID' },
    google_ads_id: { 'zh-TW': 'Google Ads ID', 'en': 'Google Ads ID', 'ja': 'Google Ads ID', 'ko': 'Google Ads ID' },
    ga4_id: { 'zh-TW': 'GA4 Measurement ID', 'en': 'GA4 Measurement ID', 'ja': 'GA4 Measurement ID', 'ko': 'GA4 Measurement ID' },
    test_connection: { 'zh-TW': '測試連線', 'en': 'Test Connection', 'ja': '接続テスト', 'ko': '연결 테스트' },
    connected: { 'zh-TW': '已連線', 'en': 'Connected', 'ja': '接続済み', 'ko': '연결됨' },

    // Platforms
    meta: { 'zh-TW': 'Meta', 'en': 'Meta', 'ja': 'Meta', 'ko': 'Meta' },
    google: { 'zh-TW': 'Google', 'en': 'Google', 'ja': 'Google', 'ko': 'Google' },
    youtube: { 'zh-TW': 'YouTube', 'en': 'YouTube', 'ja': 'YouTube', 'ko': 'YouTube' },
    tiktok: { 'zh-TW': 'TikTok', 'en': 'TikTok', 'ja': 'TikTok', 'ko': 'TikTok' },
    twitter: { 'zh-TW': 'X (Twitter)', 'en': 'X (Twitter)', 'ja': 'X (Twitter)', 'ko': 'X (Twitter)' },
    linkedin: { 'zh-TW': 'LinkedIn', 'en': 'LinkedIn', 'ja': 'LinkedIn', 'ko': 'LinkedIn' },
    line: { 'zh-TW': 'LINE OA', 'en': 'LINE OA', 'ja': 'LINE公式', 'ko': 'LINE OA' },

    // Smart Alerts
    smart_alert_title: { 'zh-TW': '智慧警示', 'en': 'Smart Alert', 'ja': 'スマートアラート', 'ko': '스마트 알림' },
    smart_alert_cpa_warning: {
        'zh-TW': '⚠️ Facebook CPA 增加了 15%。建議暫停「Creative_A」。',
        'en': "⚠️ Facebook CPA increased by 15%. Recommend pausing 'Creative_A'.",
        'ja': '⚠️ FacebookのCPAが15%増加しました。「Creative_A」の停止を推奨します。',
        'ko': '⚠️ Facebook CPA가 15% 증가했습니다. \'Creative_A\' 일시 중지를 권장합니다.'
    },

    // Actions
    optimize: { 'zh-TW': '優化', 'en': 'Optimize', 'ja': '最適化', 'ko': '최적화' },
    scale: { 'zh-TW': '擴展', 'en': 'Scale', 'ja': '拡大', 'ko': '스ケールアップ' },
    connect: { 'zh-TW': '連結', 'en': 'Connect', 'ja': '接続', 'ko': '연결' },


    // Budget Simulator
    budget_simulator: { 'zh-TW': '預算模擬器', 'en': 'Budget Simulator', 'ja': '予算シミュレーター', 'ko': '예산 시뮬레이터' },
    current_allocation: { 'zh-TW': '目前分配', 'en': 'Current Allocation', 'ja': '現在の配分', 'ko': '현재 할당' },
    projected_revenue_sim: { 'zh-TW': '預測總營收', 'en': 'Projected Total Revenue', 'ja': '予想総売上', 'ko': '예상 총 수익' },

    // Metrics (Existing) -> Removed duplicates here as they are already defined above or effectively merged.
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
