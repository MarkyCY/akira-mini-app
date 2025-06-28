import { Suspense, useState, useEffect } from "react";
import BlurFade from "../magicui/blur-fade";
import TopUserPost from "../Home/stats/TopUserPost";
import ShowResume from "../Home/stats/ShowResume";
import TopUserSkeleton from "../Home/stats/TopUserSkeleton";
import ShowResumeSkeleton from "../Home/stats/ShowResumeSkeleton";
import SparklesText from "../magicui/sparkles-text";
import { getGroupStats } from "./GroupStatsAction";
import { StatsDaily } from "@/lib/StatsDaily";
import TopAdminWork from "../Home/stats/topAdmin";
import Cookies from 'js-cookie';
import WebApp from "@twa-dev/sdk";

import { useSession, signOut } from 'next-auth/react';

const isSameDay = (storedDate: string | null) => {
    if (!storedDate) return false;
    const currentDate = new Date();
    const stored = new Date(storedDate);
    return (
        currentDate.getFullYear() === stored.getFullYear() &&
        currentDate.getMonth() === stored.getMonth() &&
        currentDate.getDate() === stored.getDate()
    );
};


export default function Group() {
    const [data, setData] = useState<StatsDaily | null>(null);
    const { data: session, status } = useSession();

    const token = session?.user?.accessToken || null;
    const first_name = WebApp.initDataUnsafe.user?.first_name || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const responseData = await getGroupStats(token);
                    setData(responseData);
                    Cookies.set('groupStatsData', JSON.stringify(responseData), { expires: 1 }); // Guardar datos por 1 día
                    Cookies.set('groupStatsDate', new Date().toISOString(), { expires: 1 }); // Guardar fecha de la solicitud por 1 día
                }
            } catch (error: any) {
                console.error('Error al obtener los datos:', error);
                if (error.message === '401') {
                    signOut();
                }
            }
        }

        const savedData = Cookies.get('groupStatsData') || null;
        const savedDate = Cookies.get('groupStatsDate') || null;

        if (savedData && isSameDay(savedDate)) {
            setData(JSON.parse(savedData));
        } else {
            fetchData();
        }
    }, [token]);

    return (
        <>
            <div className="w-full h-auto max-w-sm pt-3" id="header">
                <BlurFade delay={0} inView>
                    <SparklesText className="text-4xl pb-2 font-semibold tracking-tighter dark:text-neutral-200" text={`Hola, ${first_name && /^[a-zA-Z0-9_'\-.,!? ]+$/.test(first_name)
                            ? first_name.slice(0, 15)
                            : 'amigo'
                        }! 👋`} />
                </BlurFade>
                <BlurFade delay={0} inView>
                    <span className="text-2xl text-pretty tracking-tighter dark:text-neutral-300">
                        Bienvenido a la Mini App de Otaku Senpai
                    </span>
                </BlurFade>
            </div>
            {/* Datos cargados, renderizar componentes */}
            <Suspense fallback={<ShowResumeSkeleton />}>
                {data ? <ShowResume data={data} /> : <ShowResumeSkeleton />}
            </Suspense>
            <Suspense fallback={<TopUserSkeleton />}>
                {data ? <TopAdminWork data={data.top_admins} /> : <TopUserSkeleton />}
            </Suspense>
            <Suspense fallback={<TopUserSkeleton />}>
                {data ? <TopUserPost data={data.top_users} /> : <TopUserSkeleton />}
            </Suspense>
        </>
    );
}