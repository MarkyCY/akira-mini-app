'use server';

export async function getGroupStats(token: string) {
    const response = await fetch('http://192.168.1.101:5000/group_stats/', {
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
