import Image from 'next/image';
import { TopAdmin } from '@/lib/StatsDaily';
import Link from 'next/link';

interface AdminViewProps {
    user: TopAdmin;
}

export default function AdminView({ user }: AdminViewProps) {
    return (
        <Link href={`/user/${user.user_id}`} className='flex items-center gap-3'>
            <Image
                className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-10 h-10"
                src={`http://192.168.1.101:5000/user/photo/${user.user_id}`}
                alt={user.first_name}
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
    );
}
