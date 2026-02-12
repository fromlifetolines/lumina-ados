import { Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle, Video } from 'lucide-react';
import { PlatformId, platforms } from '@/lib/mockData';
import { cn } from '@/lib/utils';

// We map Lucide icons or custom SVGs to platforms
const iconMap: Record<PlatformId, any> = {
    meta: Facebook, // Representing Meta
    google: SearchIcon, // Custom or Lucide Search
    youtube: Youtube,
    tiktok: Video, // Placeholder for TikTok
    twitter: Twitter,
    linkedin: Linkedin,
    line: MessageCircle, // Placeholder for LINE
};

function SearchIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}

interface PlatformIconProps {
    platform: PlatformId;
    className?: string;
}

export const PlatformIcon = ({ platform, className }: PlatformIconProps) => {
    const Icon = iconMap[platform] || MessageCircle;
    const color = platforms[platform]?.color || '#ffffff';

    return (
        <div
            className={cn("flex items-center justify-center p-2 rounded-lg bg-white/5", className)}
            style={{ color: color }}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
        </div>
    );
};
