import Image from 'next/image';
import { User } from './types';
import Link from 'next/link';

interface UserViewProps {
    user: User;
}

// Usa la interfaz en tu componente
export default function UserView({ user }: UserViewProps) {

    return (
        <Link href={`/user/${user.id}`} className='flex items-center  gap-3'>
            <Image className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-10 h-10" src={user.photo} alt={user.name} width={640} height={640} />
            <div className="dark:text-white">
                <div className='font-medium'>{user.name}</div>
                <div className="text-xs text-gray-400 dark:text-neutral-500">
                    {user.messages} mensajes, {user.avg_chars} caracteres por mensaje
                </div>
            </div>
        </Link>
    )
}