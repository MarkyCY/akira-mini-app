'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function SubscribeUser(token: string, contest_id: string) {
    const response = await fetch(`${API_URL}/contests/subscribe`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contest_id: contest_id,
        }),
    });
    
    if (!response.ok) {
        return { success: false, message: 'Error al obtener los datos' };
    }

    const data = await response.json();
    return data;
}


export async function UnsubscribeUser(token: string, contest_id: string) {
    const response = await fetch(`${API_URL}/contests/unsubscribe`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contest_id: contest_id,
        }),
    });
    
    if (!response.ok) {
        return { success: false, message: 'Error al obtener los datos' };
    }

    const data = await response.json();
    return data;
}
