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
    no_data: { 'zh-TW': '無資料', 'en': 'No data available', 'ja': 'データなし', 'ko': '데이터 없음' },
    roas_leaderboard: { 'zh-TW': 'ROAS 排行榜', 'en': 'ROAS Leaderboard', 'ja': 'ROASランキング', 'ko': 'ROAS 순위' },


    // Campaign Actions & Modals
    traffic_overview: { 'zh-TW': '流量總覽', 'en': 'Traffic Overview', 'ja': 'トラフィック概要', 'ko': '트래픽 개요' },
    search_placeholder: { 'zh-TW': '搜尋資料...', 'en': 'Search data...', 'ja': 'データを検索...', 'ko': '데이터 검색...' },
    all_platforms: { 'zh-TW': '所有平台', 'en': 'All Platforms', 'ja': 'すべてのプラットフォーム', 'ko': '모든 플랫폼' },
    search_campaigns: { 'zh-TW': '搜尋廣告活動...', 'en': 'Search campaigns...', 'ja': 'キャンペーンを検索...', 'ko': '캠페인 검색...' },
    ai_opt_recommended: { 'zh-TW': '建議 AI 優化', 'en': 'AI Optimization Recommended', 'ja': 'AI最適化推奨', 'ko': 'AI 최적화 추천' },
    scale_budget: { 'zh-TW': '擴展預算', 'en': 'Scale Budget', 'ja': '予算拡大', 'ko': '예산 확대' },
    ai_optimization: { 'zh-TW': '🤖 AI 智慧優化', 'en': '🤖 AI Optimization', 'ja': '🤖 AI最適化', 'ko': '🤖 AI 최적화' },
    scale_campaign: { 'zh-TW': '🚀 擴展廣告活動', 'en': '🚀 Scale Campaign', 'ja': '🚀 キャンペーン拡大', 'ko': '🚀 캠페인 확대' },
    apply_fix: { 'zh-TW': '套用修正', 'en': 'Apply Fix', 'ja': '修正を適用', 'ko': '수정 적용' },
    confirm_increase: { 'zh-TW': '確認增加', 'en': 'Confirm Increase', 'ja': '増額を確認', 'ko': '증액 확인' },
    cancel: { 'zh-TW': '取消', 'en': 'Cancel', 'ja': 'キャンセル', 'ko': '취소' },
    ai_opt_insight: {
        'zh-TW': 'AI 偵測到「Creative_A」頻率過高。建議：降低 20% 預算並更新素材。',
        'en': 'AI detected high frequency on Creative_A. Recommendation: Decrease budget by 20% and refresh creatives.',
        'ja': 'AIが「Creative_A」の高頻度を検出しました。推奨：予算を20%削減し、クリエイティブを更新してください。',
        'ko': 'AI가 \'Creative_A\'의 높은 빈도를 감지했습니다. 권장 사항: 예산을 20% 줄이고 소재를 새로 고치세요.'
    },
    scale_insight: {
        'zh-TW': '此活動成效極佳 (ROAS 3.0+)。建議：增加 $500 預算。預估額外營收：$1,850。',
        'en': 'This campaign is performing exceptionally well (ROAS 3.0+). Recommendation: Increase budget by $500. Projected extra revenue: $1,850.',
        'ja': 'このキャンペーンは非常に好調です (ROAS 3.0+)。推奨：予算を$500増額してください。予想追加収益：$1,850。',
        'ko': '이 캠페인은 매우 성과가 좋습니다 (ROAS 3.0+). 권장 사항: 예산을 $500 늘리세요. 예상 추가 수익: $1,850.'
    },
    budget_allocator: { 'zh-TW': '預算分配模擬器', 'en': 'Budget Allocator', 'ja': '予算配分シミュレーター', 'ko': '예산 할당 시뮬레이터' },
    projected_revenue: { 'zh-TW': '預估營收增長', 'en': 'Projected Revenue', 'ja': '予想収益成長', 'ko': '예상 수익 증가' },
    projected_revenue_sim: { 'zh-TW': '模擬預估營收', 'en': 'Simulated Revenue', 'ja': 'シミュレーション収益', 'ko': '시뮬레이션 수익' },
    confidence_score: { 'zh-TW': 'AI 預測信心指數', 'en': 'AI Confidence Score', 'ja': 'AI予測信頼度', 'ko': 'AI 예측 신뢰도' },
    total_budget: { 'zh-TW': '總預算', 'en': 'Total Budget', 'ja': '総予算', 'ko': '총 예산' },
    current_allocation: { 'zh-TW': '目前分配', 'en': 'Current Allocation', 'ja': '現在の配分', 'ko': '현재 할당' },
    projected_total_revenue: { 'zh-TW': '預測總營收', 'en': 'Projected Total Revenue', 'ja': '予想総売上', 'ko': '예상 총 수익' },
    apply_forecast: { 'zh-TW': '套用預測模型', 'en': 'Apply Forecast', 'ja': '予測を適用', 'ko': '예측 적용' },
    profit: { 'zh-TW': '利潤', 'en': 'Profit', 'ja': '利益', 'ko': '이익' },
    monthly_budget: { 'zh-TW': '月預算', 'en': 'Monthly Budget', 'ja': '月間予算', 'ko': '월 예산' },
    target_roas: { 'zh-TW': '目標 ROAS', 'en': 'Target ROAS', 'ja': '目標ROAS', 'ko': '목표 ROAS' },
    consultant_planner: { 'zh-TW': '顧問規劃師', 'en': 'Consultant Planner', 'ja': 'コンサルタントプランナー', 'ko': '컨설턴트 플래너' },
    short_video_wars: { 'zh-TW': '短影音大戰', 'en': 'Short Video Wars', 'ja': 'ショート動画戦争', 'ko': '숏폼 전쟁' },

    // Metrics & detailed terms
    impressions: { 'zh-TW': '曝光數', 'en': 'Impressions', 'ja': 'インプレッション', 'ko': '노출 수' },
    clicks: { 'zh-TW': '點擊數', 'en': 'Clicks', 'ja': 'クリック数', 'ko': '클릭 수' },
    conversions: { 'zh-TW': '轉換數', 'en': 'Conversions', 'ja': 'コンバージョン', 'ko': '전환 수' },
    revenue: { 'zh-TW': '營收', 'en': 'Revenue', 'ja': '収益', 'ko': '수익' },
    spend: { 'zh-TW': '花費', 'en': 'Spend', 'ja': '消化額', 'ko': '지출' },
    roas: { 'zh-TW': 'ROAS (廣告投報率)', 'en': 'ROAS', 'ja': 'ROAS', 'ko': 'ROAS' },
    metrics_ctr: { 'zh-TW': '點擊率 (CTR)', 'en': 'CTR', 'ja': 'CTR', 'ko': 'CTR' }, // Renamed to avoid collision if necessary, or just remove if duplicated above.
    // Actually, looking at the file, 'ctr', 'roas' were defined in 'Campaigns Page' section AND 'Metrics' section.
    // I will remove them from the 'Metrics' section since they are duplicates.
    cv_rate: { 'zh-TW': '轉換率', 'en': 'CV Rate', 'ja': 'CV率', 'ko': '전환율' },
    avg_cpc: { 'zh-TW': '平均 CPC', 'en': 'Avg CPC', 'ja': '平均CPC', 'ko': '평균 CPC' },
    search_impression_share: { 'zh-TW': '搜尋曝光比重', 'en': 'Search Impr. Share', 'ja': '検索インプレッションシェア', 'ko': '검색 노출 점유율' },
    lead_quality_score: { 'zh-TW': '名單品質分數', 'en': 'Lead Quality Score', 'ja': 'リード品質スコア', 'ko': '리드 품질 점수' },
    block_rate: { 'zh-TW': '封鎖率', 'en': 'Block Rate', 'ja': 'ブロック率', 'ko': '차단율' },
    engagement_rate: { 'zh-TW': '互動率', 'en': 'Engagement Rate', 'ja': 'エンゲージメント率', 'ko': '참여율' },
    view_rate: { 'zh-TW': '觀看率', 'en': 'View Rate', 'ja': '視聴率', 'ko': '조회율' },
    open_rate: { 'zh-TW': '開信率', 'en': 'Open Rate', 'ja': '開封率', 'ko': '오픈율' },
    avg_frequency: { 'zh-TW': '平均頻率', 'en': 'Avg Frequency', 'ja': '平均頻度', 'ko': '평균 빈도' },
    total_spend: { 'zh-TW': '總花費', 'en': 'Total Spend', 'ja': '総支出', 'ko': '총 지출' },
    total_revenue: { 'zh-TW': '總營收', 'en': 'Total Revenue', 'ja': '総収益', 'ko': '총 수익' },
    paid_vs_organic: { 'zh-TW': '付費 vs 自然流量', 'en': 'Paid vs Organic', 'ja': '有料 vs 自然', 'ko': '유료 vs 자연' },
    // Pricing Tiers & Features
    tier_lite: { 'zh-TW': '創業起步版', 'en': 'Lite', 'ja': 'ライト', 'ko': '라이트' },
    tier_pro: { 'zh-TW': '專業成長版', 'en': 'Pro', 'ja': 'プロ', 'ko': '프로' },
    tier_agency: { 'zh-TW': '企業尊榮版', 'en': 'Agency', 'ja': 'エージェンシー', 'ko': '에이전시' },
    desc_lite: { 'zh-TW': '適合剛起步的個人創業者。', 'en': 'For Solopreneurs starting out.', 'ja': '起業したての個人事業主向け。', 'ko': '이제 막 시작하는 1인 기업가를 위한 요금제입니다.' },
    desc_pro: { 'zh-TW': '適合正在擴張的成長型品牌。', 'en': 'For Growing Brands scaling up.', 'ja': '拡大中の成長ブランド向け。', 'ko': '규모를 확장하는 성장형 브랜드를 위한 요금제입니다.' },
    desc_agency: { 'zh-TW': '適合行銷團隊與代理商。', 'en': 'For Marketing Teams & Agencies.', 'ja': 'マーケティングチーム＆代理店向け。', 'ko': '마케팅 팀 및 에이전시를 위한 요금제입니다.' },
    most_popular: { 'zh-TW': '最受歡迎', 'en': 'Most Popular', 'ja': '一番人気', 'ko': '가장 인기' },
    upgrade_experience: { 'zh-TW': '升級您的體驗', 'en': 'Upgrade your Experience', 'ja': '体験をアップグレード', 'ko': '경험 업그레이드' },
    upgrade_desc: { 'zh-TW': '解鎖 Lumina AdOS 的全部潛力。利用 AI 驅動的洞察力擴展您的行銷業務。', 'en': 'Unlock the full potential of Lumina AdOS. Scale your marketing with AI-driven insights.', 'ja': 'Lumina AdOSの可能性を最大限に引き出します。AI主導の洞察でマーケティングを拡大しましょう。', 'ko': 'Lumina AdOS의 모든 잠재력을 잠금 해제하세요. AI 기반 인사이트로 마케팅을 확장하세요.' },

    // Audience Persona
    high_value_persona: { 'zh-TW': '高價值客群：科技新貴型', 'en': 'High Value: Tech Savvy', 'ja': '高価値: テック愛好家', 'ko': '고가치: 테크 새비' },
    traits_label: { 'zh-TW': '特徵', 'en': 'Traits', 'ja': '特徴', 'ko': '특징' },
    traits_desc: { 'zh-TW': '年齡 28-45，興趣：投資、SaaS、效率工具', 'en': 'Age 28-45, Interests: Investing, SaaS, Productivity', 'ja': '年齢 28-45、興味: 投資、SaaS、生産性ツール', 'ko': '나이 28-45, 관심사: 투자, SaaS, 생산성 도구' },
    pain_points_label: { 'zh-TW': '痛點', 'en': 'Pain Points', 'ja': '悩み', 'ko': '페인 포인트' },
    pain_points_desc: { 'zh-TW': '沒時間研究數據，喜歡一鍵生成的報表', 'en': 'No time for data, likes 1-click reports', 'ja': 'データ分析の時間がない、ワンクリックレポートを好む', 'ko': '데이터 분석할 시간이 없음, 원클릭 보고서 선호' },
    target_persona: { 'zh-TW': '鎖定此客群', 'en': 'Target This Persona', 'ja': 'このペルソナをターゲット', 'ko': '이 페르소나 타겟팅' },
    target_success: { 'zh-TW': '成功鎖定目標客群！', 'en': 'Persona Targeted Successfully!', 'ja': 'ペルソナのターゲット設定に成功しました！', 'ko': '페르소나 타겟팅 성공!' },

    // Settings Guide & Interacts
    save_changes: { 'zh-TW': '儲存變更', 'en': 'Save Changes', 'ja': '変更を保存', 'ko': '변경 사항 저장' },
    saved_success: { 'zh-TW': '設定已儲存！', 'en': 'Settings Saved!', 'ja': '設定を保存しました！', 'ko': '설정이 저장되었습니다!' },
    how_to_find: { 'zh-TW': '如何取得？', 'en': 'How to find?', 'ja': '取得方法は？', 'ko': '찾는 방법?' },
    guide_meta_1: { 'zh-TW': '1. 前往 Meta Events Manager (事件管理工具)', 'en': '1. Go to Meta Events Manager', 'ja': '1. Metaイベントマネージャへ移動', 'ko': '1. Meta 이벤트 관리자로 이동' },
    guide_meta_2: { 'zh-TW': '2. 點擊左側『資料來源』', 'en': '2. Click "Data Sources" on left', 'ja': '2. 左側の「データソース」をクリック', 'ko': '2. 왼쪽의 "데이터 소스" 클릭' },
    guide_meta_3: { 'zh-TW': '3. 複製以 ID 開頭的數字串', 'en': '3. Copy ID string', 'ja': '3. IDで始まる文字列をコピー', 'ko': '3. ID로 시작하는 문자열 복사' },
    guide_ga4_1: { 'zh-TW': '1. 前往 GA4 『管理』介面', 'en': '1. Go to GA4 Admin', 'ja': '1. GA4管理画面へ移動', 'ko': '1. GA4 관리자 화면으로 이동' },
    guide_ga4_2: { 'zh-TW': '2. 點擊『資料串流』', 'en': '2. Click "Data Streams"', 'ja': '2. 「データストリーム」をクリック', 'ko': '2. "데이터 스트림" 클릭' },
    guide_ga4_3: { 'zh-TW': '3. 複製『評估 ID (G-XXXXXX)』', 'en': '3. Copy Measurement ID', 'ja': '3. 「測定ID」をコピー', 'ko': '3. "측정 ID" 복사' },
    validating: { 'zh-TW': '驗證中...', 'en': 'Validating...', 'ja': '検証中...', 'ko': '확인 중...' },
    connection_success: { 'zh-TW': '連線成功', 'en': 'Connected Successfully', 'ja': '接続成功', 'ko': '연결 성공' },

    // Budget Allocator Interact
    applying: { 'zh-TW': '套用中...', 'en': 'Applying...', 'ja': '適用中...', 'ko': '적용 중...' },
    budget_applied: { 'zh-TW': '預算模型已套用！預估營收增長 15%', 'en': 'Budget Model Applied! Projected +15% Revenue', 'ja': '予算モデル適用完了！予想収益 +15%', 'ko': '예산 모델 적용 완료! 예상 수익 +15%' },

    // Pricing Features
    basic_reporting: { 'zh-TW': '基礎報表', 'en': 'Basic Reporting', 'ja': '基本レポート', 'ko': '기본 보고서' },
    data_retention: { 'zh-TW': '資料保留', 'en': 'Data Retention', 'ja': 'データ保持', 'ko': '데이터 보존' },
    email_support: { 'zh-TW': 'Email 支援', 'en': 'Email Support', 'ja': 'メールサポート', 'ko': '이메일 지원' },
    priority_support: { 'zh-TW': '優先 Email 支援', 'en': 'Priority Email Support', 'ja': '優先メールサポート', 'ko': '우선 이메일 지원' },
    best_value: { 'zh-TW': '超值首選', 'en': 'Best Value', 'ja': 'ベストバリュー', 'ko': '가장 인기' },
    unlimited_accounts: { 'zh-TW': '無限帳戶數', 'en': 'Unlimited Accounts', 'ja': '無制限アカウント', 'ko': '무제한 계정' },
    dedicated_manager: { 'zh-TW': '專屬客戶經理', 'en': 'Dedicated Account Manager', 'ja': '専属アカウントマネージャー', 'ko': '전담 계정 관리자' },
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
