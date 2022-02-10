import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants/prices";

const AppContext = createContext([] as unknown[]);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("no inside a provider");
  }
  return context;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function calculateSubtotal(optionType: string, optionCounts: any) {
  let optionCount = 0;

  const values = optionCounts[optionType].values();
  for (const count of values) {
    optionCount += count;
  }
  // @ts-ignore
  return optionCount * pricePerItem[optionType];
}

export const AppProvider: React.FC = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [totals, setTotals] = useState({
    scoops: formatCurrency(0),
    toppings: formatCurrency(0),
    grandTotal: formatCurrency(0),
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      optionType: string
    ) {
      const newOptionCounts = { ...optionCounts };
      // @ts-ignore
      const optionCountsMap = optionCounts[optionType];

      optionCountsMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    }

    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <AppContext.Provider value={value} {...props} />;
};
