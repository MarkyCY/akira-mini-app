import { useEffect, useState } from "react";
import BlurFade from "../magicui/blur-fade";
import SparklesText from "../magicui/sparkles-text";
import { getServerSideNews } from "../Home/News/getServerSideNews";
import { Entry } from "@/lib/getNews";
import { MarqueeDemoVertical } from "../Home/News/MarqueeVertical";
import Cookies from 'js-cookie';

export default function NewsContent() {
    const [news, setNews] = useState<Entry[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNews = async () => {
        const token = Cookies.get('token') || null;
        if (token) {
            try {
                const response = await getServerSideNews(token);

                const expirationMinutes = 60;
                const expirationDays = expirationMinutes / (24 * 60)

                const adjustedEntries = response.map((entry: Entry) => ({
                    ...entry
                }));

                setNews(adjustedEntries);
                Cookies.set('NewsList', JSON.stringify(adjustedEntries), { expires: expirationDays })
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setError("Error al obtener los datos");
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const newsData = Cookies.get('NewsList') || null;

        if (newsData) {
            setNews(JSON.parse(newsData));
            setLoading(false);
        } else {
            fetchNews();
        }

    }, []);
    return (
        <>
            <div className="w-full h-auto max-w-sm pt-3" id="header">
                <BlurFade delay={0} duration={0.50} inView>
                    <SparklesText sparklesCount={5} className="text-xl font-normal tracking-tighter dark:text-neutral-200" text="Noticias Anime" />
                </BlurFade>
            </div>
            {loading ? (
                <div className="w-full text-center text-lg font-bold">Cargando Noticias...</div>
            ) : error ? (
                <div className="w-full text-center text-lg font-bold">{error}</div>
            ) : news && (<MarqueeDemoVertical entries={news} />)}
        </>
    )
}