export interface IHomeProducts {
  products: IHomeProduct[];
  category_slug: string;
}

export interface IHomeProduct{
  id: number;
  name: string;
  price: number;
  images: Array<string>;
  status:string;
  slug: string;
  emi_available:boolean 
  discount_percent: number ;
  discounted_price: number | null;
}

export interface IProductCardsProps{
    index: number;
    id: number;
    name: string;
    price: number;
    images: string;
    slug: string;
    cat_name?: string;
    is_emi_available?: boolean;
      emi_available:boolean 
  discount_percent: number
  discounted_price:  number | null;
  prefetch?: boolean;
  className?: string;
}