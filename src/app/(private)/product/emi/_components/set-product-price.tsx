"use client";

import { useEffect } from "react";

import { useBankFormStore } from "@/store/bankForm";
import { useEmiInfoStore } from "@/store/emiInfo";

export default function SetProductPrice({
  productPrice,
  productId,
  bankList,
}: {
  productId: number;
  productPrice: number;
  bankList: any;
}) {
  const { setProductPrice, setProductID } = useEmiInfoStore();
  const { setBanksList } = useBankFormStore();
  useEffect(
    () => {
      setProductPrice(productPrice);
      setProductID(productId);
      setBanksList(bankList);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <></>;
}
