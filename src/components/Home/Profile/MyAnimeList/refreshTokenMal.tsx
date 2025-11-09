'use server';

const MAL_BASIC_AUTH = process.env.MAL_BASIC_AUTH as string;

export async function refreshTokenMal(refreshToken: string) {
    const response = await fetch('https://myanimelist.net/v1/oauth2/token', {
        method: 'POST',
        
        headers: {
            'Authorization': `Basic ${MAL_BASIC_AUTH}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken
        })
    });

    if (!response.ok) {
        throw new Error('Error al refrescar el token');
    }

    const data = await response.json();
    return data;
}
