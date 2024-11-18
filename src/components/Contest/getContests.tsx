'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getContests(token: string) {
    console.log(`${API_URL}/contests`);
    const response = await fetch(`${API_URL}/contests`, {
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
