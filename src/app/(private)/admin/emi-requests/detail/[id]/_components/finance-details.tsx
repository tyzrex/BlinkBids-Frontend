export default function FinanceDetails({
  emi_duration,
  downpayment,
  finance_amount,
  emi_per_month,
}: {
  emi_duration: string;
  downpayment: string;
  finance_amount: string;
  emi_per_month: string;
}) {
  return (
    <div className="text-sm font-light text-gray-700">
      <p className="text-sm font-normal text-black">EMI Finance Information</p>
      <p>Emi duration: {emi_duration} months</p>
      <p>Downpayment: Rs.{downpayment}</p>
      <p>Finance Amount: Rs.{finance_amount}</p>
      <p>EMI Per Month: Rs.{emi_per_month}</p>
    </div>
  );
}
