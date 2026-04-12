'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMALUserfromDB(token: string, user_id: number) {
    const res = await fetch(`${API_URL}/mal/get_user_data?user_id=${user_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        }
    });

    if (res.status === 200) {
        const data = await res.json();
        console.log('Fetched MAL user stats:', data);
        return data.data;
    }

    return { error: 'Could not fetch data from DB' };
}
