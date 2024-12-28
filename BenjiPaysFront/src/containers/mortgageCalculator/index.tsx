"use client";

import { useEffect, useRef, useReducer, useState } from "react";
import { InfoIcon, Percent } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { formatCurrency, parseCurrency } from "@/lib/utils";
import { mortgageQuery } from "@/request/MortgageQuery";
import { initialState, reducer } from "@/containers/mortgageCalculator/reducer";
import {
  handleAmortizationChange,
  handleDownPaymentChange,
  handleMortgageRateChange,
  handlePaymentFrequencyChange,
  handlePriceChange,
} from "@/containers/mortgageCalculator/service";
import { SelectBox, Input } from "@/components";
import {
  amortizationOptions,
  selectItems,
} from "@/containers/mortgageCalculator/enums";
import calculateMortgageOptions from "@/utils/mortgageCalculations";
import { calculateAll } from "@/utils/calculateAll";

export function MortgageCalculate() {
  const { fetchDownPaymentOptions, calculateMortgage } = mortgageQuery();

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    price,
    location,
    downPaymentOptions,
    cmhcInsurance,
    totalMortgage,
    amortization,
    paymentFrequency,
    mortgageRate,
    mortgagePayment,
    isLoading,
    calculationError,
  } = state;

  const debouncedPrice = useDebounce(price, 1000);
  const debouncedDownPaymentOptions = useDebounce(downPaymentOptions, 1000);
  const debouncedAmortization = useDebounce(amortization, 1000);
  const debouncedPaymentFrequency = useDebounce(paymentFrequency, 1000);
  const debouncedMortgageRate = useDebounce(mortgageRate, 1000);

  const percentageInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [localValues, setLocalValues] = useState<string[]>(
    Array(downPaymentOptions.length).fill("")
  );

  useEffect(() => {
    const fetchData = async () => {
      await calculateAll(debouncedPrice, fetchDownPaymentOptions, dispatch);
    };
    fetchData();
  }, [debouncedPrice, fetchDownPaymentOptions]);

  useEffect(() => {
    const calculate = async () => {
      await calculateMortgageOptions(
        debouncedPrice,
        debouncedDownPaymentOptions,
        debouncedMortgageRate,
        debouncedAmortization,
        debouncedPaymentFrequency,
        dispatch,
        calculateMortgage
      );
    };
    calculate();
  }, [
    debouncedPrice,
    debouncedDownPaymentOptions,
    debouncedAmortization,
    debouncedPaymentFrequency,
    debouncedMortgageRate,
    calculateMortgage,
  ]);
  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <div className="space-y-8  ">
        {/* Start Here Section */}
        {/* Price and Location Inputs */}
        <div className="border-b border-gray-200 bg-white rounded-lg shadow  p-6">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-6 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Start here</span>
              <span className="text-sm">→</span>
            </div>
            <div>
              <Input
                type="text"
                value={price}
                onChange={(event) => handlePriceChange(event, dispatch)}
                onBlur={() =>
                  dispatch({
                    type: "SET_STATE",
                    payload: {
                      price: price ? formatCurrency(parseCurrency(price)) : "",
                    },
                  })
                }
                className="w-full h-[42px] border border-gray-300 rounded px-3 text-base focus:ring-0 focus:border-gray-400"
                placeholder="Price"
              />
            </div>
            <div className="relative">
              <div className="absolute top-2 left-3 text-xs text-gray-500">
                Location
              </div>
              <Input
                type="text"
                value={location}
                onChange={(e) =>
                  dispatch({
                    type: "SET_STATE",
                    payload: { location: e.target.value },
                  })
                }
                className="w-full h-[42px] border border-gray-300 rounded px-3 pt-6 pb-1 text-base focus:ring-0 focus:border-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Down Payment Section */}
        <div className="space-y-4   bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2">
            <span className="text-xl text-gray-400">-</span>
            <span className="text-sm">Down payment</span>
            <InfoIcon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
            {downPaymentOptions.map((option, index) => (
              <div key={index} className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    value={localValues[index] || (option[0] * 100).toFixed(2)}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const newLocalValues = [...localValues];
                      newLocalValues[index] = inputValue;
                      setLocalValues(newLocalValues);
                      handleDownPaymentChange(
                        index,
                        true,
                        inputValue,
                        downPaymentOptions,
                        price,
                        dispatch
                      );
                    }}
                    onBlur={() => {
                      const newLocalValues = [...localValues];
                      newLocalValues[index] = "";
                      setLocalValues(newLocalValues);
                    }}
                    ref={(el) => {
                      if (el) percentageInputRefs.current[index] = el;
                    }}
                    className="w-full h-[42px] border border-gray-300 rounded px-3 text-base focus:ring-0 focus:border-gray-400"
                  />
                  <Percent className="absolute right-2 top-2 text-gray-500 text-sm w-4" />
                </div>
                <Input
                  type="text"
                  value={formatCurrency(option[1])}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    handleDownPaymentChange(
                      index,
                      false,
                      value,
                      downPaymentOptions,
                      price,
                      dispatch
                    );
                  }}
                  onBlur={(e) => {
                    const value = parseCurrency(e.target.value);
                    if (!isNaN(value)) {
                      handleDownPaymentChange(
                        index,
                        false,
                        value.toString(),
                        downPaymentOptions,
                        price,
                        dispatch
                      );
                    }
                  }}
                  className="w-full h-[42px] border border-gray-300 rounded px-3 text-base focus:ring-0 focus:border-gray-400 text-gray-500"
                  placeholder="$ Enter amount"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CMHC Insurance */}
        <div className="space-y-4 bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2">
            <span className="text-xl text-gray-400">+</span>
            <span className="text-sm">CMHC insurance</span>
            <InfoIcon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cmhcInsurance.map((amount, index) => (
              <div key={index} className="text-base text-[#2563EB] pl-3">
                {amount}
              </div>
            ))}
          </div>
        </div>

        {/* Total Mortgage */}
        <div className="space-y-4 bg-[#EEF4FF] border border-blue-700 py-4 px-4 rounded">
          <div className="flex items-center gap-2">
            <span className="text-xl text-gray-400">=</span>
            <span className="text-sm text-[#2563EB]">Total mortgage</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {totalMortgage.map((amount, index) => (
              <div key={index} className="text-base text-[#2563EB] pl-3">
                {amount}
              </div>
            ))}
          </div>
        </div>

        {/* Amortization */}
        <div className="space-y-4 bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2">
            <span className="text-sm">Amortization</span>
            <InfoIcon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {amortization.map((years, index) => (
              <SelectBox
                key={index}
                value={years}
                onValueChange={(value) =>
                  handleAmortizationChange(value, index, dispatch, amortization)
                }
                selectItems={amortizationOptions}
              />
            ))}
          </div>
        </div>

        {/* Mortgage Rate */}
        <div className="space-y-4 bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2">
            <span className="text-sm">Mortgage rate</span>
            <InfoIcon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {mortgageRate.map((rate, index) => (
              <div key={index}>
                <Input
                  type="text"
                  value={rate}
                  onChange={(e) =>
                    handleMortgageRateChange(
                      e.target.value,
                      index,
                      dispatch,
                      mortgageRate
                    )
                  }
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      handleMortgageRateChange(
                        `${value.toFixed(2)}%`,
                        index,
                        dispatch,
                        mortgageRate
                      );
                    }
                  }}
                  className="w-full h-[42px] border border-gray-300 rounded px-3 text-base focus:ring-0 focus:border-gray-400"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment Frequency */}
        <div className="space-y-4 bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2">
            <span className="text-sm">Payment frequency</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {paymentFrequency.map((frequency, index) => (
              <SelectBox
                key={index}
                value={frequency}
                onValueChange={(value) =>
                  handlePaymentFrequencyChange(
                    value,
                    index,
                    dispatch,
                    paymentFrequency
                  )
                }
                selectItems={selectItems}
              />
            ))}
          </div>
        </div>

        {/* Mortgage Payment */}
        <div className="space-y-4 bg-[#EEF4FF] border-blue-700 border py-4 px-4 rounded">
          <div className="flex items-center gap-2">
            <span className="text-xl text-gray-400">=</span>
            <span className="text-sm text-[#2563EB]">Mortgage payment</span>
            <InfoIcon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {mortgagePayment.map((amount, index) => (
              <div key={index} className="text-base text-[#2563EB] pl-3">
                {amount}
              </div>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="mt-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
            Calculating...
          </div>
        )}

        {calculationError && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {calculationError}
          </div>
        )}
      </div>
    </div>
  );
}
