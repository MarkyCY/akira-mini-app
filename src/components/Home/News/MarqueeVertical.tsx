import Marquee from "@/components/ui/marquee";
import { Props, Entry } from '@/lib/getNews';
import ReviewCard from "./MarqueeCard";
import { useEffect } from "react";

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
        <div className="relative flex h-[700px] w-full flex-row items-center justify-center overflow-hidden">
            <Marquee pauseOnHover vertical className="[--duration:30s]">
                {entries.map((entry: Entry) => (
                    <ReviewCard key={entry.id} {...entry} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 dark:h-1/3 bg-gradient-to-b from-white dark:from-black"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 dark:h-1/3 bg-gradient-to-t from-white dark:from-black"></div>
        </div>
    );
}
