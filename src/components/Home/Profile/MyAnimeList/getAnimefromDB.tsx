'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAnimefromDB(token: string, page: number = 1, limit: number = 6) {

    const res = await fetch(`${API_URL}/mal/get_data?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    if (res.status === 200) {
        const data = await res.json();
        return data;
    }

    return { error: 'Could not fetch data from DB' };
}