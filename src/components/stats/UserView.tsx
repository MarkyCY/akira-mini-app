import Image from 'next/image';
import { TopUser } from '@/lib/StatsDaily';
import WebApp from "@twa-dev/sdk";
import { useState } from 'react';
interface UserViewProps {
    user: TopUser;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Usa la interfaz en tu componente
export default function UserView({ user }: UserViewProps) {
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
                    alt={user.first_name}
                    width={640}
                    height={640}
                    unoptimized={true}
                    priority
                    onError={() => handleError()}
                />
                <div className="dark:text-white">
                    <div className='font-medium text-left'>{user.first_name}</div>
                    <div className="text-xs text-gray-400 dark:text-neutral-500">
                        {user.messages} mensajes, {user.avg_chars} caracteres por mensaje
                    </div>
                </div>
            </button>
        ) : null )
    )
}