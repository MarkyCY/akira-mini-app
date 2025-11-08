// Tipos para los campos con valores predefinidos (Enums)

export type Nsfw = "white" | "gray" | "black";

export type MediaType = "unknown" | "tv" | "ova" | "movie" | "special" | "ona" | "music";

export type AiringStatus = "finished_airing" | "currently_airing" | "not_yet_aired";

export type UserStatus = "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";

export type Season = "winter" | "spring" | "summer" | "fall";

export type Source =
  | "other"
  | "original"
  | "manga"
  | "4_koma_manga"
  | "web_manga"
  | "digital_manga"
  | "novel"
  | "light_novel"
  | "visual_novel"
  | "game"
  | "card_game"
  | "book"
  | "picture_book"
  | "radio"
  | "music";

export type Rating = "g" | "pg" | "pg_13" | "r" | "r+" | "rx";

// Interfaces anidadas

export interface MainPicture {
  large?: string | null;
  medium: string;
}

export interface AlternativeTitles {
  synonyms?: string[] | null;
  en?: string | null;
  ja?: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MyListStatus {
  status?: UserStatus | null;
  score: number;
  num_episodes_watched: number;
  is_rewatching: boolean;
  start_date?: string | null;
  finish_date?: string | null;
  priority: number;
  num_times_rewatched: number;
  rewatch_value: number;
  tags: string[];
  comments: string;
  updated_at: string; // O 'Date' si se va a parsear
}

export interface StartSeason {
  year: number;
  season: Season;
}

export interface Broadcast {
  day_of_the_week: string;
  start_time?: string | null;
}

export interface Studio {
  id: number;
  name: string;
}

export interface AnimeNode {
  id: number;
  title: string;
  main_picture?: MainPicture | null;
  alternative_titles?: AlternativeTitles | null;
  start_date?: string | null;
  end_date?: string | null;
  synopsis?: string | null;
  mean?: number | null;
  rank?: number | null;
  popularity?: number | null;
  num_list_users: number;
  num_scoring_users: number;
  nsfw?: Nsfw | null;
  genres?: Genre[];
  created_at: string; // O 'Date'
  updated_at: string; // O 'Date'
  media_type: MediaType;
  status: AiringStatus;
  my_list_status?: MyListStatus | null;
  num_episodes: number;
  start_season?: StartSeason | null;
  broadcast?: Broadcast | null;
  source?: Source | null;
  average_episode_duration?: number | null;
  rating?: Rating | null;
  studios: Studio[];
}

// Esta interfaz es idéntica a MyListStatus y se puede reutilizar.
export type AnimeListStatus = MyListStatus;

export interface UserAnimeListEdge {
  node: AnimeNode;
  list_status: AnimeListStatus;
}

export interface Paging {
  previous?: string;
  next?: string;
}

// Interfaz principal para la respuesta de la API

export interface AnimeAPIResponse {
  data: UserAnimeListEdge[];
  paging: Paging;
}

// Ejemplo de uso en TypeScript

/*
async function fetchAnimeData(): Promise<AnimeAPIResponse> {
  const response = await fetch("URL_DE_LA_API");
  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }
  const data: AnimeAPIResponse = await response.json();
  return data;
}

fetchAnimeData().then(apiResponse => {
  console.log(apiResponse.data[0].node.title);
  console.log(apiResponse.paging.next);
});
*/