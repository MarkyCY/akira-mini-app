'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes";

import { getUserSide } from "@/components/Home/Profile/serverAction/getUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/lib/getUser";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { getMALUserfromDB } from "../Profile/MyAnimeList/getMALUserfromDB";

interface UserProfileProps {
    currentUserStats: {
        num_items_watching: number
        num_items_completed: number
        num_items_on_hold: number
        num_items_dropped: number
        num_items_plan_to_watch: number
        num_items: number
        num_days_watched: number
        num_days: number
        num_episodes: number
        num_times_rewatched: number
        mean_score: number
    }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ShowUser({ user_id }: { user_id: number }) {
    const { data: session, status } = useSession();
    const token = session?.user?.accessToken;
    const { theme } = useTheme()
    const [userData, setUserData] = useState<User | null>(null);
    const [malData, setMalData] = useState<UserProfileProps["currentUserStats"] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showElement, setShowElement] = useState(true);

    useEffect(() => {
        // const response = await getUserSide(token, user_id);
        const fetchData = async () => {
            try {
                if (token) {
                    const responseData = await getUserSide(token, user_id);
                    setUserData(responseData);
                }
            } catch (error: any) {
                console.error('Error al obtener los datos:', error);
            }

            // Fetch User MAL stats
            try {
                if (token) {
                    const responseData = await getMALUserfromDB(token, user_id);
                    console.log('Datos obtenidos del mal usuario:', responseData.anime_statistics);
                    setMalData(responseData.anime_statistics);
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
                        {showElement && (
                            <Image
                            src={`${API_URL}/canva/user_canva/${userData.user_id}?${new Date().getTime()}`}
                            alt=""
                            className={`w-full h-full rounded-t-md object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"
                                }`}
                            width={600}
                            height={300}
                            onLoad={() => setIsLoading(false)}
                            onError={() => {setIsLoading(false); setShowElement(false)}}
                        />
                        )}
                        
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

                        {/* Estadísticas de MyAnimeList */}
                        <div className="space-y-4">
                            {malData ? (
                                <>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-foreground">Estadísticas de Anime</h2>
                                    </div>
                                    {/* Grid de estadísticas principales */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <StatCard label="Completados" value={malData.num_items_completed} color="primary" />
                                        <StatCard label="Viendo" value={malData.num_items_watching} color="accent" />
                                        <StatCard
                                            label="Planeados"
                                            value={malData.num_items_plan_to_watch}
                                            color="chart-3"
                                        />
                                    </div>

                                    {/* Información adicional */}
                                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                        <StatRow label="Total de episodios" value={malData.num_episodes.toString()} />
                                        <StatRow label="Días vistos" value={malData.num_days.toFixed(1)} />
                                        <StatRow label="Puntuación media" value={malData.mean_score.toFixed(2)} highlight />
                                        <StatRow label="Repeticiones" value={malData.num_times_rewatched.toString()} />
                                    </div>
                                </>
                            ) : null}

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
