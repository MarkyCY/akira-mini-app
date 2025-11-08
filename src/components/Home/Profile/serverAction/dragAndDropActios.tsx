"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCanvaJSON(token: string) {
    const response = await fetch(`${API_URL}/canva/export`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    });
    
    if (!response.ok) {
        console.error('Error al obtener los datos:', response);
        throw new Error(response.status.toString());
    }

    const textData = await response.json();

    return textData;
};


export async function postCanvaJSON(token: string, data: any) {
    const response = await fetch(`${API_URL}/canva/import`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        console.error('Error al obtener los datos:', response);
        throw new Error(response.status.toString());
    }

    const textData = await response.json();

    return textData;
};