import { useState, useCallback } from "react";

interface MortgageCalculation {
  amortizationPeriod: number;
  paymentSchedule: string;
  payment: number;
  cmhcInsurance: number;
  insuredMortgageAmount: number;
}

export const mortgageQuery = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Down Payment Options
  const fetchDownPaymentOptions = useCallback(async (price: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mortgage/calculate-down-payment?propertyPrice=${price}`,
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`,
        );
      }
      const data = await response.json();
      return data.data;
    } catch (err: any) {
      setError(err.message || "Error fetching down payment options");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Calculate Mortgage
  const calculateMortgage = useCallback(
    async (
      propertyPrice: number,
      downPayment: number,
      annualInterestRate: number,
      amortizationPeriod: number,
      paymentSchedule: string,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/mortgage/calculate-mortgage?propertyPrice=${propertyPrice}&downPayment=${downPayment}&annualInterestRate=${annualInterestRate}&amortizationPeriod=${amortizationPeriod}&paymentSchedule=${paymentSchedule}`,
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message ||
              `Error ${response.status}: ${response.statusText}`,
          );
        }
        const data = await response.json();
        return data.data as MortgageCalculation;
      } catch (err: any) {
        setError(err.message || "Error calculating mortgage");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    fetchDownPaymentOptions,
    calculateMortgage,
    loading,
    error,
  };
};
