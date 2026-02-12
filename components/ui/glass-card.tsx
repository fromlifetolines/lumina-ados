'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    gradient?: boolean;
}

export const GlassCard = ({ children, className, gradient }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className={cn(
                'glass-card p-6 relative overflow-hidden',
                gradient && 'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none',
                className
            )}
        >
            {children}
        </motion.div>
    );
};
