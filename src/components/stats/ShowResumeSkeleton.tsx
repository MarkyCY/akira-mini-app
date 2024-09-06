export default function ShowResumeSkeleton () {
    
    return (
        <div className="w-full h-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-neutral-900 dark:border-neutral-900">
                <div className="mb-1 h-4 w-32 bg-gray-200 rounded dark:bg-neutral-700 animate-pulse"></div>
                <div className="mb-3 h-3 w-2/3 bg-gray-200 rounded dark:bg-neutral-700 animate-pulse"></div>

                <div className="grid grid-cols-2 gap-4 animate-pulse">
                    <div>
                        <div className="h-4 bg-gray-200 rounded dark:bg-neutral-700"></div>
                        <div className="mt-2 h-3 w-1/2 bg-gray-200 rounded dark:bg-neutral-700"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-gray-200 rounded dark:bg-neutral-700"></div>
                        <div className="mt-2 h-3 w-1/2 bg-gray-200 rounded dark:bg-neutral-700"></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 animate-pulse">
                    <div>
                        <div className="h-4 bg-gray-200 rounded dark:bg-neutral-700"></div>
                        <div className="mt-2 h-3 w-1/2 bg-gray-200 rounded dark:bg-neutral-700"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-gray-200 rounded dark:bg-neutral-700"></div>
                        <div className="mt-2 h-3 w-1/2 bg-gray-200 rounded dark:bg-neutral-700"></div>
                    </div>
                </div>
            </div>
    )
}