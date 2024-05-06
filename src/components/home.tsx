import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <>
      <main>
        <section className="bg-gray-100 dark:bg-gray-950">
          <div className="container mx-auto flex items-center justify-between gap-8 px-4 py-12 md:px-6 md:py-20">
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Discover the Best Products
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Explore our wide range of high-quality products and find the
                perfect fit for your needs.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button className="w-full sm:w-auto" size="lg">
                  Shop Now
                </Button>
                <Button
                  className="w-full sm:w-auto"
                  size="lg"
                  variant="outline"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <img
              alt="Hero product"
              className="hidden md:block aspect-square w-full max-w-md rounded-lg object-cover"
              height={600}
              src="/placeholder.svg"
              width={600}
            />
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Featured Categories</h2>
              <Link
                className="text-sm font-medium text-primary hover:underline"
                href="#"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <Link
                className="group relative overflow-hidden rounded-lg"
                href="#"
              >
                <img
                  alt="Category 1"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={300}
                  src="/placeholder.svg"
                  width={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Electronics
                  </h3>
                </div>
              </Link>
              <Link
                className="group relative overflow-hidden rounded-lg"
                href="#"
              >
                <img
                  alt="Category 2"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={300}
                  src="/placeholder.svg"
                  width={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Clothing & Fashion
                  </h3>
                </div>
              </Link>
              <Link
                className="group relative overflow-hidden rounded-lg"
                href="#"
              >
                <img
                  alt="Category 3"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={300}
                  src="/placeholder.svg"
                  width={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Home & Kitchen
                  </h3>
                </div>
              </Link>
              <Link
                className="group relative overflow-hidden rounded-lg"
                href="#"
              >
                <img
                  alt="Category 4"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={300}
                  src="/placeholder.svg"
                  width={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Beauty & Personal Care
                  </h3>
                </div>
              </Link>
              <Link
                className="group relative overflow-hidden rounded-lg"
                href="#"
              >
                <img
                  alt="Category 5"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={300}
                  src="/placeholder.svg"
                  width={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Sports & Outdoors
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <Link
                className="text-sm font-medium text-primary hover:underline"
                href="#"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <div className="group relative overflow-hidden rounded-lg">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View product</span>
                </Link>
                <img
                  alt="Product 1"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={300}
                  src="/placeholder.svg"
                  width={300}
                />
                <div className="bg-white p-4 dark:bg-gray-950">
                  <h3 className="text-lg font-semibold">Stylish Sunglasses</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    UV protection
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-semibold">$29.99</span>
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="ghost"
                    >
                      <HeartIcon className="h-5 w-5" />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View product</span>
                </Link>
                <img
                  alt="Product 2"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={300}
                  src="/placeholder.svg"
                  width={300}
                />
                <div className="bg-white p-4 dark:bg-gray-950">
                  <h3 className="text-lg font-semibold">
                    Leather Crossbody Bag
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Stylish and practical
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-semibold">$49.99</span>
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="ghost"
                    >
                      <HeartIcon className="h-5 w-5" />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View product</span>
                </Link>
                <img
                  alt="Product 3"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={300}
                  src="/placeholder.svg"
                  width={300}
                />
                <div className="bg-white p-4 dark:bg-gray-950">
                  <h3 className="text-lg font-semibold">Wireless Headphones</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    High-quality sound
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-semibold">$79.99</span>
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="ghost"
                    >
                      <HeartIcon className="h-5 w-5" />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View product</span>
                </Link>
                <img
                  alt="Product 4"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={300}
                  src="/placeholder.svg"
                  width={300}
                />
                <div className="bg-white p-4 dark:bg-gray-950">
                  <h3 className="text-lg font-semibold">Classic Wristwatch</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Timeless design
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-semibold">$59.99</span>
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="ghost"
                    >
                      <HeartIcon className="h-5 w-5" />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View product</span>
                </Link>
                <img
                  alt="Product 5"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height={300}
                  src="/placeholder.svg"
                  width={300}
                />
                <div className="bg-white p-4 dark:bg-gray-950">
                  <h3 className="text-lg font-semibold">Flexi Wearables</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Comfortable and stylish
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-semibold">$39.99</span>
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="ghost"
                    >
                      <HeartIcon className="h-5 w-5" />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
