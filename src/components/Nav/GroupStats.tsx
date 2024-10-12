import { Suspense, useState, useEffect } from "react";
import BlurFade from "../magicui/blur-fade";
import TopUserPost from "../stats/TopUserPost";
import ShowResume from "../stats/ShowResume";
import TopUserSkeleton from "../stats/TopUserSkeleton";
import ShowResumeSkeleton from "../stats/ShowResumeSkeleton";
import SparklesText from "../magicui/sparkles-text";
import { getGroupStats } from "./GroupStatsAction";
import { StatsDaily } from "@/lib/StatsDaily";
import TopAdminWork from "../stats/topAdmin";
import Cookies from 'js-cookie';

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

    const token = Cookies.get('token') || '';

    const fetchData = async () => {
        if (token) {
            const responseData = await getGroupStats(token);
            setData(responseData);
            Cookies.set('groupStatsData', JSON.stringify(responseData), { expires: 1 }); // Guardar datos por 1 día
            Cookies.set('groupStatsDate', new Date().toISOString(), { expires: 1 }); // Guardar fecha de la solicitud por 1 día
        }
    }
    

    useEffect(() => {
        const savedData = Cookies.get('groupStatsData') || null;
        const savedDate = Cookies.get('groupStatsDate') || null;

        if (savedData && isSameDay(savedDate)) {
            setData(JSON.parse(savedData));
        } else {
            fetchData();
        }
    }, []);

    return (
        <>
            <div className="w-full h-auto max-w-sm pl-3 pt-3" id="header">
                <BlurFade delay={0.25} inView>
                    <SparklesText className="text-4xl pb-2 font-semibold tracking-tighter dark:text-neutral-200" text="Hola amigo! 👋" />
                </BlurFade>
                <BlurFade delay={0.25 * 2} inView>
                    <span className="text-2xl text-pretty tracking-tighter dark:text-neutral-300">
                        Bienvenido a la Mini App de Otaku Senpai
                    </span>
                </BlurFade>
            </div>
            <>
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
        </>
    );
}