import { Dispatch } from "react";
import { formatCurrency, parseCurrency } from "@/lib/utils";

interface MortgageCalculation {
  cmhcInsurance: number;
  insuredMortgageAmount: number;
  payment: number;
}

interface StatePayload {
  isLoading: boolean;
  calculationError: string | null;
  cmhcInsurance: string[];
  totalMortgage: string[];
  mortgagePayment: string[];
}

type MortgageOption = [number, number];

type DispatchType = Dispatch<{ type: string; payload: Partial<StatePayload> }>;

const calculateMortgageOptions = async (
  debouncedPrice: string,
  debouncedDownPaymentOptions: MortgageOption[],
  debouncedMortgageRate: string[],
  debouncedAmortization: string[],
  debouncedPaymentFrequency: string[],
  dispatch: DispatchType,
  calculateMortgage: (
    price: number,
    downPayment: number,
    interestRate: number,
    amortization: number,
    paymentFrequency: string
  ) => Promise<MortgageCalculation>
): Promise<void> => {
  const parsedPrice = parseCurrency(debouncedPrice);

  if (
    debouncedPrice &&
    parsedPrice > 0 &&
    debouncedDownPaymentOptions.length > 0
  ) {
    dispatch({
      type: "SET_STATE",
      payload: { isLoading: true, calculationError: null },
    });
    try {
      const mortgageCalculations = await Promise.all(
        debouncedDownPaymentOptions.map((option, index) =>
          calculateMortgage(
            parsedPrice,
            option[1],
            parseFloat(debouncedMortgageRate[index]) / 100,
            parseInt(debouncedAmortization[index]),
            debouncedPaymentFrequency[index]
          )
        )
      );
      dispatch({
        type: "SET_STATE",
        payload: {
          cmhcInsurance: mortgageCalculations.map((calc) =>
            formatCurrency(calc.cmhcInsurance)
          ),
          totalMortgage: mortgageCalculations.map((calc) =>
            formatCurrency(calc.insuredMortgageAmount)
          ),
          mortgagePayment: mortgageCalculations.map((calc) =>
            formatCurrency(calc.payment)
          ),
        },
      });
    } catch (error) {
      console.error("Error in mortgage calculations:", error);
      dispatch({
        type: "SET_STATE",
        payload: {
          calculationError:
            error instanceof Error
              ? error.message
              : "Error occurred while calculating mortgage options.",
        },
      });
    } finally {
      dispatch({ type: "SET_STATE", payload: { isLoading: false } });
    }
  }
};

export default calculateMortgageOptions;
