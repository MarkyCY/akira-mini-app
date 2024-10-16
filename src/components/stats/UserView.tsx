import Image from 'next/image';
import { TopUser } from '@/lib/StatsDaily';
import Link from 'next/link';

interface UserViewProps {
    user: TopUser;
}

// Usa la interfaz en tu componente
export default function UserView({ user }: UserViewProps) {

    return (
        <Link href={`/user/${user.user_id}`} className='flex items-center gap-3'>
            <Image 
            className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-10 h-10" 
            src={`https://akirafastapi-oranmarcos8221-0icao7kd.leapcell.dev/user/photo/${user.user_id}`}
            alt={user.first_name} 
            width={640} 
            height={640} 
            unoptimized={true}
            priority
            />
            <div className="dark:text-white">
                <div className='font-medium'>{user.first_name}</div>
                <div className="text-xs text-gray-400 dark:text-neutral-500">
                    {user.messages} mensajes, {user.avg_chars} caracteres por mensaje
                </div>
            </div>
        </Link>
    )
}