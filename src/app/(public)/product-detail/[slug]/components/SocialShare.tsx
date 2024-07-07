"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineWhatsApp,
  AiOutlineLink,
} from "react-icons/ai";
import { toast } from "sonner";

export default function SocialShare() {
  const [productLink, setProductLink] = useState<string>("" as string);

  function copyToClipboard() {
    navigator.clipboard.writeText(productLink);
    toast.success("Link copied to clipboard");
  }

  useEffect(() => {
    const url = `${window.location.href}`;
    setProductLink(url);
  }, []);

  return (
    <div className="my-4 w-full">
      <p className="text-sm">Share this link via</p>

      <div className="flex items-center gap-5 my-4">
        <Link
          prefetch={false}
          href={`https://www.facebook.com/sharer/sharer.php?u=fatafatsewa.com`}
          target="_blank"
        >
          <div className="border hover:bg-[#1877f2] w-12 h-12 text-[#1877f2] hover:text-white border-blue-200 rounded-full flex-center color-transition shadow-xl hover:shadow-blue-500/50 cursor-pointer">
            <AiOutlineFacebook className="text-2xl" />
          </div>
        </Link>

        <Link
          target="_blank"
          prefetch={false}
          href={`https://twitter.com/intent/tweet?url=fatafatsewa.com`}
        >
          <div className="border hover:bg-[#1d9bf0] w-12 h-12 text-[#1d9bf0] hover:text-white border-blue-200 rounded-full flex-center color-transition shadow-xl hover:shadow-sky-500/50 cursor-pointer">
            <AiOutlineTwitter className="text-2xl" />
          </div>
        </Link>

        <Link
          target="_blank"
          prefetch={false}
          href={`https://www.instagram.com/fatafatsewa/`}
        >
          <div className="border hover:bg-[#bc2a8d] w-12 h-12 text-[#bc2a8d] hover:text-white border-pink-200 rounded-full flex-center color-transition shadow-xl hover:shadow-pink-500/50 cursor-pointer">
            <AiOutlineInstagram className="text-2xl" />
          </div>
        </Link>

        <Link
          target="_blank"
          prefetch={false}
          href={`https://api.whatsapp.com/send?text=${productLink}`}
        >
          <div className="border hover:bg-[#25D366] w-12 h-12 text-[#25D366] hover:text-white border-green-200 rounded-full flex-center color-transition shadow-xl hover:shadow-green-500/50 cursor-pointer">
            <AiOutlineWhatsApp className="text-2xl" />
          </div>
        </Link>
      </div>

      <p className="text-sm">Or copy link</p>
      <div className="border-2 border-gray-200 flex justify-between items-center mt-4 py-2">
        <AiOutlineLink className="text-xl mx-2" />

        <input
          className="w-full outline-none bg-transparent"
          type="text"
          placeholder="link"
          disabled
          value={productLink?.slice(0, 50) + "..."}
        />

        <button
          className="bg-accent-2 text-white rounded text-sm py-2 px-5 mr-2 hover:bg-accent-1 color-transition
          "
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
