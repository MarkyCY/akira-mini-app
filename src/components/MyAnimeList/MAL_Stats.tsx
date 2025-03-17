import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getMALStats } from './getMALStats';

import { MalUser } from '@/lib/MyAnimeList';
import BlurFade from '../magicui/blur-fade';

export default function MAL_Stats() {

    const mal_token = Cookies.get('mal_token') || '';

    const [stats, setStats] = useState<MalUser | null>(null);

    const expirationMinutes = 3;
    const expirationDays = expirationMinutes / (24 * 60)

    useEffect(() => {
        const savedStats = Cookies.get('mal_data') || null;

        if (savedStats) {
            setStats(JSON.parse(savedStats));
        } else {
            fetchData(mal_token, setStats, expirationDays);
        }
    }, [mal_token, setStats, expirationDays]);

    return (
        <BlurFade delay={0} duration={0.50} inView className="w-full h-auto max-w-sm flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-neutral-900 dark:border-neutral-900">
            <h1 className='text-xl font-bold pb-5'>Estadísticas de MyAnimeList</h1>
            {stats && stats.anime_statistics ? (
                <>
                    <div className="grid grid-cols-2 border-b border-gray-200 pb-4 dark:border-neutral-600/50">
                        <div>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                <span className="font-medium">{stats.name}</span>
                            </p>
                            <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Nombre de usuario</p>
                        </div>
                        <div>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                <span className="font-medium">{stats.birthday}</span>
                            </p>
                            <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Cumpleaños</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <div>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                <span className="font-medium">{stats.anime_statistics.num_items_watching}</span>
                            </p>
                            <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Viendo ahora</p>
                        </div>
                        <div>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                <span className="font-medium">{stats.anime_statistics.num_items}</span>
                            </p>
                            <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Animes vistos</p>
                        </div>
                        <div>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                <span className="font-medium">{stats.anime_statistics.mean_score}</span>
                            </p>
                            <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Puntuacion</p>
                        </div>
                        <div>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                <span className="font-medium">{stats.anime_statistics.num_items_completed}</span>
                            </p>
                            <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Completados</p>
                        </div>
                        <div>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                <span className="font-medium">{stats.anime_statistics.num_episodes}</span>
                            </p>
                            <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Episodios</p>
                        </div>
                        <div>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                <span className="font-medium">{stats.anime_statistics.num_times_rewatched}</span>
                            </p>
                            <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Repeticiones</p>
                        </div>
                        <div>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                <span className="font-medium">{stats.anime_statistics.num_items_plan_to_watch}</span>
                            </p>
                            <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Planeados</p>
                        </div>
                        <div>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                <span className="font-medium">{stats.anime_statistics.num_items_on_hold}</span>
                            </p>
                            <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">En espera</p>
                        </div>
                        <div>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                                <span className="font-medium">{stats.anime_statistics.num_items_dropped}</span>
                            </p>
                            <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Abandonado</p>
                        </div>
                    </div>
                </>
            ) : <p className='text-sm text-center font-normal text-gray-500 dark:text-gray-400'>Cargando...</p>}
        </BlurFade>
    )
}

const fetchData = async (mal_token: string, setStats: (stats: MalUser | null) => void, expirationDays: number) => {
    if (mal_token) {
        const res = await getMALStats(mal_token);
        setStats(res);
        Cookies.set('mal_data', JSON.stringify(res), { expires: expirationDays });
    }
};