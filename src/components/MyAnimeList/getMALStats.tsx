'use server';

export async function getMALStats(token: string) {
    const response = await fetch(`https://api.myanimelist.net/v2/users/@me?fields=anime_statistics`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw new Error('Error al obtener los datos');
    }

    const data = await response.json();
    return data;
}
