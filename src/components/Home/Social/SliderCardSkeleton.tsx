export default function SliderCardSkeleton() {

    return (
        <div className="space-y-3 w-[200px] rounded-[13px] shadow bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-900">
            <span data-state="closed">
                <div className="overflow-hidden rounded-t-[12px] h-28 w-full animate-pulse">
                    <div className="flex items-center justify-center object-cover rounded-t-[12px] bg-gray-300 dark:bg-neutral-700 h-full w-full">
                        <svg className="w-10 h-10 text-gray-200 dark:text-neutral-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                </div>
            </span>
            <div className="space-y-2 text-sm px-4 pb-4">
                <h3 className="text-base font-medium leading-none text-black dark:text-white animate-pulse bg-gray-300 dark:bg-neutral-700 h-4 w-3/4 rounded"></h3>
                <p className="text-sm text-muted-foreground text-neutral-700 dark:text-neutral-400 animate-pulse bg-gray-300 dark:bg-neutral-700 h-2 w-4/5 rounded"></p>
                <p className="text-sm text-muted-foreground text-neutral-700 dark:text-neutral-400 animate-pulse bg-gray-300 dark:bg-neutral-700 h-2 w-1/2 rounded"></p>
            </div>
        </div>
    )
}