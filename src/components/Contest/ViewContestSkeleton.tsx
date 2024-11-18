export default function ViewSkeleton() {
    return (
        <>
            <div className="w-full rounded-xl border border-neutral-600/10 dark:border-neutral-300/10 animate-pulse">
                <div>
                    <figure className="dark:bg-neutral-900 rounded-xl">
                        <div className="flex items-center w-full top-0 left-0 h-10 rounded-xl">
                            <div className="w-36 h-4 bg-neutral-300 rounded dark:bg-neutral-700 ml-3 mt-2"></div>
                            <div className="w-32 h-4 bg-neutral-300 rounded dark:bg-neutral-700 mx-3 mt-2"></div>
                        </div>
                        <div className="h-[350px] bg-neutral-300 dark:bg-neutral-800 mt-2"></div>
                    </figure>
                    <div className="bottom-0 dark:bg-neutral-800 rounded-b-xl">
                        <figcaption className="flex items-center box-border h-16 pl-2 w-full rounded-t-xl bottom-0 text-lg bg-neutral-500/30 dark:bg-neutral-900/60 backdrop-blur-sm">
                            <div className="w-1/3 h-4 bg-neutral-300 rounded dark:bg-neutral-700 ml-4"></div>
                            <div className="w-1/3 h-4 bg-neutral-300 rounded dark:bg-neutral-700 ml-auto mr-4"></div>
                        </figcaption>
                        <div className="flex items-center box-border pl-2 w-full bottom-0 text-lg bg-neutral-50 dark:bg-neutral-900 h-24 rounded-b-xl">
                            <div className="ml-4 flex-grow">
                                <div className="h-4 w-3/4 bg-neutral-300 rounded dark:bg-neutral-700 mb-1"></div>
                                <div className="h-4 w-2/3 bg-neutral-300 rounded dark:bg-neutral-700 mb-1"></div>
                                <div className="h-4 w-1/2 bg-neutral-300 rounded dark:bg-neutral-700"></div>
                            </div>
                            <div className="mx-4 text-center">
                                <div className="w-12 h-3 bg-neutral-300 rounded dark:bg-neutral-700 mb-1"></div>
                                <div className="w-16 h-6 bg-neutral-300 rounded dark:bg-neutral-700 mb-1"></div>
                                <div className="w-12 h-3 bg-neutral-300 rounded dark:bg-neutral-700"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}