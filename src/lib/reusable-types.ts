export interface PaginatedResponse<T> {
    count: number;
    next: string | null ;
    previous: string | null;
    total_pages: number;
    results: T[];
}