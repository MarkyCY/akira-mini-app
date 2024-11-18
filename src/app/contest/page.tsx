"use client";
import { useEffect, useState } from "react";
import { getContests } from "@/components/Contest/getContests";
import ViewContest from "@/components/Contest/ViewContest";
import ViewSkeleton from "@/components/Contest/ViewContestSkeleton";
import BlurFade from "@/components/magicui/blur-fade";
import SparklesText from "@/components/magicui/sparkles-text";
import Cookies from 'js-cookie';
import { Suspense } from "react";

export default function ContestPage() {
    const [data, setData] = useState<Contest[] | null>(null);

    useEffect(() => {
        const token = Cookies.get('token') || '';
        const fetchData = async () => {
            if (token) {
                const responseData = await getContests(token);
                setData(responseData);
            }
        };

        fetchData();
    }, []);

    const handleChange = () => {
        const token = Cookies.get('token') || '';
        const fetchData = async () => {
            if (token) {
                const responseData = await getContests(token);
                setData([...responseData]);
            }
        };

        fetchData();
    }

    return (
        <>
            <div className="grid items-start gap-3 h-full">
                <BlurFade delay={0} duration={0.50} inView>
                    <SparklesText sparklesCount={5} className="text-2xl pl-2 font-normal tracking-tighter text-neutral-750 dark:text-neutral-200" text="Concursos activos" />
                </BlurFade>
                <Suspense fallback={<ViewSkeleton />}>
                    {data && data?.length > 0 ? (
                        data.map((contest) => (
                            <ViewContest key={contest.id} contest={contest} suscribeChange={handleChange} />
                        ))
                    ) : <>
                        <ViewSkeleton />
                    </>}
                </Suspense>
            </div>
        </>
    );
}

