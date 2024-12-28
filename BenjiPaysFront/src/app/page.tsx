import React, { Suspense } from "react";
import { MortgageCalculate } from "@/containers/mortgageCalculator";

// Fallback component to show while MortgageCalculate is loading
const Fallback = () => <div>Loading...</div>;

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Suspense fallback={<Fallback />}>
          <MortgageCalculate />
        </Suspense>
      </div>
    </main>
  );
}
