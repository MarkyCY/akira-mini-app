'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getGroupStats(token: string) {
    const response = await fetch(`${API_URL}/group_stats/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw new Error(response.status.toString());
    }

    const data = await response.json();
    return data;
}
