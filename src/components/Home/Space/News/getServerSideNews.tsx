"use server";

import { Entry } from '@/lib/getNews';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideNews(token: string) {
    const response = await fetch(`${API_URL}/news`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    });
    
    if (!response.ok) {
        console.error('Error al obtener los datos:', response);
        throw new Error(response.status.toString());
    }

    const textData = await response.json();

    const entries: Entry[] = textData.slice(0, 20).map((entry: any) => ({
        id: entry.id || '',
        title: entry.ttl || '',
        link: entry.lnk || '',
        published: entry.publ || '',
        updated: entry.updt || '',
        summary: entry.summ || '',
        category: entry.catgy || '',
    }));

    return entries;
};
