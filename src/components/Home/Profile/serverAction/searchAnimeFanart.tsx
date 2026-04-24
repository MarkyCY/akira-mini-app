"use client";

export interface FanartSearchResult {
    id: string;
    type: string;
    title: string;
    link: string;
    poster: string | null;
    image_count: string;
    TVDB_ID: string | null;
}

export async function searchAnimeFanart(anime: string): Promise<FanartSearchResult[]> {
    const response = await fetch(`https://fanart.tv/api/search.php?section=tv&s=${anime}`);
    
    if (!response.ok) {
        console.error('Error al obtener los datos:', response);
        throw new Error(response.status.toString());
    }

    const textData: FanartSearchResult[] = await response.json();

    // Extraer TVDB_ID del link usando regex
    const tvdbIdRegex = /https:\/\/fanart\.tv\/series\/(\d+)\//;
    
    const results = textData.map((item) => {
        const match = item.link.match(tvdbIdRegex);
        return {
            ...item,
            TVDB_ID: match ? match[1] : null,
        };
    });

    return results;
};

export async function getAnimeBackgroud(id: any): Promise<FanartSearchResult[]> {
    const response = await fetch(`https://webservice.fanart.tv/v3.2/tv/${id}?api_key=426e6728c1b5c655975e88a14fc1a413`);
    
    if (!response.ok) {
        console.error('Error al obtener los datos:', response);
        throw new Error(response.status.toString());
    }

    const textData = await response.json();

    const data = textData.showbackground.map((item: any) => ({
        id: item.id,
        link: item.url,
        with: item.width,
        height: item.height,
    }));

    return data;
};

export async function getAnimeIcon(id: any): Promise<FanartSearchResult[]> {
    const response = await fetch(`https://webservice.fanart.tv/v3.2/tv/${id}?api_key=426e6728c1b5c655975e88a14fc1a413`);
    
    if (!response.ok) {
        console.error('Error al obtener los datos:', response);
        throw new Error(response.status.toString());
    }

    const textData = await response.json();

    const data = textData.hdtvlogo.map((item: any) => ({
        id: item.id,
        link: item.url,
        with: item.width,
        height: item.height,
    }));

    return data;
};

