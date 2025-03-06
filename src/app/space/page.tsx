"use client";

import { useSearchParams } from 'next/navigation';
import ShinyButton from '@/components/magicui/shiny-button';
import NewsContent from '@/components/Nav/NewsContest';
import SeasonalContent from '@/components/Nav/SeasonalContent';

export default function Home() {
    const searchParams = useSearchParams() as any;
    const params = new URLSearchParams(searchParams);

    // Función para cambiar el componente basado en el parámetro de la URL
    const handleComponentChange = (componentName: string) => {
        if (componentName) {
            params.set('group', componentName);
            // Actualizamos la URL sin recargar la página
            window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
        }
    };

    // Función para determinar qué componente renderizar basado en el parámetro 'group'
    const getComponentByParam = () => {
        const group = params.get('group');
        switch (group) {
            case 'news':
                return <NewsContent />;
            case 'seasonal':
                return <SeasonalContent />;
            default:
                return <NewsContent />;
        }
    };

    const currentGroup = params.get('group') || 'news';

    return (
        <>
            <div className="pb-3 flex gap-1">
                <div onClick={() => handleComponentChange('news')} className="cursor-pointer">
                    <ShinyButton
                        active={currentGroup === 'news' ? true : false}
                        text="🗞 News"
                        className={currentGroup === 'news' ? "dark:border dark:border-neutral-500/30" : "dark:border dark:border-neutral-500/10"}
                    />
                </div>
                <div onClick={() => handleComponentChange('seasonal')} className="cursor-pointer">
                    <ShinyButton
                        active={currentGroup === 'seasonal' ? true : false}
                        text={(() => {
                            const month = new Date().getMonth() + 1;
                            if (month >= 1 && month <= 3) return '❄️ Calendario';
                            if (month >= 4 && month <= 6) return '🌺 Calendario';
                            if (month >= 7 && month <= 9) return '☀️ Calendario';
                            if (month >= 10 && month <= 12) return '🍂 Calendario';
                            return 'Calendario';
                        })()}
                        className={currentGroup === 'seasonal' ? "dark:border dark:border-neutral-500/30" : "dark:border dark:border-neutral-500/10"}
                    />
                </div>
            </div >

            <div className="grid items-start gap-3">
                {getComponentByParam()}
            </div>
        </>
    );
}
