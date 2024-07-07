import { returnError } from '@/api/cms';

type ApiResponse<T> = {
    ok: boolean;
    status: number;
    json: () => Promise<T>;
};

class ServerFetchError extends Error{
    status: number
    constructor(message: string, status: number){
        super(message)
        this.status = status
    }
}
export function ErrorHandler(response: any){

    switch(response.status){
        case 400:
            throw new ServerFetchError("Bad request", response.status)
        case 401:
            throw new ServerFetchError("You are not authorized to perform this action", response.status)
        case 403:
            throw new ServerFetchError("You are not authorized to perform this action", response.status)
        case 409:
            throw new ServerFetchError("Entity already exists", response.status)
        case 404:
            throw new ServerFetchError("Resource not found", response.status)
        default:
            throw new Error("Something went wrong")
    }
}

type FetchBaseRequest<T, V> = (params: T

    ) => Promise<ApiResponse<V|null>>;

type FetchSuccessResponse<T> = {
    success: true;
    data: T;
};

type FetchErrorResponse = {
    success: false;
    error: {
        message: string;
        status: number;
    };
};

type FetchBaseResponse<T> = FetchSuccessResponse<T> | FetchErrorResponse;

export const fetchHandler = <T, V>(
    request: FetchBaseRequest<T, V>,
) => async (params: T): Promise<FetchBaseResponse<V>> => {
    try {
        const response = await request(params);
        if (!response.ok) {
            ErrorHandler(response)
        }

        if(response.status === 204){
            //console.log("204")
            return {
                success: true,
                data: {} as V,
            }
        }

        try{
            var data = await response.json();

            return {
                success: true,
                data: data as V,
            };
        }
        catch(err){
            data = null
            return {
                success: true,
                data : data as V,
            };
        }
    } catch (e) {
        const error = returnError(e)
     
        return {
            success: false,
            error: {
                message: error.message,
                status: error.error,
            }
        };
    }
};
