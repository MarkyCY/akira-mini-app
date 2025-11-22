export interface User {
    user_id: number
    first_name?: string | null;
    username?: string | null;
    avatar?: string | null;
    warnings?: number | null;
    description?: string | null;
    contest?: boolean | null;
    role?: string[] | null;
    is_mod?: boolean | null;
    disabled?: boolean | null;
    enter_date?: number | null;
}
