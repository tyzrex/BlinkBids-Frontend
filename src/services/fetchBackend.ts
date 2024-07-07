import { Session } from 'next-auth';

// Defines the structure for the fetch options
interface FetchOptions<T> {
    url: string;
    method: string;
    session?: Session | null;
    body?: T;
    isFormData?: boolean;
}

// Custom error class for fetch-related errors
class FetchError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

// The generic fetch wrapper function
export async function fetchWrapper<T, R>({
    url,
    method,
    session,
    body,
    isFormData = false,
}: FetchOptions<T>): Promise<R> {
    const headers = new Headers();
    if (!isFormData) {
        headers.append('Content-Type', 'application/json');
    }
    if (session?.user?.access) {
        headers.append('Authorization', `Bearer ${session.user.access}`);
    }

    const fetchOptions: RequestInit = {
        method,
        headers,
        cache: 'no-cache',
    };

    if (body) {
        fetchOptions.body = isFormData ? (body as unknown as BodyInit) : JSON.stringify(body);
    }

    try {
        const response = await fetch(`${process.env.API_URL}${url}`, fetchOptions);

        if (!response.ok) {
            const errorText = await response.text();
            throw new FetchError(errorText || 'An error occurred', response.status);
        }

        // Handle no-content response
        if (response.status === 204) {
            return {} as R;
        }

        return response.json() as Promise<R>;
    } catch (error) {
        if (error instanceof FetchError) {
            throw error;
        }
        throw new FetchError('Network error', 0);
    }
}
