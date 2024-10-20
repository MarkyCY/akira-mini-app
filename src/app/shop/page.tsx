import { Suspense } from "react";
import MiniCard from "@/components/Shop/MiniCard";
import MiniCardSkeleton from "@/components/Shop/MiniCardSkeleton";
import ItemCard from "@/components/Shop/ItemCard";

export default function Profile() {

    return (
        <div className="px-5 grid items-start gap-2.5">
            {/* <div className="px-5 pt-10 pb-24 grid items-start gap-2.5">
                <div className="relative">
                    <input type="text" id="small_outlined" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-black bg-transparent rounded-lg border-1 border-blue-600 appearance-none dark:text-white dark:border-blue-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label className="absolute text-sm font-medium text-blue-600 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-black px-2 peer-focus:px-2 peer-focus:font-bold peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Bio</label>
                </div>
            </div> */}
            <Suspense fallback={<MiniCardSkeleton />}>
                <MiniCard />
            </Suspense>
            <ItemCard />
        </div>
    )
}