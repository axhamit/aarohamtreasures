import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const rate = Number(process.env.NEXT_PUBLIC_USD_TO_INR) || 83; // USD -> INR
  const inrAmount = (amount || 0) * rate;
  const formattedPrice = Number(inrAmount).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });

  return (
    <span className={twMerge("text-sm font-semibold text-darkColor", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
