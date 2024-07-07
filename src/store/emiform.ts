import { create } from 'zustand';

type PersonalInformationStore = {
    personalInformation: PersonalInformation;

    setPersonalInformation: (personalInformation: PersonalInformation) => void;
    clearPersonalInformation: () => void;
    };

export type PersonalInformation = {
    full_name: string;
    email: string;
    contact_number: string;
    address: string;
    gender: string;
    district: string;
}

const defaultPersonalInformation: PersonalInformation = {
    full_name: '',
    email: '',
    contact_number: '',
    address: '',
    gender: '',
    district: '',
}



export const usePersonalInformationStore = create<PersonalInformationStore>((set, get) => ({
    personalInformation: {
        ...defaultPersonalInformation
    },
    setPersonalInformation: (personalInformation) => {
        set({ personalInformation });
    },
    clearPersonalInformation: () => {
        set({ personalInformation: defaultPersonalInformation });
    }
}));

const maxStep = 2;

type EmiFormStore = {
    activeStep:  number;
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
};

export const useEmiFormStore = create<EmiFormStore>((set, get) => ({
    activeStep: 0,
     nextStep: () => {
        set((state) => (
            maxStep === state.activeStep
                ? { activeStep: maxStep }
                : { activeStep: state.activeStep + 1 }
        ));
    },
    prevStep: () => {
        set((state) => (
            state.activeStep === 0
                ? { activeStep: 0 }
                : { activeStep: state.activeStep - 1 }
        ));
    }
    ,
    setStep: (step) => {
        set({ activeStep: step });
    },
}));
