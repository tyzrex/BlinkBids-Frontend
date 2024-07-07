import { GetRequest } from '@/services/httpRequest';

interface IProductType {
    slug: string;
    page?: number;
}

export const getProductsByType = async (
    params: IProductType
) => {
    const response = await GetRequest(`products/category/?slug=${params.slug}&page=${params.page || 1}`);
    return response.data;
}
