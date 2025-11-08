"use server";

export interface Packs {
    packs: {
        [key: string]: string[];
    };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getIconsPacks(token: string) {
    const response = await fetch(`${API_URL}/icons/packs_with_icons`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if (!response.ok) {
        console.error('Error al obtener los datos:', response);
        throw new Error(response.status.toString());
    }

    const textData = await response.json();

    const entries: Packs = textData

    return entries;
};
