import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getMALStats } from './getMALStats';

import { MalUser } from '@/lib/MyAnimeList';
import BlurFade from '../../../magicui/blur-fade';
import { refreshTokenMal } from './refreshTokenMal';
import { getMALAnimes } from './getMALAnimes';
import { useSession } from "next-auth/react";

export default function MAL_Stats() {

    const mal_token = Cookies.get('mal_token') || '';
    const mal_refresh_token = Cookies.get('mal_refresh_token') || '';

    const { data: session } = useSession();
    const token = session?.user?.accessToken as string | undefined;

    const [stats, setStats] = useState<MalUser | null>(null);

    const expirationMinutes = 3;
    const expirationDays = expirationMinutes / (24 * 60)

    const fetchAnimeData = async (token: string, mal_token: string) => {
        await getMALAnimes(token, mal_token);
    }

    useEffect(() => {
        const savedStats = Cookies.get('mal_data') || null;

        if (savedStats) {
            setStats(JSON.parse(savedStats));
        } else {
            fetchData(mal_token, mal_refresh_token, setStats, expirationDays);
        }
        if (!token) return;
        fetchAnimeData(token, mal_token);
    }, [mal_token, mal_refresh_token, setStats, expirationDays]);

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

const fetchData = async (mal_token: string, mal_refresh_token: string, setStats: (stats: MalUser | null) => void, expirationDays: number) => {
    if (mal_token) {
        const res = await getMALStats(mal_token);

        if (res.error && res.error === 'invalid_token') {
            // setStats(null);
            // Cookies.remove('mal_token');
            const refresh = await refreshToken(mal_refresh_token);

            if (refresh) {
                const res = await getMALStats(refresh.access_token);
                setStats(res);
            }
        } else {
            setStats(res);
            Cookies.set('mal_data', JSON.stringify(res), { expires: 1 / 24 });
        }
    } else if (mal_refresh_token) {
        const refresh = await refreshToken(mal_refresh_token);

        if (refresh) {
            const res = await getMALStats(refresh.access_token);
            setStats(res);
        }
    }
};

const refreshToken = async (mal_refresh_token: string) => {
    const refresh = await refreshTokenMal(mal_refresh_token)

    if (!refresh.error) {
        Cookies.set('mal_token', refresh.access_token, { expires: 1 / 24 });
        Cookies.set('mal_refresh_token', refresh.refresh_token, { expires: 30 });
        return refresh;
    } else {
        Cookies.remove('mal_token');
        Cookies.remove('mal_refresh_token');
        throw new Error('Error al refrescar el token');
    }
}