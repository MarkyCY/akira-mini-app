import { Suspense } from "react";
import MiniCard from "@/components/Shop/MiniCard";
import MiniCardSkeleton from "@/components/Shop/MiniCardSkeleton";
import ItemCard from "@/components/Shop/ItemCard";
import BlurFade from "../magicui/blur-fade";
import SparklesText from "../magicui/sparkles-text";

export default function ShopContent() {

    return (
        <BlurFade delay={0} duration={0.50} inView className="grid items-start gap-3">
            <div className="w-full h-auto max-w-sm pt-3" id="header">
                <div>
                    <SparklesText sparklesCount={5} className="text-xl font-normal tracking-tighter dark:text-neutral-200" text="Tienda" />
                </div>
            </div>
            <Suspense fallback={<MiniCardSkeleton />}>
                <MiniCard />
            </Suspense>
            <ItemCard />
        </BlurFade>
    )
}