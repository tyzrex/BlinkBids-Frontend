import ProdCard from "../../_components/Resusables/new-product-card";

export const ProductGrid = ({ data }: { data: any[] }) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        {data?.map((product: any) => {
          return (
            <ProdCard
              index={product.id}
              key={product.id}
              id={product?.id}
              name={product?.title}
              price={product?.price}
              discount_percent={product?.discount_percent}
              discounted_price={product?.discounted_price}
              emi_available={product?.emi_available}
              images={
                //check if the image is null or not
                product.images.length > 0
                  ? product.images[0].image_url
                  : "/404.png"
              }
              slug={product.slug}
              className="w-full"
            />
          );
        })}
      </div>
    </>
  );
};
