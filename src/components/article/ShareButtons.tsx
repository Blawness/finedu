"use client";

import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
    title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
    const handleTwitterShare = () => {
        if (typeof window !== "undefined") {
            window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
                "_blank"
            );
        }
    };

    const handleFacebookShare = () => {
        if (typeof window !== "undefined") {
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                "_blank"
            );
        }
    };

    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleTwitterShare}
            >
                Twitter
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleFacebookShare}
            >
                Facebook
            </Button>
        </div>
    );
}

