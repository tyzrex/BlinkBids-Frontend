import {
  Tag,
  Users,
  Settings,
  Bookmark,
  PenSquare,
  LayoutGrid,
  FileArchive,
  BoxIcon,
  ImagePlus,
  CopyIcon,
  PenIcon,
  PenLineIcon,
  ListOrderedIcon,
  BanknoteIcon,
  Building2,
  PercentCircle,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/media-library",
          label: "Media Library",
          active: pathname.includes("/media-library"),
          icon: FileArchive,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Products, Categories & Brands",
      menus: [
        {
          href: "",
          label: "Products",
          active: pathname.includes("/products"),
          icon: BoxIcon,
          submenus: [
            {
              href: "/admin/products",
              label: "All Products",
              active: pathname === "/admin/products",
            },
            {
              href: "/admin/deleted-products",
              label: "Deleted products",
              active: pathname === "/admin/deleted-products",
            },
            {
              href: "/admin/products/add-product",
              label: "Add New Product",
              active: pathname === "/products/add-product",
            },
          ],
        },
        {
          href: "",
          label: "Categories",
          active: pathname.includes("/category"),
          icon: Bookmark,
          submenus: [
            {
              href: "/admin/category",
              label: "All Categories",
              active: pathname === "/admin/category",
            },
            {
              href: "/admin/category-children",
              label: "Children Categories",
              active: pathname === "/admin/category-children",
            },
            {
              href: "/admin/category/add-category",
              label: "Add Parent Category",
              active: pathname === "/admin/category/add-category",
            },
            {
              href: "/admin/category-children/add-category",
              label: "Add Children Category",
              active: pathname === "/admin/category-children/add-category",
            },
          ],
        },
        {
          href: "/admin/brands",
          label: "Brands",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: [
            {
              href: "/admin/brands",
              label: "All Brands",
              active: pathname === "/admin/brands",
            },
            {
              href: "/admin/brands/add-brand",
              label: "Add New Brand",
              active: pathname === "/admin/brands/add-brand",
            },
          ],
        },
      ],
    },

    {
      groupLabel: "Order Management",
      menus: [
        {
          href: "/admin/order-requests",
          label: "Orders",
          active: pathname.includes("/admin/orders"),
          icon: ListOrderedIcon,
          submenus: [],
        },
        {
          href: "/admin/emi-requests",
          label: "EMI Requests",
          active: pathname.includes("/admin/emi-requests"),
          icon: BanknoteIcon,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: "Content Management",
      menus: [
        {
          href: "/admin/banners",
          label: "Banners",
          active: pathname.includes("/admin/banners"),
          icon: ImagePlus,
          submenus: [],
        },
        {
          href: "/admin/pages",
          label: "Pages",
          active: pathname.includes("/admin/pages"),
          icon: CopyIcon,
          submenus: [],
        },
        {
          href: "/admin/blogs",
          label: "Blogs",
          active: pathname.includes("/admin/blogs"),
          icon: PenIcon,
          submenus: [],
        },
        {
          href: "/admin/blogs-categories",
          label: "Blog Categories",
          active: pathname.includes("/admin/pages"),
          icon: PenLineIcon,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Extras",
      menus: [
        {
          href: "/admin/banks",
          label: "Banks",
          active: pathname.includes("/admin/banks"),
          icon: Building2,
          submenus: [],
        },
        {
          href: "/admin/campaigns",
          label: "Campaigns",
          active: pathname.includes("/admin/campaigns"),
          icon: PercentCircle,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/admin/users",
          label: "Users",
          active: pathname.includes("/admin/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/admin/users/roles",
          label: "Role Management",
          active: pathname.includes("/admin/users/roles"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
