'use server';


export async function refreshTokenMal(refreshToken: string) {
    const response = await fetch('https://myanimelist.net/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic NThkOGUyYjVmNDA3Zjk3OWVjMTFmMDkwZDdjODVhZmQ6ZjhiMjU3YmExNjc0ZTg3MGY4MjI5NzFlMWM5YjFkNzE1YWUzOWYwYzZjM2IwOTI0NTAzZTUzZTcxOTIyYTU3OQ==',
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
