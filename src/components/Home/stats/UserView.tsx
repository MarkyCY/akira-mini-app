import Image from 'next/image';
import { TopUser } from '@/lib/StatsDaily';
import WebApp from "@twa-dev/sdk";
import { useState } from 'react';
import { BorderBeam } from '../../magicui/border-beam';
import SparklesText from '../../magicui/sparkles-text';
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

    function normalizeText(text: string) {
        return Array.from(text)
          .filter((char) => {
            const code = char.codePointAt(0) ?? 0;
      
            // Elimina:
            // - Caracteres de control (U+0000 a U+001F y U+007F)
            // - Caracteres Hangul Jamo (U+1100 a U+11FF)
            // - Caracteres invisibles comunes como U+200B (Zero Width Space), etc.
            return !(
              (code >= 0x0000 && code <= 0x001F) ||  // control
              code === 0x007F ||                    // DEL
              (code >= 0x1100 && code <= 0x11FF) || // Hangul Jamo
              (code >= 0x200B && code <= 0x200F) || // Zero-width characters
              (code >= 0x202A && code <= 0x202E) || // bidi control
              (code >= 0x2060 && code <= 0x206F)    // invisible formatting chars
            );
          })
          .join('');
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
                            
                            priority
                            onError={() => handleError()}
                        />
                    </div>
                </div>
                <div className="dark:text-white" style={{direction: "ltr", textAlign: "left"}}>
                    {premium ? (
                        <SparklesText className="text-sm font-medium text-left" sparklesCount={2} text={normalizeText(user.first_name || "No Name")} colors={{ first: "#FFD700", second: "#DAA520" }} />
                    ) : (
                        <div className='font-medium text-left'>{normalizeText(user.first_name || "No Name")}</div>
                    )}
                    <div className="text-xs text-gray-400 dark:text-neutral-500">
                        {user.messages} mensajes, {user.avg_chars} caracteres por mensaje
                    </div>
                </div>
            </button>
        ) : null)
    )
}