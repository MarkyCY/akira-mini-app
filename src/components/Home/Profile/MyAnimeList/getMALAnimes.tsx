'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { AnimeAPIResponse } from '@/lib/getUserMAL';

export async function getMALAnimes(token: string) {
    const response = await fetch(`https://api.myanimelist.net/v2/users/@me/animelist?fields=list_status,nsfw&limit=1000&offset=0`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    });

    if (response.status === 401) {
        return { error: 'invalid_token' };
    }

    const data: AnimeAPIResponse = await response.json();
    
    await fetch(`${API_URL}/mal/add_data`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return data;
}