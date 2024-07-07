import { getServerSession, Session } from "next-auth";
import Image from "next/image";

import { getUserInfo } from "@/api/user";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { serverProtectedRequest } from "@/services/serverRequest";

import CheckOutForm from "../_components/checkout-form";

const getCartItems = async (session: Session | null) => {
  try {
    const response = await serverProtectedRequest(
      "orders/cart",
      "GET",
      session
    );
    return response?.data.results;
  } catch (error: any) {
    return {
      error: error.status,
      message: error.message,
    };
  }
};

interface Cart {
  count: number;
  products: {
    product: CartProducts;
    quantity: number;
  }[];
  total_price: number;
}

interface CartProducts {
  name: string;
  price: string;
  brand: string;
  category: string;
  images: string[];
}

export default async function CheckoutPage() {
  const session = await getServerSession(options);
  const [cartItems, user] = await Promise.all([
    getCartItems(session),
    getUserInfo(session),
  ]);
  const cart: Cart = cartItems;

  return (
    <main className="w-full">
      <div className="grid xl:grid-cols-2 py-10">
        <div className="px-4">
          <h2 className="text-xl font-medium">Order Summary</h2>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div
            className="mt-8
              max-h-[600px] overflow-y-auto
              no-scrollbar
            space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6
          "
          >
            {cart.count === 0 || !cart ? (
              <p className="text-center text-gray-400">No items in cart</p>
            ) : (
              cart.products.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`/api/images/${item.product.images[0]}`}
                      alt={item.product.name}
                      width={80}
                      height={80}
                    />
                    <div>
                      <p className="text-sm font-medium line-clamp-2 w-[80%]">
                        {item.product.name}
                      </p>
                      <p className="text-gray-400">{item.product.brand}</p>
                      <p className="text-gray-400">{item.product.category}</p>
                    </div>
                  </div>
                  <p className="text-lg font-medium">
                    Rs. {item.product.price} x {item.quantity}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <CheckOutForm
          total_price={cart.total_price}
          user={user}
          cart_count={cart.count}
        />
      </div>
    </main>
  );
}
