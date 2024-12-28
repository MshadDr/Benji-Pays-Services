type DownPaymentOption = [number, number];

export const initialState = {
  price: "",
  location: "North Vancouver, BC",
  downPaymentOptions: [] as DownPaymentOption[],
  cmhcInsurance: Array(4).fill("$-"),
  totalMortgage: Array(4).fill("$-"),
  amortization: Array(4).fill("25"),
  paymentFrequency: Array(4).fill("monthly"),
  mortgageRate: Array(4).fill("4.14"),
  mortgagePayment: Array(4).fill("$-"),
  isLoading: false,
  calculationError: null as string | null,
};

export type State = typeof initialState;
export type Action = { type: string; payload: any };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
