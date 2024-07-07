import { AxiosResponse } from 'axios';

import { returnError } from '@/api/cms';

type BaseRequest<T,V> = (params?: T) => Promise<AxiosResponse<V>>;

type SuccessResponse<T> = {
    success: true;
    data: T;
};

type ErrorResponse
= {
    success: false;
    error: {
        message: string;
        status: number;
    }
};

type BaseResponse <V > = SuccessResponse<V> | ErrorResponse;

export const requestHandler = <T,V>(request: BaseRequest<T,V>) => async (params?: T): Promise<BaseResponse<V>> => {
    try{
        const response = await request(params)

        return {
            success: true,
            data: response.data
        }
    }
    catch(e:any){

       const error = returnError(e)
        return {
            success: false,
            error: {
                message: error.message,
                status: error.error
            }
        }
    }
}