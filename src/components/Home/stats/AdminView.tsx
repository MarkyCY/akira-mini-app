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
            <Link href={`/user/${user.user_id}`} className='flex items-center gap-3'>
                <Image
                    className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-10 h-10"
                    src={user.avatar ? user.avatar : "/unknow.webp"}
                    alt={user.user_id.toString()}
                    width={640}
                    height={640}
                    
                    priority
                    unoptimized
                    onError={() => handleError()}
                />
                <div className="text-foreground">
                    <div className='font-medium text-left'>{user.first_name || "No Name"}</div>
                    <div className="text-xs text-muted-foreground">
                        {user.deleted} borrados, {user.banned} baneados, {user.kicked} expulsados
                    </div>
                </div>
            </Link>
        ) : (
            <Link href={`/user/${user.user_id}`} className='flex items-center gap-3'>
                <Image
                    className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-10 h-10"
                    src={user.avatar ? user.avatar : "/unknow.webp"}
                    alt={user.user_id.toString()}
                    width={640}
                    height={640}
                    priority
                    unoptimized
                />
                <div className="text-foreground">
                    <div className='font-medium'>{user.first_name || "No Name"}</div>
                    <div className="text-xs text-muted-foreground">
                        {user.deleted} borrados, {user.banned} baneados, {user.kicked} expulsados
                    </div>
                </div>
            </Link>
        )
        )
    )
}
