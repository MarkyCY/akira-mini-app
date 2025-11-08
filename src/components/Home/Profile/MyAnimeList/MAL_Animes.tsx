import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import BlurFade from '../../../magicui/blur-fade';
import { AnimeAPIResponse } from '@/lib/getUserMAL';
import ListIcon from '@/components/icons/list';
import GridIcon from '@/components/icons/grid';
import ViewMalAnime from './viewMalAnime';

export default function MAL_Animes() {

    const mal_token = Cookies.get('mal_token') || '';
    const mal_refresh_token = Cookies.get('mal_refresh_token') || '';

    const [view, setView] = useState<'grid' | 'list'>('list');

    return (
        <BlurFade delay={0} duration={0.50} inView className="w-full h-auto max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-neutral-900 dark:border-neutral-900 p-4 gap-2">
            <div className="flex justify-between">
                <h5 className="text-base pb-3 font-semibold text-gray-900 md:text-xl dark:text-white">
                    Lista de Animes
                </h5>
                <div
                    className="cursor-pointer"
                    onClick={() => setView(view === 'list' ? 'grid' : 'list')}
                >
                    {view === 'list' ?
                        <ListIcon className={`text-neutral-200/70 pt-1`} />
                        :
                        <GridIcon className={`text-neutral-200/70 pt-1`} />}
                </div>
            </div>
            <ViewMalAnime view={view} mal_token={mal_token} mal_refresh_token={mal_refresh_token} />
        </BlurFade>
    )
}