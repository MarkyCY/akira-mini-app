import UserView from "./UserView";
import { User } from "./types";


const users: User[] = [
    { id: 1, name: 'Alberto', messages: 5121, avg_chars: 23, photo: 'https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg' },
    { id: 2, name: "Solen'ya", messages: 2569, avg_chars: 50, photo: 'https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg' },
    { id: 3, name: 'Luis', messages: 4233, avg_chars: 42, photo: 'https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg' },
];

export default function TopUserPost() {

    return (
        <div className="w-full h-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-neutral-900 dark:border-neutral-900">
            <h5 className="mb-3 text-sm font-semibold text-gray-700 dark:text-white">
                Top miembros
            </h5>
            <div className="grid grid-cols-1 gap-3">
                {users.map(user => (
                    <UserView key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}
