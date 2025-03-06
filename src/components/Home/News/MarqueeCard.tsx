import { cn } from "@/lib/utils";
import { Entry } from '@/lib/getNews';
import { useState, useEffect } from "react";

export default function ReviewCard({
    id,
    title,
    link,
    published,
    updated,
    summary,
    category
}: Entry) {
    const [ogImage, setOgImage] = useState('');

    const fetchOgImage = async (link: string) => {
        setOgImage('');

        try {
            const response = await fetch(`/api/fetch-og-img?url=${encodeURIComponent(link)}`);
            const data = await response.json();

            if (data.image) {
                setOgImage(data.image);
                localStorage.setItem(`og_img_${id}`, data.image);
            } else {
                console.log(data.error || 'No OG image found');
            }
        } catch (err) {
            console.log('Failed to fetch OG image');
        }
    };

    useEffect(() => {
        const linkImg = localStorage.getItem(`og_img_${id}`);

        if (linkImg) {
            setOgImage(linkImg);
        } else {
            fetchOgImage(link);
        }
    }, [link]);

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl shadow-md"
        >
            <figure
                className={cn(
                    "relative w-full cursor-pointer overflow-hidden rounded-xl border p-4",
                    // light styles
                    "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                    // dark styles
                    "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                )}
            >
                {ogImage && (
                    <img
                        crossOrigin="anonymous"
                        src={ogImage}
                        alt="OG Image"
                        className="absolute inset-0 w-full h-full object-cover z-0"
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
                    {summary?.replace(/<[^>]*>/g, '')}
                </blockquote>
                <div className='relative pt-4 text-xs text-gray-300 dark:text-neutral-400 flex-grow gap-1'>
                    Categoría: {category.map((c, i) => (
                        <span key={i}>
                            {i === category.length - 1 ? c : `${c}, `}
                        </span>
                    ))}
                </div>
                <div className='relative pt-2 text-xs text-gray-300 dark:text-neutral-400 flex gap-10'>
                    <p>Publicado: {new Date(published).toLocaleDateString()}</p>
                    <p>Actualizado: {new Date(updated).toLocaleDateString()}</p>
                </div>
            </figure>
        </a>
    );
};