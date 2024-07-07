import { GalleryVerticalIcon } from "lucide-react";
import { AiOutlineFileImage, AiOutlineSetting } from "react-icons/ai";
import {
  BiBookContent,
  BiCalculator,
  BiCategory,
  BiSolidDashboard,
  BiUserCircle,
} from "react-icons/bi";
import { BsBox } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { ImBlog } from "react-icons/im";
import {
  MdOutlineBrandingWatermark,
  MdOutlineCategory,
  MdOutlineFestival,
} from "react-icons/md";
import { PiUsersFourDuotone } from "react-icons/pi";

interface ISidebarItem {
  icon: JSX.Element;
  label: string;
  href: string;
  subCategories?: ISidebarItem[];
}

export const sidebarItems: ISidebarItem[] = [
  {
    icon: <BiCategory className="w-6 h-6" />,
    label: "Home Sections",
    href: "/admin/sections",
  },
  {
    icon: <BiCategory className="w-6 h-6" />,
    label: "Dasboard",
    href: "/admin/dashboard",
  },
  {
    icon: <GalleryVerticalIcon className="w-6 h-6" />,
    label: "Media",
    href: "/admin/media-library",
  },
  {
    icon: <BsBox className="w-6 h-6" />,
    label: "Product ",
    href: "/admin/dashboard",

    subCategories: [
      {
        icon: <BiCategory className="w-6 h-6" />,
        label: "All Products",
        href: "/admin/products",
      },
      {
        icon: <BiCategory className="w-6 h-6" />,
        label: "Deleted Products",
        href: "/admin/deleted-products",
      },
      {
        icon: <MdOutlineBrandingWatermark className="w-6 h-6" />,
        label: "Brand",
        href: "/admin/brands",
      },
      {
        icon: <MdOutlineCategory className="w-6 h-6" />,
        label: "Parent Category",
        href: "/admin/category",
      },
      {
        icon: <MdOutlineCategory className="w-6 h-6" />,
        label: "Children Category",
        href: "/admin/category-children",
      },
    ],
  },
  {
    icon: <AiOutlineFileImage className="w-6 h-6" />,
    label: "Banners",
    href: "/admin/banners",
  },
  {
    icon: <GiShoppingCart className="w-6 h-6" />,
    label: "Order Request",
    href: "/admin/order-requests",
  },
  {
    icon: <BiCalculator className="w-6 h-6" />,
    label: "EMI Request",
    href: "/admin/emi-requests",
  },

  {
    icon: <BiBookContent className="w-6 h-6" />,
    label: "Content Management",
    href: "/admin/users",

    subCategories: [
      {
        icon: <FaRegNewspaper className="w-6 h-6" />,
        label: "Pages",
        href: "/admin/pages",
      },
      {
        icon: <ImBlog className="w-6 h-6" />,
        label: "Blogs",
        href: "/admin/blogs",
      },
      {
        icon: <ImBlog className="w-6 h-6" />,
        label: "Blogs Categories",
        href: "/admin/blogs-categories",
      },
    ],
  },
  {
    icon: <BiUserCircle className="w-6 h-6" />,
    label: "User Management",
    href: "/admin/chat",

    subCategories: [
      {
        icon: <PiUsersFourDuotone className="w-6 h-6" />,
        label: "All Users",
        href: "/admin/users",
      },
      {
        icon: <AiOutlineSetting className="w-6 h-6" />,
        label: "Roles",
        href: "/admin/users/roles",
      },
    ],
  },
  {
    icon: <MdOutlineFestival className="w-6 h-6" />,
    label: "Campaigns",
    href: "/admin/campaigns",
  },
  {
    icon: <MdOutlineFestival className="w-6 h-6" />,
    label: "Banks",
    href: "/admin/banks",
  },
  {
    icon: <BiSolidDashboard className="w-6 h-6" />,
    label: "Analytics",
    href: "/admin/support",

    subCategories: [
      {
        icon: <BiCategory className="w-6 h-6" />,
        label: "Sales Analytics",
        href: "/admin/analytics",
      },
    ],
  },
];
