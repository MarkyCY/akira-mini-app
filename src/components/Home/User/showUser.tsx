'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, X } from "lucide-react"
import { useTheme } from "next-themes";

import { getUserSide } from "@/components/Home/Profile/serverAction/getUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/lib/getUser";
import { FlickeringGrid } from "@/components/ui/flickering-grid";


const malData = {
    id: 18653020,
    name: "MarkyCY",
    gender: "male",
    birthday: "2001-07-08",
    location: "",
    joined_at: "2024-07-17T05:27:04+00:00",
    picture:
        "https://cdn.myanimelist.net/s/common/userimages/f25a23b3-8173-4954-9f52-dfc4479a664b_225w?s=51661e803c91a96d652254eae6ff8325",
    anime_statistics: {
        num_items_watching: 1,
        num_items_completed: 13,
        num_items_on_hold: 0,
        num_items_dropped: 0,
        num_items_plan_to_watch: 2,
        num_items: 16,
        num_days_watched: 6.51,
        num_days_watching: 0.32,
        num_days_completed: 6.19,
        num_days_on_hold: 0,
        num_days_dropped: 0,
        num_days: 6.51,
        num_episodes: 386,
        num_times_rewatched: 2,
        mean_score: 9.14,
    },
}

interface UserProfileProps {
    currentUserStats?: {
        num_items_watching: number
        num_items_completed: number
        num_items_on_hold: number
        num_items_dropped: number
        num_items_plan_to_watch: number
        num_items: number
        num_days_watched: number
        num_episodes: number
        num_times_rewatched: number
        mean_score: number
    }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ShowUser({ user_id, currentUserStats }: { user_id: number, currentUserStats?: UserProfileProps["currentUserStats"] }) {

    const { data: session, status } = useSession();
    const token = session?.user?.accessToken;
    const { theme } = useTheme()
    const [userData, setUserData] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [showComparison, setShowComparison] = useState(false)

    // Verificar si ambos usuarios tienen datos disponibles
    const canCompare = currentUserStats && malData.anime_statistics

    useEffect(() => {
        // const response = await getUserSide(token, user_id);
        const fetchData = async () => {
            try {
                if (token) {
                    const responseData = await getUserSide(token, user_id);
                    console.log('Datos obtenidos del usuario:', responseData);
                    setUserData(responseData);
                }
            } catch (error: any) {
                console.error('Error al obtener los datos:', error);
            }
        }
        fetchData();
    }, [user_id, token]);

    return (

        <div className="">
            {userData ? (
                <>
                    <div className="relative h-36 bg-gradient-to-br from-primary via-accent to-chart-3 rounded-t-md">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
                                <FlickeringGrid
                                    className="absolute inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
                                    squareSize={4}
                                    gridGap={2}
                                    color={theme === "dark" ? "#fff" : "#000"}
                                    maxOpacity={0.6}
                                    flickerChance={0.1}
                                />
                            </div>
                        )}

                        <Image
                            src={`${API_URL}/canva/user_canva/${userData.user_id}?${new Date().getTime()}`}
                            alt=""
                            className={`w-full h-full rounded-t-md object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"
                                }`}
                            width={600}
                            height={300}
                            onLoad={() => setIsLoading(false)}
                            onError={() => setIsLoading(false)}
                        />
                    </div>
                    {/* Avatar y nombre */}
                    <div className="relative dark:bg-neutral-900 p-4 rounded-b-md">
                        <div className="flex flex-col items-center -mt-16 mb-4">
                            <Avatar className="h-28 w-28 border-4 border-card shadow-lg">
                                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.username || "Avatar"} />
                                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                                    {userData.username?.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="text-center mt-4 mb-2">
                                {userData.first_name && (<h1 className="text-2xl font-bold text-foreground">{userData.first_name}</h1>)}
                                {userData.username && (<h1 className="text-1xl font-semibold text-foreground/70">@{userData.username}</h1>)}
                                <div className="flex items-center justify-center gap-2 mt-3">
                                    {userData.is_mod && (
                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                            Moderador
                                        </Badge>
                                    )}
                                    {/* {userData.contest && (
                                        <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                                            Participante
                                        </Badge>
                                    )} */}
                                </div>
                            </div>

                            <p className="text-center text-sm text-muted-foreground leading-relaxed px-2">{userData.description}</p>
                        </div>

                        {/* Estado y advertencias */}
                        <div className="grid grid-cols-2 gap-3 mt-6 mb-6">
                            <div className="bg-secondary rounded-lg p-4 text-center">
                                <p className="text-xs text-muted-foreground font-medium mb-1">Advertencias</p>
                                <p className="text-2xl font-bold text-foreground">{userData.warnings || 0}</p>
                            </div>
                            <div className="bg-accent/10 rounded-lg p-4 text-center border border-accent/20">
                                <p className="text-xs text-accent/80 font-medium mb-1">Estado</p>
                                <p className="text-2xl font-bold text-accent">{userData.disabled ? 'Deshabilitado' : 'Activo'}</p>
                            </div>
                        </div>

                        {/* <div className="my-6">
                            <h2 className="text-lg font-semibold text-foreground mb-3">Tarjeta de Perfil</h2>

                            <div className="relative border dark:border-neutral-800 touch-none w-full flex justify-center items-center overflow-hidden rounded-lg"
                                style={{
                                    aspectRatio: "2/1",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >

                                {isLoading && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
                                        <FlickeringGrid
                                            className="absolute inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
                                            squareSize={4}
                                            gridGap={2}
                                            color={theme === "dark" ? "#fff" : "#000"}
                                            maxOpacity={0.6}
                                            flickerChance={0.1}
                                        />
                                    </div>
                                )}

                                <Image
                                    src={`${API_URL}/canva/user_canva/${userData.user_id}?${new Date().getTime()}`}
                                    alt="Tarjeta de perfil personalizada"
                                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"
                                        }`}
                                    width={600}
                                    height={300}
                                    onLoad={() => setIsLoading(false)}
                                />
                            </div>
                        </div> */}

                        {/* Estadísticas de MyAnimeList */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-foreground">Estadísticas de Anime</h2>
                                <div className="flex items-center gap-2">
                                    {canCompare && !showComparison && (
                                        <Button variant="outline" size="sm" onClick={() => setShowComparison(true)} className="text-xs gap-1">
                                            <BarChart3 className="h-3 w-3" />
                                            Comparar
                                        </Button>
                                    )}
                                    {showComparison && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowComparison(false)}
                                            className="text-xs gap-1"
                                        >
                                            <X className="h-3 w-3" />
                                            Cerrar
                                        </Button>
                                    )}
                                    <Badge variant="outline" className="text-xs">
                                        Datos de Prueba
                                    </Badge>
                                </div>
                            </div>

                            {showComparison && currentUserStats ? (
                                <ComparisonView userStats={malData.anime_statistics} currentUserStats={currentUserStats} />
                            ) : (
                                <>
                                    {/* Grid de estadísticas principales */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <StatCard label="Completados" value={malData.anime_statistics.num_items_completed} color="primary" />
                                        <StatCard label="Viendo" value={malData.anime_statistics.num_items_watching} color="accent" />
                                        <StatCard
                                            label="Planeados"
                                            value={malData.anime_statistics.num_items_plan_to_watch}
                                            color="chart-3"
                                        />
                                    </div>

                                    {/* Información adicional */}
                                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                        <StatRow label="Total de episodios" value={malData.anime_statistics.num_episodes.toString()} />
                                        <StatRow label="Días vistos" value={malData.anime_statistics.num_days.toFixed(1)} />
                                        <StatRow label="Puntuación media" value={malData.anime_statistics.mean_score.toFixed(2)} highlight />
                                        <StatRow label="Repeticiones" value={malData.anime_statistics.num_times_rewatched.toString()} />
                                    </div>
                                </>
                            )}

                            {/* Información adicional del perfil */}
                            <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                                <p>
                                    Miembro desde:{" "}
                                    {userData?.enter_date ? new Date(userData?.enter_date * 1000).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }) : ("Indefinido")}
                                </p>
                                <p className="mt-1">ID de usuario: {userData.user_id}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="w-full max-w-md mx-auto p-6 text-center">
                    <p className="text-gray-600">Cargando datos de usuario...</p>
                </div>
            )}
        </div>
    )

    // return (
    //     <div className="pt-5">
    //         {userData ? (
    //             <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
    //                 {/* Blurred background image */}
    //                 <div className="absolute inset-0 z-0">
    //                     <Image
    //                         src={userData.avatar || '/default-avatar.png'}
    //                         alt="Background"
    //                         fill
    //                         className="object-cover blur-md brightness-75 bg-neutral-700"
    //                     />
    //                 </div>

    //                 {/* Content container */}
    //                 <div className="relative z-10 p-6 backdrop-blur-sm">
    //                     {/* Avatar */}
    //                     <div className="grid grid-cols-1 gap-2 justify-items-center mb-4">
    //                         <Image
    //                             src={userData.avatar || '/default-avatar.png'}
    //                             alt="Avatar"
    //                             width={80}
    //                             height={80}
    //                             className="rounded-full border-2 border-white shadow-lg size-16"
    //                         />
    //                         <div className="text-center">
    //                             <h2 className="text-gray-200 text-base font-semibold">
    //                                 {`@` + userData.username || 'Sin username'}
    //                             </h2>
    //                             <p className="text-gray-200 text-sm line-clamp-3">
    //                                 {userData.description || 'Sin descripción'}
    //                             </p>
    //                         </div>
    //                     </div>

    //                     {/* User info */}
    //                     <div className="text-center text-white">
    //                         {/* Additional details */}
    //                         <div className="grid grid-cols-2 gap-4 mt-4">
    //                             <div className="bg-black/30 p-1 rounded">
    //                                 <p className="text-sm text-shadow">Advertencias</p>
    //                                 <p className="font-semibold text-shadow">{userData.warnings || 0}</p>
    //                             </div>
    //                             <div className="bg-black/30 p-1 rounded">
    //                                 <p className="text-sm text-shadow">Estado</p>
    //                                 <p className="font-semibold text-shadow">
    //                                     {userData.disabled ? 'Deshabilitado' : 'Activo'}
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         ) : (
    //             <div className="w-full max-w-md mx-auto p-6 text-center">
    //                 <p className="text-gray-600">Cargando datos de usuario...</p>
    //             </div>
    //         )}
    //     </div>
    // );
}


