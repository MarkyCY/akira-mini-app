import Image from 'next/image';
import { TopAdmin } from '@/lib/StatsDaily';
import Link from 'next/link';
import WebApp from "@twa-dev/sdk";
import { useState } from 'react';

interface AdminViewProps {
    user: TopAdmin;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminView({ user }: AdminViewProps) {
    const [urls, setUrls] = useState(`${API_URL}/user/photo/${user.user_id}`);

    const handleError = () => {
        setUrls("/unknow.webp");
    };
    return (
        (typeof window !== 'undefined' ? (
            <button onClick={() => WebApp.showAlert("🚧 En desarrollo")} className='flex items-center gap-3'>
                <Image
                    className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-10 h-10"
                    src={urls}
                    alt={user.user_id.toString()}
                    width={640}
                    height={640}
                    unoptimized={true}
                    priority
                    onError={() => handleError()}
                />
                <div className="dark:text-white">
                    <div className='font-medium text-left'>{user.first_name}</div>
                    <div className="text-xs text-gray-400 dark:text-neutral-500">
                        {user.deleted} borrados, {user.banned} baneados, {user.kicked} expulsados
                    </div>
                </div>
            </button>
        ) : (
            <Link href={`/user/${user.user_id}`} className='flex items-center gap-3'>
                <Image
                    className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-10 h-10"
                    src={`${API_URL}/user/photo/${user.user_id}`}
                    alt={user.user_id.toString()}
                    width={640}
                    height={640}
                    unoptimized={true}
                    priority
                />
                <div className="dark:text-white">
                    <div className='font-medium'>{user.first_name}</div>
                    <div className="text-xs text-gray-400 dark:text-neutral-500">
                        {user.deleted} borrados, {user.banned} baneados, {user.kicked} expulsados
                    </div>
                </div>
            </Link>
        )
        )
    )
}
