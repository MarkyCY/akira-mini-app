"use server";

import { User } from "@/lib/getUser";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserSide(token: string, user_id: number) {
    const response = await fetch(`${API_URL}/user/${user_id}`, {
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

    const entries: User = textData

    return textData;
};
