export interface User {
    user_id: number
    username?: string | null;
    avatar?: string | null;
    warnings?: number | null;
    description?: string | null;
    contest?: boolean | null;
    role?: string[] | null;
    disabled?: boolean | null;
}
