import Image from 'next/image';
import { TopUser } from '@/lib/StatsDaily';
import WebApp from "@twa-dev/sdk";
import { useState } from 'react';
import { BorderBeam } from '../magicui/border-beam';
import SparklesText from '../magicui/sparkles-text';
interface UserViewProps {
    user: TopUser;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Usa la interfaz en tu componente
export default function UserView({ user, premium }: {
    user: TopUser;
    premium: boolean;
}) {
    const [urls, setUrls] = useState(`${API_URL}/user/photo/${user.user_id}`);

    const handleError = () => {
        setUrls("/unknow.webp");
    };

    function normalizeText(input: string) {
        return input.normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, '');
    }


    return (
        (typeof window !== 'undefined' ? (
            <button onClick={() => WebApp.showAlert("🚧 En desarrollo")} className='flex items-center gap-3'>
                <div className='relative'>
                    <div className="relative">
                        {premium && (<BorderBeam className='rounded-full' />)}
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
                    </div>
                </div>
                <div className="dark:text-white" style={{direction: "ltr", textAlign: "left"}}>
                    {premium ? (
                        <SparklesText className="text-sm font-medium text-left" sparklesCount={2} text={normalizeText(user.first_name)} colors={{ first: "#FFD700", second: "#DAA520" }} />
                    ) : (
                        <div className='font-medium text-left'>{normalizeText(user.first_name)}</div>
                    )}
                    <div className="text-xs text-gray-400 dark:text-neutral-500">
                        {user.messages} mensajes, {user.avg_chars} caracteres por mensaje
                    </div>
                </div>
            </button>
        ) : null)
    )
}