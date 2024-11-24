"use server";

import { Entry } from '@/lib/getNews';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideNews(token: string) {
    try {
        const response = await fetch(`${API_URL}/news`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });
        const textData = await response.json();

        const entries: Entry[] = textData.slice(0, 5).map((entry: any) => ({
            id: entry.id || '',
            title: entry.title || '',
            link: entry.link || '',
            published: entry.publ || '',
            updated: entry.updt || '',
            summary: entry.summary || '',
            category: entry.category || '',
        }));

        return entries;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
