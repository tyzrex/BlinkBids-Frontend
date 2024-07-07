import {
  LiaFacebook,
  LiaInstagram,
  LiaTwitter,
  LiaMapMarkerAltSolid,
} from "react-icons/lia";

interface ISocialLinks {
  name: string;
  href: string;
  icon: JSX.Element;
}

export const footerData = [
  {
    title: "Information",
    links: [
      {
        name: "Banks",
        href: "/bank-details",
      },
      {
        name: "Privacy Policy",
        href: "/contact",
      },
      {
        name: "Return Policy",
        href: "/privacy-policy",
      },
      {
        name: "Terms & Conditions",
        href: "/terms-and-conditions",
      },
      {
        name: "Exchange Policy",
        href: "/terms-and-conditions",
      },
      {
        name: "Cookies Policy",
        href: "/cookies-policy",
      },
    ],
  },
  {
    title: "Quick Links",
    links: [
      {
        name: "Blog",
        href: "/blog",
      },
      {
        name: "About Us",
        href: "/about-us",
      },
      {
        name: "Contact Us",
        href: "/contact-us",
      },
      {
        name: "Payment Process",
        href: "/payment-process",
      },
      {
        name: "EMI Process",
        href: "/emi-process",
      },
      {
        name: "Vendor Application",
        href: "/vendor-application",
      },
    ],
  },
  {
    title: "Guide",
    links: [
      {
        name: "FAQ",
        href: "/faq",
      },
      {
        name: "Video Tutorial",
        href: "/video-tutorial",
      },
    ],
  },
];

export const socialLinks: ISocialLinks[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/fatafatsewa",
    icon: <LiaFacebook className="w-5 h-5 sm:w-6 sm:h-6 text-accent-1 " />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/fatafatsewa",
    icon: <LiaInstagram className="w-5 h-5 sm:w-6 sm:h-6 text-accent-1 " />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/fatafatsewa",
    icon: <LiaTwitter className="w-5 h-5 sm:w-6 sm:h-6 text-accent-1 " />,
  },
  {
    name: "Google",
    href: "https://www.google.com",
    icon: (
      <LiaMapMarkerAltSolid className="w-5 h-5 sm:w-6 sm:h-6 text-accent-1 " />
    ),
  },
];
