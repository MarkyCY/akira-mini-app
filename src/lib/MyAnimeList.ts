export interface MalUser {
    id: number;
    name: string;
    gender?: string;
    birthday?: string;
    location?: string;
    joined_at?: string;
    picture?: string;
    anime_statistics?: MalAnimeStatistics;
}

export interface MalAnimeStatistics {
    num_items_watching?: number;
    num_items_completed?: number;
    num_items_on_hold?: number;
    num_items_dropped?: number;
    num_items_plan_to_watch?: number;
    num_items?: number;
    num_days_watched?: number;
    num_days_watching?: number;
    num_days_completed?: number;
    num_days_on_hold?: number;
    num_days_dropped?: number;
    num_days?: number;
    num_episodes?: number;
    num_times_rewatched?: number;
    mean_score?: number;
}