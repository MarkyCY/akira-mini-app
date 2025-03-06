import { StatsDaily } from "@/lib/StatsDaily";
import BlurFade from "../magicui/blur-fade";

export default function ShowResume({ data }: { data: StatsDaily }) {
    const getColor = (value: number) => {
        return value >= 0 ? 'text-green-500' : 'text-red-500';
    };

    // Cálculos para miembros
    const current_members = data.members.current;
    const previous_members = data.members.previous;
    const change_members = current_members - previous_members;
    const percent_members = (change_members / previous_members) * 100;

    // Cálculos para mensajes
    const current_messages = data.messages.current;
    const previous_messages = data.messages.previous;
    const change_messages = current_messages - previous_messages;
    const percent_messages = (change_messages / previous_messages) * 100;

    // Cálculos para visualizaciones
    const current_viewers = data.viewers.current;
    const previous_viewers = data.viewers.previous;
    const change_viewers = current_viewers - previous_viewers;
    const percent_viewers = (change_viewers / previous_viewers) * 100;

    // Cálculos para posters
    const current_posters = data.posters.current;
    const previous_posters = data.posters.previous;
    const change_posters = current_posters - previous_posters;
    const percent_posters = (change_posters / previous_posters) * 100;

    // Cálculo para el rango de fechas
    const min_date = new Date(data.period.min_date * 1000);
    const max_date = new Date(data.period.max_date * 1000);

    const min_date_str = min_date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    const max_date_str = max_date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    const date_range = `${min_date_str} — ${max_date_str}`;

    return (
        <BlurFade delay={0.10} duration={0.50} inView className="w-full h-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-neutral-900 dark:border-neutral-900">
            <h5 className="mb-1 text-sm font-semibold text-gray-700 dark:text-white">
                Resumen
            </h5>
            <h6 className="mb-3 text-[12px] font-normal text-gray-500 dark:text-neutral-500">
                {date_range}
            </h6>
            <div className="grid grid-cols-2">
                <div>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                        <span className="font-medium">{previous_members}</span> <span className={getColor(change_members)}>{change_members >= 0 ? `+${change_members}` : change_members} ({percent_members.toFixed(1)}%)</span>
                    </p>
                    <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Miembros</p>
                </div>
                <div>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                        <span className="font-medium">{previous_messages}</span> <span className={getColor(change_messages)}>{change_messages >= 0 ? `+${change_messages}` : change_messages} ({percent_messages.toFixed(1)}%)</span>
                    </p>
                    <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Mensajes</p>
                </div>
            </div>
            <div className="grid grid-cols-2 pt-4">
                <div>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                        <span className="font-medium">{previous_viewers}</span> <span className={getColor(change_viewers)}>{change_viewers >= 0 ? `+${change_viewers}` : change_viewers} ({percent_viewers.toFixed(1)}%)</span>
                    </p>
                    <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Miembros que ven</p>
                </div>
                <div>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                        <span className="font-medium">{previous_posters}</span> <span className={getColor(change_posters)}>{change_posters >= 0 ? `+${change_posters}` : change_posters} ({percent_posters.toFixed(1)}%)</span>
                    </p>
                    <p className="text-xs font-normal text-gray-400 dark:text-neutral-500">Miembros que publican</p>
                </div>
            </div>
        </BlurFade>
    );
}
