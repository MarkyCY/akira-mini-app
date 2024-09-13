export default function ShowResume() {
    const getColor = (value: number) => {
        return value >= 0 ? 'text-green-500' : 'text-red-500';
    };

    return (
        <div className="w-full h-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-neutral-900 dark:border-neutral-900">
            <h5 className="mb-1 text-sm font-normal text-gray-700 dark:text-white">
                Resumen
            </h5>
            <h6 className="mb-3 text-[12px] font-normal text-gray-500 dark:text-neutral-500">
                28 de ago de 2024 — 4 de sep de 2024
            </h6>
            <div className="grid grid-cols-2">
                <div>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                        <span className="font-medium">1207</span> <span className={getColor(-23)}>+23 (1.9%)</span>
                    </p>
                    <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Miembros</p>
                </div>
                <div>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                        <span className="font-medium">1.7M</span> <span className={getColor(35573)}>+35573 (2.1%)</span>
                    </p>
                    <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Mensajes</p>
                </div>
            </div>
            <div className="grid grid-cols-2 pt-4">
                <div>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                        <span className="font-medium">196</span> <span className={getColor(32)}>+32 (19.5%)</span>
                    </p>
                    <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Miembros que ven</p>
                </div>
                <div>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                        <span className="font-medium">152</span> <span className={getColor(29)}>+29 (23.6%)</span>
                    </p>
                    <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Miembros que publican</p>
                </div>
            </div>
        </div>
    );
}
