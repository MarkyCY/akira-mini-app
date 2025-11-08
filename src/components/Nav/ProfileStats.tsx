import { Suspense } from "react";
import ShowDataSkeleton from "../Home/Profile/ShowDataSkeleton";
import ShowData from "../Home/Profile/ShowData";
import BlurFade from "../magicui/blur-fade";
import SparklesText from "../magicui/sparkles-text";
import LoginAnimeList from "../Home/Profile/MyAnimeList/MAL_Auth";
import Cookies from 'js-cookie';
import MAL_Stats from "../Home/Profile/MyAnimeList/MAL_Stats";
import DragAndDropPerfil from "../Home/Profile/DragAndDrop/DragAndDrop";
import MAL_Animes from "../Home/Profile/MyAnimeList/MAL_Animes";

export default function ProfileStats() {
    const malToken = Cookies.get('mal_token') || '';
    const malRefreshToken = Cookies.get('mal_refresh_token') || '';
    // Cookies.remove('token');
    return (
        <>
            <div className="w-full h-auto max-w-sm pt-3" id="header">
                <BlurFade delay={0} duration={0.50} inView>
                    <SparklesText sparklesCount={5} className="text-xl font-normal tracking-tighter dark:text-neutral-200" text="Perfil de usuario" />
                </BlurFade>
            </div>
            <BlurFade delay={0} duration={0.50} inView className="z-10">
                <DragAndDropPerfil />
            </BlurFade>
            {/* <Suspense fallback={<ShowDataSkeleton />}>
                <ShowData />
            </Suspense> */}
            {/* Esto hay que corregirlo luego para poder usar el refresh token */}
            {malToken || malRefreshToken ? <><MAL_Stats /><MAL_Animes /></> : <LoginAnimeList />}
        </>
    )
}