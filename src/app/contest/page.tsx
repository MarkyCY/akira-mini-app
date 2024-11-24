"use client";
import ViewSkeleton from "@/components/Contest/ViewContestSkeleton";
import ContestList from "@/components/Contest/listContest";
import BlurFade from "@/components/magicui/blur-fade";
import SparklesText from "@/components/magicui/sparkles-text";
import { Suspense } from "react";

export default function ContestPage() {
    return (
        <>
            <div className="grid items-start gap-3 h-full">
                <BlurFade delay={0} duration={0.50} inView>
                    <SparklesText sparklesCount={5} className="text-2xl pl-2 font-normal tracking-tighter text-neutral-750 dark:text-neutral-200" text="Concursos activos" />
                </BlurFade>
                <Suspense fallback={<ViewSkeleton />}>
                    <ContestList />
                </Suspense>
            </div>
        </>
    );
}

