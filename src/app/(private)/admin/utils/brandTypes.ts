export interface BrandDetail {
    id:number,
    name:string,
    slug:string,
    image: string | null,
    description: string | null,
    created_at: string,
    updated_at: string,
    meta_title: string | null,
    meta_description: string | null,
    meta_keywords: string | null,
    custom_code: string | null,
}