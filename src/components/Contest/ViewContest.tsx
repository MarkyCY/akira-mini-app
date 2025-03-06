import Image from 'next/image'
import Countdown from './ContDown';
import { useState, useEffect } from 'react';
import { AnimatedSubscribeButton } from '../magicui/animated-subscribe-button';
import ArrowIcon from '../icons/arrow';
import CheckIcon from '../icons/check';
import AvatarCircles from "@/components/magicui/avatar-circles";
import BlurFade from '../magicui/blur-fade';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ViewContest({ contest, suscribeChange }: { contest: Contest; suscribeChange: () => void; }) {

    const truncateDescription = (text: string, maxWords: number): string => {
        const words = text.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return text;
    };

    function formatUnixToDate(unixTimestamp: number | undefined): string {
        if (unixTimestamp === undefined) return '-';

        const date = new Date(unixTimestamp * 1000); // Convertir de segundos a milisegundos
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleString('es-ES', options);
    }

    function amount_by_type(type: string, amount: number | undefined): string {
        if (amount === undefined) return '-';

        if (type === 'photo') {
            return `${amount} imágen(es)`;
        } else if (type === 'video') {
            return `${amount} video(s)`;
        } else if (type === 'text') {
            return `${amount} palabras`;
        }
        return '-';
    }

    function type(type: string): string {
        if (type === 'photo') {
            return `Imágen`;
        } else if (type === 'video') {
            return `Video`;
        } else if (type === 'text') {
            return `Narración`;
        }
        return '-';
    }

    function getSubStatus(subscription: any[]): boolean {

        const userId = 873919300; //Cambiar Importante
        for (let i = 0; i < subscription?.length; i++) {
                if (subscription[i].user === userId) {
                    return true;
                }
        }
        return false;
    }

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (expanded) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [expanded]);

    const totalAvatars = contest.subscription?.length || 0;
    const avatarUrls = contest.subscription?.map((userId) => `${API_URL}/user/photo/${userId.user}`).slice(0, 4);
    const extraAvatars = totalAvatars > 4 ? totalAvatars - 4 : null;
    const [imgSrc, setImgSrc] = useState(contest.img);

    return (
        <BlurFade delay={0.1} duration={0.50} inView 
            className={`transition-none overflow-auto duration-75 ease-in ${expanded ? 'h-screen w-96 fixed top-0 z-50 bg-neutral-50 dark:bg-black' : ' w-full shadow-md rounded-xl border border-neutral-600/10 dark:border-neutral-300/10'
                } `}
        >
            <div className='relative'>
                <figure className="">
                    <div className={`absolute flex items-center w-full top-0 left-0 h-18 bg-gradient-to-b from-black/60 via-black/30 to-transparent ${expanded ? '' : 'rounded-xl'}`}>
                        <div className='marquee-container'>
                            <div className='marquee-content '>
                                <h1 className='text-lg p-4 font-semibold flex-grow text-white'>{contest.title}</h1>
                                <h1 className='text-lg p-4 font-semibold flex-grow text-white'>{contest.title}</h1>
                            </div>
                        </div>
                        <div className="text-center p-4" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                            <button className="text-2xl pb-1 font-bold text-white dark:text-white">:</button>
                        </div>
                    </div>
                    <Image
                        onClick={() => setExpanded(prev => !prev)}
                        className={`${expanded ? "rounded-b-2xl" : "rounded-2xl"}`}
                        src={imgSrc}
                        alt="Image not found"
                        width="640"
                        height="640"
                        onError={() => setImgSrc("/mistic_green_forest.webp")}
                        unoptimized
                    />
                </figure>
                <div className={`absolute bottom-0 ${expanded ? 'top-80' : ''}`}>
                    {expanded ?
                        <AvatarCircles 
                        className='m-2' 
                        avatarUrls={avatarUrls || []} 
                        numPeople={extraAvatars || undefined} />
                        : null}
                    <figcaption className="flex items-center box-border h-16 pl-2 w-full rounded-t-xl bottom-0 text-lg text-white bg-neutral-400/30 dark:bg-neutral-900/30 backdrop-blur-sm">
                        <div className='ml-3 flex-grow'>
                            <h2 className='text-sm text-left leading-4 text-neutral-100 dark:text-neutral-50'>
                                <span className="font-semibold">Inicio</span> <br /> {formatUnixToDate(contest.start_date)}
                            </h2>
                        </div>
                        <div className='mr-4 flex-grow'>
                            <h2 className='text-sm text-right leading-4 text-neutral-100 dark:text-neutral-50'>
                                <span className="font-semibold">Final</span> <br /> {formatUnixToDate(contest.end_date)}
                            </h2>
                        </div>
                    </figcaption>
                    <div className={`flex items-center box-border pl-2 w-full bottom-0 text-lg text-white bg-neutral-50 ${expanded ? 'dark:bg-black h-auto py-5' : 'dark:bg-neutral-900 h-24 rounded-b-xl'
                        } `}>
                        <div className='ml-1 flex-grow'>
                            <p className='ml-1 text-sm text-left leading-4 text-neutral-800 dark:text-neutral-200'>
                                {expanded ? contest.description : truncateDescription(contest.description, 13)}
                            </p>
                        </div>
                        <div className="mx-2 text-center">
                            <div className="text-sm text-neutral-600 dark:text-neutral-300">{type(contest.type)}</div>
                            <div className="text-2xl font-bold text-neutral-700 dark:text-white">
                                <Countdown Timestamp={contest.end_date} />
                            </div>

                            {contest.type === 'photo' ? (
                                <div className="text-xs text-neutral-600 dark:text-neutral-300">
                                    {amount_by_type(contest.type, contest.amount_photo)}
                                </div>
                            ) : contest.type === 'text' ? (
                                <div className="text-xs text-neutral-600 dark:text-neutral-300">
                                    {amount_by_type(contest.type, contest.amount_text)}
                                </div>
                            ) : contest.type === 'video' ? (
                                <div className="text-xs text-neutral-600 dark:text-neutral-300">
                                    {amount_by_type(contest.type, contest.amount_video)}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    {expanded ?
                        <div className="h-auto p-2 pb-[100px] bg-neutral-50 dark:bg-black rounded-b-xl" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                            <AnimatedSubscribeButton
                                buttonColor="#000000"
                                buttonTextColor="#ffffff"
                                subscribeStatus={contest?.subscription ? getSubStatus(contest.subscription) : false}
                                contest_id={contest.id}
                                suscribeChange={suscribeChange}
                                initialText={
                                    <span className="group inline-flex items-center">
                                        Suscribirse{" "}
                                        <ArrowIcon className='rotate-90 w-5' />
                                    </span>
                                }
                                changeText={
                                    <span className="group inline-flex items-center">
                                        <CheckIcon className='w-5 mr-1' />
                                        Suscrito{" "}
                                    </span>
                                }
                            />
                        </div>
                        :
                        null}

                </div>
            </div>
        </BlurFade>
    );
}
