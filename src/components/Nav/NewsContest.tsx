import { useEffect, useState } from "react";
import BlurFade from "../magicui/blur-fade";
import SparklesText from "../magicui/sparkles-text";
import { getServerSideNews } from "../Home/News/getServerSideNews";
import { Entry } from "@/lib/getNews";
import { MarqueeDemoVertical } from "../Home/News/MarqueeVertical";
import Cookies from 'js-cookie';
import OtakuLoadIcon from "../icons/otakuLoad";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";

export default function NewsContent() {
    const [news, setNews] = useState<Entry[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { theme } = useTheme()

    const { data: session, status } = useSession();
    const token = session?.user?.accessToken;

    useEffect(() => {
        const newsData = Cookies.get('NewsList') || null;
        if (token) {
            if (newsData) {
                setNews(JSON.parse(newsData));
                setLoading(false);
            } else {
                Cookies.remove('NewsList');
                fetchNews(token, setNews, setLoading, setError);
            }
        }
    }, [token]);
    return (
        <>
            <div className="w-full h-auto max-w-sm pt-3" id="header">
                <BlurFade delay={0} duration={0.50} inView>
                    <SparklesText sparklesCount={5} className="text-xl font-normal tracking-tighter dark:text-neutral-200" text="Noticias Anime" />
                </BlurFade>
            </div>
            {loading ? (
                <OtakuLoadIcon color={theme === "dark" ? "#ea527d" : "#b50638"} className="w-full size-40 p-5" />
            ) : error ? (
                <div className="w-full text-center text-lg font-bold">{error}</div>
            ) : news && (<MarqueeDemoVertical entries={news} />)}
        </>
    )
}

const fetchNews = async (token: string, setNews: (news: Entry[] | null) => void, setLoading: (loading: boolean) => void, setError: (error: string | null) => void) => {
    try {
        const response = await getServerSideNews(token);

        const expirationMinutes = 10;
        const expirationDays = expirationMinutes / (24 * 60)

        const adjustedEntries = response.map((entry: Entry) => ({
            ...entry
        }));

        setNews(adjustedEntries);
        Cookies.set('NewsList', JSON.stringify(adjustedEntries), { expires: expirationDays })
    } catch (error: any) {
        console.error('Error al obtener los datos:', error);
        if (error.message === '401') {
            signOut();
        }
        setError("Error al obtener los datos");
        setLoading(false);
    } finally {
        setLoading(false);
    }
};