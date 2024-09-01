export default function ShowDataSkeleton() {

    return (
        <>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white animate-pulse bg-gray-300 h-6 w-3/4 rounded"></h5>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400 animate-pulse bg-gray-300 h-4 w-full rounded"></p>
                <ul className="my-4 space-y-3">
                    <li>
                        <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 dark:bg-gray-600 animate-pulse">
                            <span className="flex-1 ms-3 whitespace-nowrap bg-gray-300 h-4 w-1/2 rounded animate-pulse"></span>
                            <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 dark:bg-gray-700 animate-pulse h-4 w-1/4 rounded"></span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 dark:bg-gray-600 animate-pulse">
                            <span className="flex-1 ms-3 whitespace-nowrap bg-gray-300 h-4 w-1/2 rounded animate-pulse"></span>
                            <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 dark:bg-gray-700 animate-pulse h-4 w-1/4 rounded"></span>
                        </div>
                    </li>
                </ul>
                <div>
                    <div className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400 animate-pulse bg-gray-300 h-4 w-1/3 rounded"></div>
                </div>
            </div>
        </>
    )
}