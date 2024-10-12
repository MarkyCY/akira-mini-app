import AdminView from "./AdminView";
import { TopAdmin } from "@/lib/StatsDaily";

export default function TopAdminWork({ data }: { data: TopAdmin[] }) {

    return (
        <div className="w-full h-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-neutral-900 dark:border-neutral-900">
            <h5 className="mb-3 text-sm font-semibold text-gray-700 dark:text-white">
                Top admins
            </h5>
            <div className="grid grid-cols-1 gap-3">
                {data.map((user) => (
                    <AdminView key={user.user_id} user={user} />
                ))}
            </div>
        </div>
    );
}
