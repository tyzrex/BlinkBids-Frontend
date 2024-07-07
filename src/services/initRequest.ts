import axios, { AxiosError } from 'axios';

// import { ErrorHandler } from "./serverRequest";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})
class AppError extends Error{
    status: number
    errorData: object
    constructor(errorData:object, message: string, status: number){
        super(message)
        this.status = status
        this.errorData = errorData
    }
}

function ErrorHandler(response: any){
    switch(response.status){
        case 400:
            throw new AppError(
              response.data ,response.statusText || "Bad request", response.status)
        case 401:
            throw new AppError(
              response.data ,response.statusText || "Unauthorized", response.status)
        case 403: 
            throw new AppError(
              response.data ,response.statusText || "Forbidden", response.status)
        case 404:
            throw new AppError(
              response.data ,response.statusText || "Resource not found", response.status)
        case 409:
            throw new AppError(
              response.data ,response.statusText || "Entity already exists", response.status)
        default:
            throw new AppError(
              response.data ,response.statusText || "Something went wrong", response.status)
    }
}
    
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
        ErrorHandler(error.response)
    }
  }
);


export default axiosInstance