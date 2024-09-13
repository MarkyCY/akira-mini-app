export default function MiniCardSkeleton() {

    return (
        <a href="#" className="w-full h-[6.5rem] max-w-sm flex items-center py-2 pl-3 pr-2 bg-white shadow-md rounded-[13px] dark:bg-neutral-900">
            <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r rounded-[12px] flex items-center justify-center animate-pulse">
                    <div className="flex items-center justify-center w-full h-full bg-gray-300 dark:bg-neutral-700 rounded-[12px]">
                        <svg className="w-6 h-6 text-gray-200 dark:text-neutral-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="ml-4 my-3 flex-grow">
                <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-3/4 animate-pulse mb-2"></div>
                <div className="h-2 bg-gray-300 dark:bg-neutral-700 rounded w-1/2 animate-pulse mb-2"></div>
                <div className="h-2 bg-gray-300 dark:bg-neutral-700 rounded w-1/2 animate-pulse mb-2"></div>
            </div>
            <div className="w-20 text-center">
                <div className="h-3 bg-gray-300 dark:bg-neutral-700 rounded w-1/2 animate-pulse mb-2 mx-auto"></div>
                <div className="h-5 bg-gray-300 dark:bg-neutral-700 rounded w-3/4 animate-pulse mx-auto mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-neutral-700 rounded w-1/2 animate-pulse mx-auto"></div>
            </div>
        </a>
    )
}