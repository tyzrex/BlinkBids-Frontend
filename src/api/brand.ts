import { BrandProductssResponse } from '@/app/(public)/types/product';
import { requestHandler } from '@/services/serverRequest';

export const getBrandProductsBySlug =async (params: { slug: string; page: number }) => {
    const response = await requestHandler<BrandProductssResponse>(
        `products/brand?slug=${params.slug}&page=${params.page || 1}`, "GET", null
    );
    return response.data
}
