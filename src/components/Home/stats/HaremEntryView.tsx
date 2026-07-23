import Image from 'next/image';
import { HaremEntry } from '@/lib/HaremReport';
import Link from 'next/link';
import { useState } from 'react';

interface HaremEntryViewProps {
    entry: HaremEntry;
}

export default function HaremEntryView({ entry }: HaremEntryViewProps) {
    const [error, setError] = useState(false);

    const d = typeof entry.date === 'string' ? new Date(entry.date) : entry.date;
    const datePart = d.toLocaleDateString('es-CU', { timeZone: 'America/Havana', day: '2-digit', month: '2-digit', year: 'numeric' });
    const timePart = d.toLocaleTimeString('en-US', { timeZone: 'America/Havana', hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = `${datePart} ${timePart}`;

    return (
        <Link href={`/user/${entry.user_id}`} className='flex items-start'>
            <div className="text-foreground min-w-0">
                <div className='flex items-center gap-1 font-medium text-left'>
                    <Image
                        className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-4 h-4 flex-shrink-0"
                        src={entry.avatar && !error ? entry.avatar : "/unknow.webp"}
                        alt={entry.user_id.toString()}
                        width={16}
                        height={16}
                        priority
                        unoptimized={!error && !!entry.avatar}
                        onError={() => setError(true)}
                    />
                    <span className="truncate">{entry.first_name || "No Name"}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                    {dateStr}
                </div>
            </div>
        </Link>
    )
}