// Componente auxiliar para tarjetas de estadísticas
function StatCard({
    label,
    value,
    color,
}: {
    label: string
    value: number
    color: string
}) {
    const colorClasses = {
        primary: "bg-primary/10 border-primary/20",
        accent: "bg-accent/10 border-accent/20",
        "chart-3": "bg-chart-3/10 border-chart-3/20",
    }

    return (
        <div className={`w-full rounded-lg p-3 text-center border ${colorClasses[color as keyof typeof colorClasses]}`}>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
        </div>
    )
}

// Componente auxiliar para filas de estadísticas
function StatRow({
    label,
    value,
    highlight = false,
}: {
    label: string
    value: string
    highlight?: boolean
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className={`text-sm font-semibold ${highlight ? "text-accent" : "text-foreground"}`}>{value}</span>
        </div>
    )
}

function ComparisonView({
    userStats,
    currentUserStats,
}: {
    userStats: typeof malData.anime_statistics
    currentUserStats: NonNullable<UserProfileProps["currentUserStats"]>
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center gap-4 text-xs mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">MarkyWTF</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span className="text-muted-foreground">Tú</span>
                </div>
            </div>

            <ComparisonBar
                label="Completados"
                value1={userStats.num_items_completed}
                value2={currentUserStats.num_items_completed}
                max={Math.max(userStats.num_items_completed, currentUserStats.num_items_completed) * 1.2}
            />
            <ComparisonBar
                label="Viendo"
                value1={userStats.num_items_watching}
                value2={currentUserStats.num_items_watching}
                max={Math.max(userStats.num_items_watching, currentUserStats.num_items_watching) * 1.5}
            />
            <ComparisonBar
                label="Planeados"
                value1={userStats.num_items_plan_to_watch}
                value2={currentUserStats.num_items_plan_to_watch}
                max={Math.max(userStats.num_items_plan_to_watch, currentUserStats.num_items_plan_to_watch) * 1.2}
            />
            <ComparisonBar
                label="Episodios"
                value1={userStats.num_episodes}
                value2={currentUserStats.num_episodes}
                max={Math.max(userStats.num_episodes, currentUserStats.num_episodes) * 1.2}
            />
            <ComparisonBar
                label="Días vistos"
                value1={Number(userStats.num_days.toFixed(1))}
                value2={Number(currentUserStats.num_days_watched.toFixed(1))}
                max={Math.max(userStats.num_days, currentUserStats.num_days_watched) * 1.2}
                decimal
            />
            <ComparisonBar
                label="Puntuación"
                value1={Number(userStats.mean_score.toFixed(2))}
                value2={Number(currentUserStats.mean_score.toFixed(2))}
                max={10}
                decimal
            />
        </div>
    )
}

function ComparisonBar({
    label,
    value1,
    value2,
    max,
    decimal = false,
}: {
    label: string
    value1: number
    value2: number
    max: number
    decimal?: boolean
}) {
    const percentage1 = (value1 / max) * 100
    const percentage2 = (value2 / max) * 100

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">{label}</span>
            </div>
            <div className="space-y-1.5">
                {/* Barra del usuario visto */}
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 flex items-center justify-end pr-2"
                            style={{ width: `${Math.max(percentage1, 5)}%` }}
                        >
                            <span className="text-xs font-semibold text-primary-foreground">
                                {decimal ? value1.toFixed(1) : value1}
                            </span>
                        </div>
                    </div>
                </div>
                {/* Barra del usuario actual */}
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-accent transition-all duration-500 flex items-center justify-end pr-2"
                            style={{ width: `${Math.max(percentage2, 5)}%` }}
                        >
                            <span className="text-xs font-semibold text-accent-foreground">
                                {decimal ? value2.toFixed(1) : value2}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}