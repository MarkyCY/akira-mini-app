'use client';
import { cn } from "@/lib/utils";
import { Entry } from "@/lib/getNews";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import WebApp from "@twa-dev/sdk";
import { ShareMedia } from "@/components/tg/shareMedia";
import StoryIcon from "@/components/icons/story";
import ShareIcon from "@/components/icons/share";
import WebIcon from "@/components/icons/web";

// Función para obtener la imagen OG
const fetchOgImage = async (
    link: string,
    id: number,
    setOgImage: (image: string) => void
) => {
    setOgImage("");

    try {
        const response = await fetch(`/api/fetch-og-img?url=${encodeURIComponent(link)}`);
        const data = await response.json();

        if (data.image) {
            setOgImage(data.image);
            localStorage.setItem(`og_img_${id}`, data.image);
        } else {
            console.log(data.error || "No OG image found");
        }
    } catch (err) {
        console.log("Failed to fetch OG image");
    }
};

export default function ReviewCard({
    id,
    title,
    link,
    published,
    updated,
    summary,
    category
}: Entry) {
    const [ogImage, setOgImage] = useState<string>("");
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        const linkImg = localStorage.getItem(`og_img_${id}`);
        if (linkImg) {
            setOgImage(linkImg);
        } else {
            fetchOgImage(link, id, setOgImage);
        }
    }, [id, link]);

    // Función para compartir contenido usando WebApp.shareMessage
    // Según la interfaz, shareMessage recibe un string (msgId) y un callback
    const chatId = WebApp.initDataUnsafe.user?.id; // Reemplaza con el ID de tu chat o usuario
    const handleShare = useCallback(async () => {
        // const messageId = ShareMedia(chatId, ogImage || "URL_DE_LA_IMAGEN", '', title, 'Ver más', link);
        try {
            // 1. Solicitar acceso de escritura
            WebApp.requestWriteAccess((isGranted) => {
                console.log('Write access granted:', isGranted);
            });
            if (chatId) {
                const text = `${title}\n\n${summary}`;

                const messageId: string | null = await ShareMedia(chatId, ogImage, ogImage, text, 'Ver más', link);

                if (messageId) {
                    // 4. Compartir el mensaje usando WebApp.shareMessage
                    WebApp.shareMessage(messageId, (isSent) => {
                        if (isSent) {
                            console.log('¡Mensaje compartido exitosamente!');
                        } else {
                            console.log('El usuario canceló el compartir');
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al procesar el mensaje');
        }

    }, [link, ogImage, summary, title, chatId]);


    const handleStoryShare = useCallback(async () => {
        try {

            WebApp.shareToStory(ogImage, { text: title });

        } catch (error) {
            console.error('Error:', error);
            alert('Error al procesar la historia');
        }

    }, [ogImage, title]);

    // Función para descargar el archivo utilizando WebApp.downloadFile con tipos de @twa-dev/types
    // const handleDownload = useCallback(() => {
    //     // Se asume que DownloadFileParams tiene al menos los campos `url` y `filename`
    //     const downloadParams: WebAppTypes.DownloadFileParams = {
    //         url: ogImage || "URL_DEL_ARCHIVO", // Asegúrate de sustituir esta URL por la que desees
    //         file_name: "imagen.jpg"
    //     };
    //     WebApp.downloadFile(downloadParams, (isAccepted: boolean) => {
    //         console.log("Descarga aceptada:", isAccepted);
    //     });
    // }, [ogImage]);

    return (
        typeof window !== "undefined" && (
            <div
                onClick={() => setShowing(!showing)}
                rel="noopener noreferrer"
                className="rounded-xl shadow-md"
            >
                <figure
                    className={cn(
                        "relative w-full cursor-pointer overflow-hidden rounded-xl border p-4",
                        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
                    )}
                >
                    {/* Sección de botones para compartir y descargar */}
                    <div className="relative text-xs text-gray-300 dark:text-neutral-400">
                        <div className={`absolute right-1 flex flex-col gap-4 py-2 rounded-2xl bg-neutral-800/50 backdrop-blur-sm transition-transform z-10 duration-300 ${showing ? '' : 'translate-x-20'}`}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    WebApp.showPopup({
                                        title: 'Enlace',
                                        message: '¿Ir al enlace?',
                                        buttons: [
                                            {
                                                id: 'link',
                                                type: 'default',
                                                text: 'Ir a ver',
                                            },
                                            {
                                                id: 'cancel',
                                                type: 'cancel',
                                            },
                                        ],
                                    }, (button_id) => {
                                        if (button_id == 'link') {
                                            WebApp.openLink(link, { try_instant_view: true });
                                        }
                                    });
                                }}
                                className="px-2 text-white rounded"
                            >
                                <WebIcon className="w-7 h-7" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // handleShare();
                                    WebApp.showPopup({
                                        title: 'Compartir',
                                        message: '¿Quieres compartir este mensaje?',
                                        buttons: [
                                            {
                                                id: 'share',
                                                type: 'default',
                                                text: 'Compartir',
                                            },
                                            {
                                                id: 'cancel',
                                                type: 'cancel',
                                            },
                                        ],
                                    }, (button_id) => {
                                        if (button_id == 'share') {
                                            handleShare();
                                        }
                                    });
                                }}
                                className="px-2 text-white rounded"
                            >
                                <ShareIcon className="w-7 h-7" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    WebApp.showPopup({
                                        title: 'Compartir',
                                        message: '¿Quieres compartir esta historia?',
                                        buttons: [
                                            {
                                                id: 'share',
                                                type: 'default',
                                                text: 'Compartir',
                                            },
                                            {
                                                id: 'cancel',
                                                type: 'cancel',
                                            },
                                        ],
                                    }, (button_id) => {
                                        if (button_id == 'share') {
                                            handleStoryShare();
                                        }
                                    });
                                }}
                                className="px-2 text-white rounded"
                            >
                                <StoryIcon className="w-7 h-7" />
                            </button>
                        </div>
                    </div>
                    {ogImage && (
                        <Image
                            src={ogImage}
                            width={640}
                            height={640}
                            alt="OG Image"
                            className="absolute inset-0 w-full h-full object-cover z-0"
                            unoptimized
                        />
                    )}

                    <div className="absolute inset-0 w-full h-full bg-black/70 dark:bg-black/80"></div>

                    <div className="relative flex flex-row items-center gap-3">
                        <div className="flex flex-col">
                            <figcaption className="text-base font-medium text-gray-100 line-clamp-3">
                                {title}
                            </figcaption>
                        </div>
                    </div>
                    <blockquote className="relative mt-2 text-sm text-gray-200">
                        {summary?.replace(/<[^>]*>/g, "")}
                    </blockquote>
                    <div className="relative pt-4 text-xs text-gray-300 dark:text-neutral-400 flex-grow gap-1">
                        Categoría:{" "}
                        {category.map((c, i) => (
                            <span key={i}>
                                {i === category.length - 1 ? c : `${c}, `}
                            </span>
                        ))}
                    </div>
                    <div className="relative pt-2 text-xs text-gray-300 dark:text-neutral-400 flex gap-10">
                        <span>Publicado: {new Date(published).toLocaleDateString()}</span>
                        <span>Actualizado: {new Date(updated).toLocaleDateString()}</span>
                    </div>
                </figure>
            </div>
        )
    );
}
