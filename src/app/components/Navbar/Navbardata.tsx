import { HiOutlineHome } from "react-icons/hi";
import { GrNotes } from "react-icons/gr";
import { BsCalculator } from "react-icons/bs";
import { INavlinks } from "../componentTypes";
import { BiMobileAlt } from "react-icons/bi";

export const Navlinks: INavlinks[] = [
  {
    name: "Home",
    href: "/",
    icon: <HiOutlineHome className="w-6 h-6" />,
  },
  {
    name: "Blogs",
    href: "/blogs",
    icon: <GrNotes className="w-6 h-6" />,
  },
  {
    name: "EMI Calculator",
    href: "/emi-calculator",
    icon: <BsCalculator className="w-6 h-6" />,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    icon: <BiMobileAlt className="w-6 h-6" />,
  },
];

export const secondaryNavLinks = [
  {
    name: "Calculate EMI",
    href: "/contact-us",
  },
  {
    name: "Compare Products",
    href: "/contact-us",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
];
