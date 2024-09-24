import { Suspense } from "react";
import ShowDataSkeleton from "../Home/ShowDataSkeleton";
import ShowData from "../Home/ShowData";
import MiniCard from "../Home/MiniCard";
import MiniCardSkeleton from "../Home/MiniCardSkeleton";
import BlurFade from "../magicui/blur-fade";
import SparklesText from "../magicui/sparkles-text";

export default function ProfileStats() {
    return (
        <>
            <div className="w-full h-auto max-w-sm pl-2 pt-3" id="header">
                <BlurFade delay={0} duration={0.50} inView>
                    <SparklesText sparklesCount={5} className="text-xl font-normal tracking-tighter dark:text-neutral-200" text="Perfil de usuario" />
                </BlurFade>
            </div>
            <Suspense fallback={<ShowDataSkeleton />}>
                <ShowData />
            </Suspense>
            {/*  */}
            <Suspense fallback={<MiniCardSkeleton />}>
                <MiniCard />
            </Suspense>
        </>
    )
}