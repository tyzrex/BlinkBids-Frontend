import { StaticImageData } from "next/image";
import AppleIpad from "public/assets/Apple-Ipad.jpg";
import Drones from "public/assets/drones.jpg";
import Headphones from "public/assets/headsets.jpg";
import Laptop from "public/assets/Laptops-1.jpg";
import Mobile from "public/assets/mobile-phones-apple-iphone-200x200.jpg";
import Cameras from "public/assets/photo-and-video-cameras-mirrorless-cameras.jpg";

export const provinces = [
  "Koshi",
  "Madesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpaschim",
];

export const nepalDistricts: string[] = [
  "Bhojpur",
  "Dhankuta",
  "Ilam",
  "Jhapa",
  "Khotang",
  "Morang",
  "Okhaldhunga",
  "Panchthar",
  "Sankhuwasabha",
  "Solukhumbu",
  "Sunsari",
  "Taplejung",
  "Terhathum",
  "Udayapur",
  "Saptari",
  "Siraha",
  "Dhanusa",
  "Mahottari",
  "Sarlahi",
  "Bara",
  "Parsa",
  "Rautahat",
  "Sindhuli",
  "Ramechhap",
  "Dolakha",
  "Bhaktapur",
  "Dhading",
  "Kathmandu",
  "Kavrepalanchok",
  "Lalitpur",
  "Nuwakot",
  "Rasuwa",
  "Sindhupalchok",
  "Chitwan",
  "Makwanpur",
  "Baglung",
  "Gorkha",
  "Kaski",
  "Lamjung",
  "Manang",
  "Mustang",
  "Myagdi",
  "Nawalpur",
  "Parbat",
  "Syangja",
  "Tanahun",
  "Kapilvastu",
  "Parasi",
  "Rupandehi",
  "Arghakhanchi",
  "Gulmi",
  "Palpa",
  "Dang",
  "Pyuthan",
  "Rolpa",
  "Eastern Rukum",
  "Banke",
  "Bardiya",
  "Western Rukum",
  "Salyan",
  "Dolpa",
  "Humla",
  "Jumla",
  "Kalikot",
  "Mugu",
  "Surkhet",
  "Dailekh",
  "Jajarkot",
  "Kailali",
  "Achham",
  "Doti",
  "Bajhang",
  "Bajura",
  "Kanchanpur",
  "Dadeldhura",
  "Baitadi",
  "Darchula",
];

export const availableBanks = [
  "NIC Asia Bank",
  "Nabil Bank",
  "Sunrise Bank Limited",
  "Kumari Bank Limited",
  "Machhapuchchhre Bank Limited",
  "Global IME Bank Limited",
  "Sanima Bank Limited",
  "Prabhu Bank Limited",
  "NMB Bank Limited",
];
interface ResponseItem {
  name: string;
  id: number;
  slug?: string;
}

// Define interface for the mapped object
interface MappedItem {
  name: string;
  id: number;
  image: StaticImageData | null; // Assuming image is a string or null
  slug: string;
}

const filteredHomeCategories = [
  "Mobile Phones",
  "Laptops",
  "Tablet",
  "Camera",
  "Drone",
  "Ear Phones",
  "Smart Watch",
  "Keyboard",
  "Monitor",
];

// Mapper function
export const mapResponseToObject = (response: ResponseItem[]): MappedItem[] => {
  return response
    ?.filter((item) => filteredHomeCategories.includes(item.name))
    .map((item) => {
      let image: StaticImageData | null = null;
      switch (item.name) {
        case "Mobile Phones":
          image = Mobile;
          break;
        case "Laptops":
          image = Laptop;
          break;
        case "Tablet":
          image = AppleIpad;
          break;
        case "Camera":
          image = Cameras;
          break;
        case "Drone":
          image = Drones;
          break;
        case "Ear Phones":
          image = Headphones;
        case "Smart Watch":
          image = Mobile;
        case "Keyboard":
          image = AppleIpad;
        case "Monitor":
          image = Laptop;

          break;
        default:
          break;
      }

      const slug = item.slug
        ? item.slug
        : item.name.toLowerCase().replace(" ", "-");

      return {
        name: item.name,
        id: item.id,
        image: image,
        slug: slug,
      };
    });
};

export const homeBrandSwiperData = [
  {
    name: "Mobile Phones",
    id: 1,
    image: Mobile,
    slug: "mobile-phones",
  },
  {
    name: "Laptops",
    id: 2,
    image: Laptop,
    slug: "laptops",
  },
  {
    name: "Tablet",
    id: 3,
    image: AppleIpad,
    slug: "tablets",
  },
  {
    name: "Home Appliances",
    id: 4,
    slug: "home-appliances",
  },
  {
    name: "Camera",
    id: 5,
    image: Cameras,
    slug: "cameras",
  },
  {
    name: "Drone",
    id: 6,
    image: Drones,
    slug: "drones",
  },
  {
    name: "Ear Phones",
    id: 7,
    image: Headphones,
    slug: "ear-phones",
  },
  {
    name: "Smart Watch",
    id: 8,
    slug: "smart-watch",
  },
];

export const statusButtonConstants = {
  pending: "bg-yellow-500",
  approved: "bg-lime-500",
  confirmed: "bg-emerald-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
} as const;

export enum Status {
  pending = "pending",
  approved = "approved",
  confirmed = "confirmed",
  completed = "completed",
  cancelled = "canceled",
}

// Define valid transitions using a Record type
export const validTransitions: Record<Status, Status[]> = {
  [Status.pending]: [Status.approved, Status.cancelled],
  [Status.approved]: [Status.confirmed, Status.cancelled],
  [Status.confirmed]: [Status.completed, Status.cancelled],
  [Status.completed]: [],
  [Status.cancelled]: [],
};

//take a string and then map it to the Status enum
export const joEditorConfig = {
  // existing configuration options...
  minHeight: 400,
  controls: {
    // Add or customize controls here
    fontsize: {
      list: [
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "24",
        "30",
        "36",
        "48",
        "60",
        "72",
        "96",
      ],
    },
  },
  uploader: { insertImageAsBase64URI: true },
  buttons: [
    "source",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "superscript",
    "subscript",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "selectall",
    "print",
  ],
};
