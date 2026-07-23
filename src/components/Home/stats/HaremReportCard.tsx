import BlurFade from "../../magicui/blur-fade";
import HaremEntryView from "./HaremEntryView";
import { HaremReport } from "@/lib/HaremReport";

export default function HaremReportCard({ data }: { data: HaremReport }) {
    const fecha = typeof data.fecha === 'string'
        ? new Date(data.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
        : data.fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <BlurFade delay={0.15} duration={0.50} inView className="w-full h-auto p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-neutral-900 dark:border-neutral-900">
            <div className="flex justify-between pb-3">
                <h5 className="mb-1 text-sm font-semibold text-gray-700 dark:text-white">
                    Reporte del Harem
                </h5>
                <h6 className="mb-3 text-[12px] font-normal text-muted-foreground">{fecha}</h6>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <h6 className="mb-2 text-xs font-semibold uppercase tracking-wider">
                        Waifus ({data.waifus_count})
                    </h6>
                    {data.waifus.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {data.waifus.map((entry) => (
                                <HaremEntryView key={entry.user_id} entry={entry} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-muted-foreground italic">Sin waifus registradas</p>
                    )}
                </div>
                <div>
                    <h6 className="mb-2 text-xs font-semibold uppercase tracking-wider">
                        Husbandos ({data.husbandos_count})
                    </h6>
                    {data.husbandos.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {data.husbandos.map((entry) => (
                                <HaremEntryView key={entry.user_id} entry={entry} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-muted-foreground italic">Sin husbandos registrados</p>
                    )}
                </div>
            </div>
        </BlurFade>
    );
}
