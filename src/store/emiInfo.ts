import { create } from 'zustand';

type EmiInfoStore = {
    emiInfo: EmiInfo;
    productPrice: number;
    product_id: number;
    setEmiInfo: (emiInfo: EmiInfo) => void;
    setProductPrice: (productPrice: number) => void;
    setProductID: (id: number) => void;
    resetEmiInfo: () => void;
};

const initialEmiInfo: EmiInfo = {
    emi_duration: 0,
    downpayment: 0,
    finance_amount: 0,
    emi_per_month: 0,
    agreement: false,
    declaration: false,
};

export type EmiInfo = {
    emi_duration: number;
    downpayment: number;
    finance_amount: number;
    emi_per_month: number;
    agreement: boolean;
    declaration: boolean; 
}

export const useEmiInfoStore = create<EmiInfoStore>((set, get) => ({
    product_id: 0,
    setProductID: (id) => {
        set ({product_id:id})
    },
    emiInfo: {
        ...initialEmiInfo
    },
    setEmiInfo: (emiInfo) => {
        set({ emiInfo });
    },
    productPrice: 0,
    setProductPrice: (productPrice) => {
        set({ productPrice });
    },
    resetEmiInfo: () => {
        set({ emiInfo: initialEmiInfo });
    }
}));