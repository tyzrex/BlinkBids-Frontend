import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";

interface IBreadcrumb {
  name: string;
  category: string;
  brand: string;
}

export default function Breadcrumb(props: IBreadcrumb) {
  return (
    <div className="py-2 mt-5">
      <div className="max-w-layout mx-auto">
        <div className="flex items-center flex-wrap">
          <Link href="/">
            <span className="text-gray-600 hover:text-gray-800">Home</span>
          </Link>
          <AiOutlineRight className="mx-2" />
          <Link href="/category/slug">
            <span className="text-gray-600 hover:text-gray-800">
              {props?.category}
            </span>
          </Link>
          <AiOutlineRight className="mx-2" />
          <Link href="/brand/slug">
            <span className="text-gray-600 hover:text-gray-800">
              {props?.brand}
            </span>
          </Link>
          <AiOutlineRight className="mx-2" />
          <span className="text-gray-600">
            {props?.name?.slice(0, 20) + "..."}
          </span>
        </div>
      </div>
    </div>
  );
}
