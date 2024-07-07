import { Product } from "@/api/campaign";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function CampaignProductCard(props: Product) {
  return (
    <>
      <Card className="bg-white p-4">
        <Image
          alt="iPad Mini"
          className="h-24 mx-auto"
          height="100"
          src={`/api/images/${props.images[0]}`}
          style={{
            aspectRatio: "100/100",
            objectFit: "cover",
          }}
          width="100"
        />
        <div className="text-center">
          <p className="text-sm font-semibold mt-2">{props.name}</p>
          <div className="flex justify-center mt-1"></div>
          <p className="text-sm mt-1">Rs. {props.price}</p>
        </div>
      </Card>
    </>
  );
}
