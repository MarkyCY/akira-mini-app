'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMALStats(malToken: string, token: string) {
    const response = await fetch(`https://api.myanimelist.net/v2/users/@me?fields=anime_statistics`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${malToken}`,
            'Accept': 'application/json',
        },
    });
    
    if (response.status === 401) {
        return { error: 'invalid_token'};
    }

    const data = await response.json();

    await fetch(`${API_URL}/mal/add_user_data`, {
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
