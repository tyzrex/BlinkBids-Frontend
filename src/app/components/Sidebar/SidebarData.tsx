import { BiChevronRight } from "react-icons/bi";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { BsPhone } from "react-icons/bs";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { IoCamera } from "react-icons/io5";
import { IoTv } from "react-icons/io5";

import { ISidebarItem } from "../componentTypes";
import { AiOutlineBook } from "react-icons/ai";

export const sidebarItems: ISidebarItem[] = [
  {
    icon: <HiBars3CenterLeft className="w-6 h-6" />,
    className: "bg-accent-2 rounded-full text-white ",
    label: "All Categories",
    href: "/",
  },
  {
    icon: <BsPhone className="w-6 h-6" />,
    label: "Mobile Phones",
    href: "/mobile-phones",
    rightIcon: <BiChevronRight className="w-6 h-6" />,
  },
  {
    icon: <HiMiniComputerDesktop className="w-6 h-6" />,
    label: "Computers",
    href: "/computers",
    rightIcon: <BiChevronRight className="w-6 h-6" />,
  },
  {
    icon: <IoCamera className="w-6 h-6" />,
    label: "Camera And Drone",
    href: "/camera-and-drone",
    rightIcon: <BiChevronRight className="w-6 h-6" />,
  },
  {
    icon: <IoTv className="w-6 h-6" />,
    label: "TV and Appliances",
    href: "/tv-and-appliances",
    rightIcon: <BiChevronRight className="w-6 h-6" />,
  },
  {
    icon: <AiOutlineBook className="w-6 h-6" />,
    label: "Books",
    href: "/books",
  },
];
