'use client';

import { create } from 'zustand';

type Currency = 'TWD' | 'USD';

interface CurrencyState {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    convert: (amount: number) => number;
    format: (amount: number) => string;
}

const EXCHANGE_RATE = 0.032; // 1 TWD = 0.032 USD (approx 1 USD = 31.25 TWD)

export const useCurrency = create<CurrencyState>()((set, get) => ({
    currency: 'TWD',
    setCurrency: (currency) => set({ currency }),
    convert: (amount) => {
        const { currency } = get();
        return currency === 'USD' ? amount * EXCHANGE_RATE : amount;
    },
    format: (amount) => {
        const { currency, convert } = get();
        const value = convert(amount);
        return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'zh-TW', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
        }).format(value);
    },
}));
