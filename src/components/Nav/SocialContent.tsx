import { Suspense } from "react";
import SliderContentSkeleton from "../Home/SliderContentSkeleton";
import SliderContent from "../Home/SliderContent";
import BlurFade from "../magicui/blur-fade";
import SparklesText from "../magicui/sparkles-text";

export default function SocialContent() {
    return (
        <>
            <div className="w-full h-auto max-w-sm pl-2 pt-3" id="header">
                <BlurFade delay={0} duration={0.50} inView>
                    <SparklesText sparklesCount={5} className="text-xl font-normal tracking-tighter dark:text-neutral-200" text="Redes Sociales" />
                </BlurFade>
            </div>
            <Suspense fallback={<SliderContentSkeleton />}>
                <SliderContent />
            </Suspense>
        </>
    )
}