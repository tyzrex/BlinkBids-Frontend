import ProdCard from "../../_components/Resusables/new-product-card";
import ProductCards from "../../_components/Resusables/product-card";
import { IProductCardsProps } from "../../types/home";

export const ProductGrid = ({ data }: { data: IProductCardsProps[] }) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        {data?.map((product: IProductCardsProps) => {
          return (
            <ProdCard
              index={product.id}
              key={product.id}
              id={product?.id}
              name={product?.name}
              price={product?.price}
              discount_percent={product?.discount_percent}
              discounted_price={product?.discounted_price}
              emi_available={product?.emi_available}
              images={product?.images === null ? "404.png" : product.images[0]}
              slug={product.slug}
              className="w-full"
            />
          );
        })}
      </div>
    </>
  );
};
