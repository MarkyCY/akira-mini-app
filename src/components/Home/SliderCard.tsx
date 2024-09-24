import HeroVideoDialog from '../magicui/hero-video-dialog'

export default function SliderCard() {

    return (
        <div className="space-y-3 w-[200px] rounded-[13px] shadow border-gray-200 dark:bg-neutral-900 dark:border-neutral-900">
            <span data-state="closed">
                <div className="overflow-hidden bg-gradient-to-r from-orange-400 to-pink-500 rounded-t-[12px] h-28 w-full">
                    {/* <Image src="https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg" alt="Sunset Beach Hotel" className="object-cover rounded-t-[12px]" width={640} height={640} /> */}
                    <HeroVideoDialog
                        className=""
                        animationStyle="from-center"
                        videoSrc=""
                        thumbnailSrc="https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg"
                        thumbnailAlt="Hero Video"
                    />
                </div>
            </span>
            <div className="space-y-1 text-sm px-4 pb-4">
                <h3 className="text-base font-medium leading-none text-black dark:text-white">Secretos del Oricalco</h3>
                <p className="text-[13px] text-muted-foreground text-neutral-700 dark:text-neutral-400">Hoy veremos todos los secretos del oricalco en vivo y en directo.</p>
                <div>
                    <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-300">
                        2 days incoming
                    </a>
                </div>
            </div>
        </div>
    )
}