import { Dispatch } from "react";
import { parseCurrency } from "@/lib/utils";

interface DownPaymentOption {
  [key: string]: any;
}

interface DispatchAction {
  type: string;
  payload: {
    isLoading?: boolean;
    calculationError?: string | null;
    downPaymentOptions?: DownPaymentOption[];
    cmhcInsurance?: string[];
    totalMortgage?: string[];
    mortgagePayment?: string[];
  };
}

type DispatchType = Dispatch<DispatchAction>;

type FetchDownPaymentOptions = (price: number) => Promise<DownPaymentOption[]>;

export const calculateAll = async (
  debouncedPrice: string,
  fetchDownPaymentOptions: FetchDownPaymentOptions,
  dispatch: DispatchType,
) => {
  const parsedPrice = parseCurrency(debouncedPrice);

  if (debouncedPrice && parsedPrice > 0) {
    dispatch({
      type: "SET_STATE",
      payload: { isLoading: true, calculationError: null },
    });

    try {
      // Fetch down payment options based on the debounced price
      const downPaymentOptions = await fetchDownPaymentOptions(parsedPrice);

      if (downPaymentOptions.length === 0) {
        throw new Error("No down payment options available");
      }

      dispatch({
        type: "SET_STATE",
        payload: { downPaymentOptions },
      });
    } catch (error) {
      console.error("Error in calculations:", error);
      dispatch({
        type: "SET_STATE",
        payload: {
          calculationError:
            error instanceof Error
              ? error.message
              : "Error occurred while fetching options.",
        },
      });
    } finally {
      dispatch({ type: "SET_STATE", payload: { isLoading: false } });
    }
  } else {
    dispatch({
      type: "SET_STATE",
      payload: {
        downPaymentOptions: [],
        cmhcInsurance: Array(4).fill("$-"),
        totalMortgage: Array(4).fill("$-"),
        mortgagePayment: Array(4).fill("$-"),
      },
    });
  }
};
