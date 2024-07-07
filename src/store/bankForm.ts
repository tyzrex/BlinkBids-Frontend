import { create } from 'zustand';

type BankFormStore = {
    bankInformation: BankInformation;
    has_credit_card: boolean | null;
    set: (bankInformation: BankInformation) => void;
    setHasCreditCard: (has_credit_card: boolean | null) => void;
    banks_list: any;
    setBanksList: (banks_list: any) => void;
    clearBankInformation: () => void;   
};


export type CommonInformation = {
    has_credit_card: boolean;
    bank: string;
 
}

type CreditCardInformation = {
    credit_card_number: string;
    credit_card_name: string;
    credit_card_expiration: string;
    credit_card_limit: number;
}

type NoCreditCardInformation = {
    residential_status: string;
    num_dependents: string;
    occupation: string;
    monthly_income: string;
    employment_length: string;
    salary_certificate: any;
    citizenship_copy: any;
    passport_photo: any;
    bank_statement: any;
    dob_ad: string;
    nationality: "nepali" | "others" | undefined;
}


const initialBankInformation: BankInformation = {
    has_credit_card: false,
    bank: '',
    credit_card_number: '',
    credit_card_name: '',
    credit_card_expiration: '',
    credit_card_limit: 0,
    residential_status: '',
    num_dependents: '',
    occupation: '',
    monthly_income: '',
    employment_length: '',
    salary_certificate: '',
    citizenship_copy: '',
    passport_photo: '',
    bank_statement: '',
    dob_ad: '',
    nationality: "nepali"
};

export type BankInformation = CommonInformation & CreditCardInformation & NoCreditCardInformation;

export const useBankFormStore = create<BankFormStore>((set, get) => ({
    has_credit_card: null,
    banks_list: [],
    bankInformation: {
        ...initialBankInformation
    },
    set: (bankInformation) => {
        set({ bankInformation });
    },
    setHasCreditCard: (has_credit_card) => {
        set({ has_credit_card });
    },
    setBanksList: (banks_list) => {
        set({ banks_list });
    },
    clearBankInformation: () => {
        set({ bankInformation: initialBankInformation });
    }   
}));

