import { Dispatch } from "react";
import { parseAndFormatCurrency, parseCurrency } from "@/lib/utils";

// Updates the amortization value at the specified index
export const handleAmortizationChange = (
  value: string,
  index: number,
  dispatch: Dispatch<{ type: string; payload: { amortization: string[] } }>,
  amortization: string[]
) => {
  const newAmortization = [...amortization];
  newAmortization[index] = value;
  dispatch({ type: "SET_STATE", payload: { amortization: newAmortization } });
};

// Updates the mortgage rate value at the specified index
export const handleMortgageRateChange = (
  value: string,
  index: number,
  dispatch: Dispatch<{ type: string; payload: { mortgageRate: string[] } }>,
  mortgageRate: string[]
) => {
  const newMortgageRate = [...mortgageRate];
  newMortgageRate[index] = value;
  dispatch({ type: "SET_STATE", payload: { mortgageRate: newMortgageRate } });
};

// Updates the payment frequency value at the specified index
export const handlePaymentFrequencyChange = (
  value: string,
  index: number,
  dispatch: Dispatch<{ type: string; payload: { paymentFrequency: string[] } }>,
  paymentFrequency: string[]
) => {
  const newPaymentFrequency = [...paymentFrequency];
  newPaymentFrequency[index] = value.toLowerCase().replace(/-/g, "-");
  dispatch({
    type: "SET_STATE",
    payload: { paymentFrequency: newPaymentFrequency },
  });
};

// Updates the down payment value, either as a percentage or fixed amount
export const handleDownPaymentChange = (
  index: number,
  isPercentage: boolean,
  value: string,
  downPaymentOptions: [number, number][],
  price: string,
  dispatch: Dispatch<{
    type: string;
    payload: { downPaymentOptions: [number, number][] };
  }>
) => {
  // Handle empty input
  if (value.trim() === "") {
    const newDownPaymentOptions = [...downPaymentOptions];
    newDownPaymentOptions[index] = [0, 0];
    dispatch({
      type: "SET_STATE",
      payload: { downPaymentOptions: newDownPaymentOptions },
    });
    return;
  }

  // Convert string input to a number
  const numericValue = parseFloat(value);
  const priceValue = parseCurrency(price);

  // Validate parsed values
  if (priceValue > 0 && !isNaN(numericValue)) {
    const newDownPaymentOptions = [...downPaymentOptions];
    if (isPercentage) {
      // Calculate percentage and amount, rounded to 2 decimal places
      const percentage = Math.round((numericValue / 100) * 100) / 100; // Round percentage
      const amount = Math.round(priceValue * percentage * 100) / 100; // Round amount
      newDownPaymentOptions[index] = [percentage, amount];
    } else {
      // Calculate amount and percentage, rounded to 2 decimal places
      const percentage = Math.round((numericValue / priceValue) * 100) / 100; // Round percentage
      const amount = Math.round(numericValue * 100) / 100; // Round amount
      newDownPaymentOptions[index] = [percentage, amount];
    }

    // Dispatch updated state
    dispatch({
      type: "SET_STATE",
      payload: { downPaymentOptions: newDownPaymentOptions },
    });
  }
};

// Updates the price
export const handlePriceChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch<{ type: string; payload: { price: string } }>
) => {
  parseAndFormatCurrency(e.target.value, (value) =>
    dispatch({ type: "SET_STATE", payload: { price: value } })
  );
};
