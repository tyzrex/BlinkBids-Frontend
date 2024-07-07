import Image from "next/image";
import BottomBanner from "@/../public/assets/gaming-laptop.png";

export default function HomeBottomBanner() {
  return (
    <section className="h-auto mx-auto mb-10 relative">
      <div className="w-full">
        <Image
          src={BottomBanner}
          alt="Bottom Banner"
          width={0}
          height={0}
          className="h-60 md:h-full object-cover "
        />
      </div>
    </section>
  );
}
