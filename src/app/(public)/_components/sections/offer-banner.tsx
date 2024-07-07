import Image from "next/image";

export default async function OfferBanners({ data }: { data: any }) {
  if (!data || data.length === 0) {
    return <></>;
  }
  return (
    <section className="max-w-layout">
      <h2 className="title-typography">Ongoing Offers</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-5">
        <Image
          src={`/api/banners/${data[0].image}`}
          alt="banner"
          sizes="100vw"
          className="w-full md:h-[400px] rounded-md col-span-2 md:col-span-1"
          height={0}
          width={0}
        />{" "}
        <Image
          src={`/api/banners/${data[1].image}`}
          alt="banner"
          sizes="100vw"
          className="w-full md:h-[400px] rounded-md col-span-2 md:col-span-1"
          height={0}
          width={0}
        />
      </div>
    </section>
  );
}
