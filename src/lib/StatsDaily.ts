export interface Members {
    current: number;
    previous: number;
}

export interface Viewers {
    current: number;
    previous: number;
}

export interface Messages {
    current: number;
    previous: number;
}

export interface Posters {
    current: number;
    previous: number;
}

export interface Period {
    min_date: number;  // Unix timestamp (en segundos)
    max_date: number;  // Unix timestamp (en segundos)
}

export interface TopAdmin {
    user_id: number;
    first_name: string;
    deleted: number;
    kicked: number;
    banned: number;
}

export interface TopUser {
    user_id: number;
    first_name: string;
    messages: number;
    avg_chars: number;
}

export interface StatsDaily {
    _id: string; 
    members: Members;
    viewers: Viewers;
    messages: Messages;
    period: Period;
    posters: Posters;
    top_admins: TopAdmin[];
    top_users: TopUser[];
}
