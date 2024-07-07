import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { applyEMI } from "@/api/user-actions";
import InputField from "@/app/(private)/admin/components/Input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showErrorToasts } from "@/lib/utils";
import { useBankFormStore } from "@/store/bankForm";
import { usePersonalInformationStore } from "@/store/emiform";
import { useEmiInfoStore } from "@/store/emiInfo";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  EmiInfo,
  emiInfoSchema,
} from "../../../../../schema/emi/emi-info-schema";
import { useRouter } from "next/navigation";

export default function EmiForm() {
  const { emiInfo, setEmiInfo, productPrice, product_id, resetEmiInfo } =
    useEmiInfoStore();
  const { bankInformation, clearBankInformation } = useBankFormStore();
  const { personalInformation, clearPersonalInformation } =
    usePersonalInformationStore();
  const session = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    setError,
    formState: { errors },
  } = useForm<EmiInfo>({
    resolver: zodResolver(emiInfoSchema),
    defaultValues: {
      emi_duration: emiInfo?.emi_duration ?? 0,
      emi_per_month: emiInfo?.emi_per_month ?? 0,
      agreement: emiInfo?.agreement,
      declaration: emiInfo?.declaration,
      downpayment: parseFloat((emiInfo?.downpayment ?? 0).toFixed(2)) as number,
      finance_amount: parseFloat(
        (emiInfo?.finance_amount ?? 0).toFixed(2)
      ) as number,
    },
  });
  const router = useRouter();

  //console.log(errors);
  const watchDownpayment = watch("downpayment");
  const watchEmiMode = watch("emi_duration");

  useEffect(() => {
    let financeAmount = productPrice - watchDownpayment;

    if (watchDownpayment > productPrice) {
      setError("downpayment", {
        type: "manual",
        message: "Downpayment cannot be greater than product price",
      });
      return;
    }

    if (!watchEmiMode) {
      return;
    }

    setValue("finance_amount", parseFloat(financeAmount.toFixed(2)));
    setValue(
      "emi_per_month",
      parseFloat((financeAmount / watchEmiMode).toFixed(2))
    );
  }, [watchDownpayment, watchEmiMode]);

  const onSubmit = async (data: EmiInfo) => {
    setEmiInfo(data);

    const payload = {
      ...personalInformation,
      ...bankInformation,
      ...data,
      product: product_id,
    };

    try {
      const emiFormData = new FormData();
      if (!session) {
        return;
      }
      emiFormData.append("full_name", payload.full_name);
      emiFormData.append("email", payload.email);
      emiFormData.append("address", payload.address);
      emiFormData.append("contact_number", payload.contact_number);

      emiFormData.append("bank", payload.bank);
      emiFormData.append("gender", payload.gender);
      emiFormData.append("downpayment", payload.downpayment.toString());
      emiFormData.append("finance_amount", payload.finance_amount.toString());
      emiFormData.append("emi_per_month", payload.emi_per_month.toString());
      emiFormData.append("emi_duration", payload.emi_duration.toString());
      emiFormData.append("product", payload.product.toString());

      if (payload.has_credit_card === true) {
        emiFormData.append("has_credit_card", "true");
        emiFormData.append("credit_card_name", payload.credit_card_name);
        emiFormData.append(
          "credit_card_limit",
          payload.credit_card_limit.toString()
        );
        emiFormData.append("credit_card_number", payload.credit_card_number);
        emiFormData.append(
          "credit_card_expiration",
          payload.credit_card_expiration
        );
      } else {
        emiFormData.append("has_credit_card", "false");
        emiFormData.append("salary_certificate", payload.salary_certificate[0]);
        emiFormData.append("citizenship_copy", payload.citizenship_copy[0]);
        emiFormData.append("bank_statement", payload.bank_statement[0]);
        emiFormData.append("passport_photo", payload.passport_photo[0]);
        emiFormData.append("residential_status", payload.residential_status);
        emiFormData.append("monthly_income", payload.monthly_income);
        emiFormData.append("employment_length", payload.employment_length);
        emiFormData.append("occupation", payload.occupation);
        emiFormData.append("dob_ad", payload.dob_ad);
        emiFormData.append("num_dependents", payload.num_dependents);
        if (payload.nationality) {
          emiFormData.append("nationality", payload.nationality);
        }
      }

      const res = await applyEMI(emiFormData);
      if (res.success === true) {
        toast.success("EMI created Successfully");
        resetEmiInfo();
        clearPersonalInformation();
        clearBankInformation();
        router.push("/");
      } else {
        showErrorToasts(res.errorData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label
          htmlFor="terms1"
          className="text-sm font-semibold text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          EMI Duration
        </label>
        <Select
          // value={
          //   emiInfo?.emi_duration === 6
          //     ? "6"
          //     : emiInfo?.emi_duration === 12
          //     ? "12"
          //     : emiInfo?.emi_duration === 18
          //     ? "18"
          //     : emiInfo?.emi_duration === 24
          //     ? "24"
          //     : ""
          // }
          onValueChange={(value) => {
            setValue("emi_duration", value ? parseInt(value) : 6);
            clearErrors("emi_duration");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a duration length" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={"6"}>6 months</SelectItem>
              <SelectItem value={"9"}>9 months</SelectItem>
              <SelectItem value={"12"}>12 months</SelectItem>
              <SelectItem value={"18"}>18 months</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors?.emi_duration?.message && (
          <p className="text-red-500">{errors?.emi_duration?.message}</p>
        )}
        <InputField
          label="Downpayment"
          type="number"
          placeholder="Downpayment"
          errors={errors?.downpayment?.message}
          field={register("downpayment")}
        />
        <InputField
          label="Finance Amount"
          type="number"
          disabled
          placeholder="Finance Amount"
          errors={errors?.finance_amount?.message}
          field={register("finance_amount")}
        />

        <InputField
          label="EMI per month"
          type="number"
          disabled
          placeholder="EMI per month"
          errors={errors?.emi_per_month?.message}
          field={register("emi_per_month")}
        />

        <div className="items-top flex space-x-2">
          <Checkbox
            id="terms1"
            defaultChecked={emiInfo?.agreement}
            onCheckedChange={(value) => {
              setValue("agreement", value ? true : false);
              clearErrors("agreement");
            }}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              I agree to pay down payment and service charge to FatafatSewa
              office. Calculate your service charge here
            </p>
            {errors?.agreement?.message && (
              <p className="text-red-500">{errors?.agreement?.message}</p>
            )}
          </div>
        </div>

        <div className="items-top flex space-x-2">
          <Checkbox
            id="terms1"
            {...register("declaration")}
            defaultChecked={emiInfo?.declaration}
            onCheckedChange={(value) => {
              setValue("declaration", value ? true : false);
              clearErrors("declaration");
            }}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Declare correct information
            </label>
            <p className="text-sm text-muted-foreground">
              I declare that the information I have provbided above is accurate
              and complete to the best of of my knowledge. I authorize the bank,
              Fatafat Sewa Pvt. Ltd. and its representative to call or SMS me
              with reference to my credit card application.
            </p>
            {errors?.declaration?.message && (
              <p className="text-red-500">{errors?.declaration?.message}</p>
            )}
          </div>
        </div>
        <button className="accent-button w-[100px] float-right" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
