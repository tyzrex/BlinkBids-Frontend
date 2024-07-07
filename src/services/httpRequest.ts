import axiosInstance from './initRequest'

export const GetRequest = (url: string, config: {} = {}) => {
    return axiosInstance.get(url, config)
}

export const PostRequest = (url: string, params: {}, config = {}) => {
    return axiosInstance.post(url, params, config)
}

export const PutRequest = (url: string, params?: {}, config?: {}) => {
    return axiosInstance.put(url, params, config)
}

export const DeleteRequest = (url: string, data?: any, config: {} = {}) => {
    return axiosInstance.delete(url, { data })
}

export const PatchRequest = (url: string, data: any, config: any) => {
    return axiosInstance.patch(url, data, config)
}