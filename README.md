# Lumina AdOS

## 🚀 實體產品連結 (Live Demo)

**正式環境網址:** [https://lumina-ados.vercel.app/](https://lumina-ados.vercel.app/)

> **注意:** 此專案已從靜態展示轉向全端 SaaS 架構，請由此連結進入以使用真實的數據分析、CRM 功能與 Stripe 結帳系統。

---

## 📑 Table of Contents (快速導覽)

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

---

## Project Overview

Lumina AdOS is an advanced advertising intelligence platform designed for marketing teams and agencies. It aggregates data from multiple platforms (Meta, Google, TikTok, etc.) into a unified dashboard with AI-driven insights.

## Key Features

- **Unified Dashboard**: Real-time metrics from 7 major ad platforms.
- **AI Smart Alerts**: Actionable insights and budget optimization suggestions.
- **Budget Simulator**: Scenario planning with ROAS and Revenue projections.
- **Audience Intelligence**: Demographic heatmaps and persona targeting.
- **SaaS Subscription**: 3-tier pricing model integrated with Stripe Checkout.
- **Authentication**: Secure Magic Link login via Supabase.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Glassmorphism Design System
- **Database & Auth**: Supabase (@supabase/ssr)
- **Payments**: Stripe Checkout
- **Deployment**: Vercel (Production)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The project is optimized for deployment on **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Add the required Environment Variables (Supabase & Stripe keys).
3. Deploy!

For more details, check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
