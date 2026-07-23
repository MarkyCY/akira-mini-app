export default function HaremReportSkeleton() {
    return (
        <div className="w-full h-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-neutral-900 dark:border-neutral-900 animate-pulse">
            <div className="mb-1 h-3 w-36 bg-gray-200 rounded dark:bg-neutral-700"></div>
            <div className="mb-3 h-2 w-48 bg-gray-200 rounded dark:bg-neutral-700"></div>
            <div className="mb-2 h-2 w-24 bg-gray-200 rounded dark:bg-neutral-700"></div>
            <div className="grid grid-cols-1 gap-3 mb-4">
                <div className='flex items-center gap-3'>
                    <div className="bg-gray-200 rounded-full w-10 h-10 dark:bg-neutral-700"></div>
                    <div>
                        <div className='h-4 bg-gray-200 rounded dark:bg-neutral-700 w-32'></div>
                        <div className="mt-1 h-3 bg-gray-200 rounded dark:bg-neutral-700 w-40"></div>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className="bg-gray-200 rounded-full w-10 h-10 dark:bg-neutral-700"></div>
                    <div>
                        <div className='h-4 bg-gray-200 rounded dark:bg-neutral-700 w-28'></div>
                        <div className="mt-1 h-3 bg-gray-200 rounded dark:bg-neutral-700 w-36"></div>
                    </div>
                </div>
            </div>
            <hr className="border-gray-200 dark:border-neutral-700 mb-4" />
            <div className="mb-2 h-2 w-28 bg-gray-200 rounded dark:bg-neutral-700"></div>
            <div className="grid grid-cols-1 gap-3">
                <div className='flex items-center gap-3'>
                    <div className="bg-gray-200 rounded-full w-10 h-10 dark:bg-neutral-700"></div>
                    <div>
                        <div className='h-4 bg-gray-200 rounded dark:bg-neutral-700 w-36'></div>
                        <div className="mt-1 h-3 bg-gray-200 rounded dark:bg-neutral-700 w-44"></div>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className="bg-gray-200 rounded-full w-10 h-10 dark:bg-neutral-700"></div>
                    <div>
                        <div className='h-4 bg-gray-200 rounded dark:bg-neutral-700 w-28'></div>
                        <div className="mt-1 h-3 bg-gray-200 rounded dark:bg-neutral-700 w-32"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
