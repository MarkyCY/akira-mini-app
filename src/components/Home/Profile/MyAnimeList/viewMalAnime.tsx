import { useEffect, useRef, useState } from "react";
import { getAnimefromDB } from "./getAnimefromDB";
import { useSession, signOut } from "next-auth/react";
import OtakuLoadIcon from "@/components/icons/otakuLoad";
import { useTheme } from "next-themes";


type Props = { view: 'grid' | 'list' };

export default function ViewMalAnime({ view }: Props) {
  const { data: session } = useSession();
  const token = session?.user?.accessToken as string | undefined;
  const { theme } = useTheme()

  const [animeData, setAnimeData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const limit = 6;

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    const fetchPage = async () => {
      // Evitar llamadas concurrentes
      if (loading) return;
      setLoading(true);

      try {
        const res = await fetchAnimefromDB(token, page, limit);
        if (!res) return;

        if (res.error) {
          if (res.error === '401') {
            signOut();
          }
        } else {
          const newItems = Array.isArray(res.data) ? res.data : [];
          setAnimeData(prev => (page === 1 ? newItems : [...prev, ...newItems]));
          // Si la respuesta trae menos que `limit`, no hay más páginas
          setHasMore(newItems.length === limit);
        }
      } catch (err) {
        console.error("Error fetching anime:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPage();

    return () => {
      cancelled = true;
    };

  }, [page, token]);

  useEffect(() => {
    if (!token) return;
    setAnimeData([]);
    setPage(1);
    setHasMore(true);

  }, [token]);

  // IntersectionObserver para el infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading]);

  const mode = view;

  return (
    <div>
      {mode === 'list' ? (
        <div className="flex flex-col gap-4">
          {animeData.map((anime, index) => (
            <div key={`${anime.title ?? index}-${index}`} className="flex items-center gap-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-2">
              <img src={anime.image} alt={anime.title} className="w-16 h-22 object-cover rounded-md" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{anime.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Episodios vistos: {anime.num_episodes_watched}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Puntuación: {anime.score}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {animeData.map((anime, index) => (
            <div key={`${anime.title ?? index}-${index}`} className="flex flex-col items-center rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <img src={anime.image} alt={anime.title} className="w-full h-52 object-cover rounded-md" />
              <div className="p-2 text-center">
                <h3 className="text-sm font-semibold line-clamp-1">{anime.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Episodios vistos: {anime.num_episodes_watched}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Puntuación: {anime.score}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sentinel para detectar cuando estamos al final */}
      <div ref={sentinelRef} className="h-6 mt-4" />

      {/* Loader / estado */}
      <div className="flex justify-center items-center mt-4">
        {loading && <OtakuLoadIcon color={theme === "dark" ? "#ea527d" : "#b50638"} className="w-full size-40 p-5" />}
        {!hasMore && !loading && animeData.length > 0 && <span className="text-sm text-neutral-500">No hay más resultados</span>}
      </div>
    </div>
  );
}

export const fetchAnimefromDB = async (token: string, page: number, limit: number) => {
  const res = await getAnimefromDB(token, page, limit);
  return res;
};
