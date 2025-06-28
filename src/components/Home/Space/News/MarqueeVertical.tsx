// import Marquee from "@/components/ui/marquee";
import { Props, Entry } from '@/lib/getNews';
import ReviewCard from "./MarqueeCard";
import { useEffect } from "react";
import BlurFade from "@/components/magicui/blur-fade";

export function MarqueeDemoVertical({ entries }: Props) {

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(() => console.log('Service Worker registrado'))
                .catch((error) => console.error('Error registrando el Service Worker:', error));
        }
    }, []);

    return (
        <div className="relative">
            <BlurFade delay={0} duration={0.50} inView className="grid grid-cols-1 gap-3 h-auto">
                {entries.map((entry: Entry) => (
                    <ReviewCard key={entry.id} {...entry} />
                ))}

            </BlurFade>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 dark:h-10 bg-gradient-to-t from-white dark:from-black"></div>
        </div>
    );
}
