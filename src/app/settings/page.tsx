"use client"
import BlurFade from "@/components/magicui/blur-fade"
import SparklesText from "@/components/magicui/sparkles-text"
import ToggleTheme from "@/components/settings/toggle-theme"

export default function Settings() {

    return (
        <div className="px-5 pt-10 pb-24 grid items-start gap-2.5">
            <BlurFade delay={0} duration={0.50} inView>
                <SparklesText sparklesCount={5} className="text-xl font-normal tracking-tighter dark:text-neutral-200" text="Ajustes" />
            </BlurFade>
            <BlurFade delay={0.1} duration={0.50} inView>
                <ToggleTheme />
            </BlurFade>
        </div>
    )
}
