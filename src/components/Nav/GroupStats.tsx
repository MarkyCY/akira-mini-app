import { Suspense } from "react";
import BlurFade from "../magicui/blur-fade";
import TopUserPost from "../stats/TopUserPost";
import ShowResume from "../stats/ShowResume";
import TopUserSkeleton from "../stats/TopUserSkeleton";
import ShowResumeSkeleton from "../stats/ShowResumeSkeleton";
import SparklesText from "../magicui/sparkles-text";

export default function Group() {

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

            <Suspense fallback={<ShowResumeSkeleton />}>
                <ShowResume />
            </Suspense>
            {/*  */}
            <Suspense fallback={<TopUserSkeleton />}>
                <TopUserPost />
            </Suspense>
        </>
    )
}