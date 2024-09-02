"use client"

import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

export interface WebAppUser {
    id: number;
    is_bot?: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
}

export interface WebAppChat {
    id: number;
    type: "group" | "supergroup" | "channel";
    title: string;
    username?: string;
    photo_url?: string;
}

export interface WebAppInitData {
    query_id?: string;
    auth_date: number;
    hash: string;
    user?: WebAppUser & {
        added_to_attachment_menu?: boolean;
        allows_write_to_pm?: boolean;
    };
    receiver?: WebAppUser;
    start_param?: string;
    can_send_after?: number;
    chat?: WebAppChat;
    chat_type?: "sender" | "private" | "group" | "supergroup" | "channel";
    chat_instance?: string;
}

export default function ShowData() {

    const [initData, setInitData] = useState<WebAppInitData | null>(null);

    useEffect(() => {
        setInitData(WebApp.initDataUnsafe as WebAppInitData);
    }, []);

    return (
        <>


            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                    Telegram Data
                </h5>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Informacion proveniente de Telegram.</p>
                <ul className="my-4 space-y-3">
                    {initData && (
                        <>
                            <li>
                                <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                    <span className="flex-1 ms-3 whitespace-nowrap">{initData.user?.id}</span>
                                    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">ID</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                    <span className="flex-1 ms-3 whitespace-nowrap">{initData.user?.first_name}</span>
                                    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">First Name</span>
                                </a>
                            </li>
                        </>
                    )}
                </ul>
                <div>
                    <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                        <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Datos de guía. Nada oficial.</a>
                </div>
            </div>

            {/* <div className="max-w-sm p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700">
                {initData && (
                    <h1>
                        ID {initData.user?.id}<br />
                        Full Name {initData.user?.first_name}<br />
                        Username {initData.user?.username}<br />
                        1photo_url {initData.user?.photo_url}<br />
                        2photo_url {initData.chat?.photo_url}<br />

                    </h1>
                )}
            </div> */}
        </>
    )
}