'use client';
import { useEffect, useState } from "react";
import BlurFade from "../magicui/blur-fade";
import SparklesText from "../magicui/sparkles-text";
import SeasonButton from "../Season/seasonButtons";
import Image from "next/image";
import { fetchSeasonalAnime } from "@/ServerActions/getSeasonGQL";
import OtakuLoadIcon from "../icons/otakuLoad";
import { useTheme } from "next-themes";

export default function ShopContent() {
    const season = (() => {
        const month = new Date().getMonth() + 1;
        if (month >= 1 && month <= 3) return 'WINTER';
        if (month >= 4 && month <= 6) return 'SPRING';
        if (month >= 7 && month <= 9) return 'SUMMER';
        if (month >= 10 && month <= 12) return 'FALL';
        return 'WINTER';
    })();

    const [selected, setSelected] = useState(season);
    const [seasonData, setSeasonData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false); // Nuevo estado
    const { theme } = useTheme()
    
    const changeSeason = (Season: string) => {
        setSelected(Season);
        setPage(1);
    };

    

    // Cargar datos iniciales
    useEffect(() => {
        setSeasonData([]);
        setPage(1);
        setHasNextPage(true);
        loadSeasonData(1, selected, setSeasonData, setHasNextPage, setPage, setLoading, setIsFetching, true);
    }, [selected]);

    // Scroll infinito usando IntersectionObserver
    useEffect(() => {
        if (!hasNextPage || loading || isFetching) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadSeasonData(page, selected, setSeasonData, setHasNextPage, setPage, setLoading, setIsFetching);
                }
            },
            { rootMargin: '100px' } // Reduce el margen para evitar múltiples detecciones
        );

        const target = document.querySelector("#scroll-anchor");
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [hasNextPage, loading, isFetching, page, selected]); // Añade isFetching como dependencia

    const formatStartDate = (startDate: any) => {
        const { year, month, day } = startDate;

        if (!year) return "Fecha no disponible";
        if (year && !month && !day) return `Estreno: ${year}`;
        if (year && month && !day) {
            const monthName = new Date(year, month - 1).toLocaleString("default", { month: "long" });
            return `Estreno: ${monthName} ${year}`;
        }
        if (year && month && day) {
            const formattedDate = new Date(year, month - 1, day).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            return `Estreno: ${formattedDate}`;
        }
        return "Fecha no disponible";
    };

    return (
        <div className="grid items-start gap-3">
            <div className="flex justify-center w-full h-auto max-w-sm pt-3" id="header">
                <BlurFade delay={0} duration={0.50} inView>
                    <SparklesText
                        sparklesCount={2}
                        className="text-xl font-normal tracking-tighter dark:text-neutral-200"
                        text="Calendario Anime"
                    />
                </BlurFade>
            </div>
            <SeasonButton selected={selected} setSelected={changeSeason} />
            <div className="grid grid-cols-2 items-start gap-3">
                {seasonData.map((anime, index) => (
                    <BlurFade delay={0.1} duration={0.50} inView key={anime.id} className="flex rounded-sm group flex-col relative overflow-hidden text-foreground box-border bg-content1 outline-none z-10 outline-2 outline-focus outline-offset-2 shadow-lg rounded-large transition-transform-background motion-reduce:transition-none w-full h-[300px]">
                        {/* Encabezado */}
                        <div className="flex p-3 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large absolute z-20 top-1 flex-col items-start">
                            <h4 className="text-white/90 font-medium text-base [text-shadow:_0_1px_1px_rgb(0_0_0_/_100%)]">
                                {anime.title.romaji || anime.title.english || anime.title.native}
                            </h4>
                        </div>

                        {/* Imagen de fondo */}
                        <Image
                            src={anime.coverImage.large}
                            alt={anime.title.romaji || anime.title.english || anime.title.native}
                            className="relative shadow-black/5 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large z-0 w-full h-full object-cover"
                            width={200}
                            height={300}
                            
                        />

                        {/* Overlay para contenido adulto */}
                        {anime.isAdult && (
                            <div className="absolute px-1 inset-0 ring-1 ring-inset ring-black/10 rounded-lg z-30 backdrop-blur-md flex items-center justify-center">
                                <p className="text-xs text-white/80 rounded-md bg-black/30 px-2 py-1 backdrop-blur-sm animate-float">
                                    Contenido para adultos
                                </p>
                            </div>
                        )}

                        {/* Pie de tarjeta */}
                        <div className="p-1 h-auto flex w-full items-center justify-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large backdrop-blur backdrop-saturate-150 absolute bg-black/40 bottom-0 z-20 border-t-1 border-default-600 dark:border-default-100">
                            <div className="flex flex-grow gap-2 items-center">
                                <div className="flex flex-col">
                                    <p className="text-xs text-white/80 line-clamp-1">
                                        {formatStartDate(anime.startDate)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                ))}
            </div>
            
            {loading && (
                <div>
                    <OtakuLoadIcon color={theme === "dark" ? "#ea527d" : "#b50638"} className="w-full size-40 p-5" />
                </div>
            )}
            <div id="scroll-anchor" style={{ height: "1px" }}></div>
        </div>
    );
}

export const loadSeasonData = async (
    page: number,
    selected: string,
    setSeasonData: (data: ((prev: any[]) => any[]) | any[]) => void,
    setHasNextPage: (hasNext: boolean) => void,
    setPage: (page: ((prev: number) => number) | number) => void,
    setLoading: (loading: boolean) => void,
    setIsFetching: (fetching: boolean) => void,
    reset: boolean = false
) => {
    setIsFetching(true);
    setLoading(true);

    try {
        const data = await fetchSeasonalAnime(page, 10, selected, new Date().getFullYear());

        setSeasonData(prev => (reset ? data.media : [...prev, ...data.media]));
        setHasNextPage(data.pageInfo.hasNextPage);
        setPage(prev => prev + 1);
    } catch (error) {
        console.error("Error loading data:", error);
    } finally {
        setIsFetching(false);
        setLoading(false);
    }
};
