// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";

// export type Deal = {
//   id: string;
//   name: string;
//   email?: string;
//   amount: number;
//   owner: string;
//   stage: string;
// };

// type DealsContextType = {
//   deals: Deal[];
//   addDeal: (deal: Deal) => void;
//   updateDeal: (deal: Deal) => void;
//   removeDeal: (id: string) => void;
// };

// const DealsContext = createContext<DealsContextType | undefined>(undefined);

// export function DealsProvider({ children }: { children: ReactNode }) {
//   const [deals, setDeals] = useState<Deal[]>([]);

//   const addDeal = (deal: Deal) => setDeals((prev) => [...prev, deal]);
//   const updateDeal = (deal: Deal) =>
//     setDeals((prev) => prev.map((d) => (d.id === deal.id ? deal : d)));
//   const removeDeal = (id: string) =>
//     setDeals((prev) => prev.filter((d) => d.id !== id));

//   return (
//     <DealsContext.Provider value={{ deals, addDeal, updateDeal, removeDeal }}>
//       {children}
//     </DealsContext.Provider>
//   );
// }

// export function useDeals() {
//   const ctx = useContext(DealsContext);
//   if (!ctx) throw new Error("useDeals must be used within DealsProvider");
//   return ctx;
// }

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Deal = {
  id: string;
  name: string;
  email?: string;
  amount: number;
  owner?: string;
  stage: string;
  leadId: string;
  createdAt: string;
};

// type DealsContextType = {
//   deals: Deal[];
//   addDeal: (deal: Deal) => void;
//   removeDeal: (id: string) => void;
//   setDeals: (deals: Deal[]) => void;
// };
type DealsContextType = {
  deals: Deal[];
  addDeal: (deal: Deal) => void;
  updateDeal: (deal: Deal) => void;
  removeDeal: (id: string) => void;
  setDeals: (deals: Deal[]) => void;
};

const DealsContext = createContext<DealsContextType | undefined>(undefined);

export function DealsProvider({ children }: { children: ReactNode }) {
  const [deals, setDealsState] = useState<Deal[]>([]);

  const addDeal = (deal: Deal) => setDealsState((prev) => [...prev, deal]);
  const updateDeal = (updatedDeal: Deal) =>
    setDealsState((prev) =>
      prev.map((deal) => (deal.id === updatedDeal.id ? updatedDeal : deal)),
    );

  const removeDeal = (id: string) =>
    setDealsState((prev) => prev.filter((d) => d.id !== id));

  return (
    <DealsContext.Provider
      value={{
        deals,
        addDeal,
        updateDeal,
        removeDeal,
        setDeals: setDealsState,
      }}
    >
      {children}
    </DealsContext.Provider>
  );
}

export function useDeals() {
  const context = useContext(DealsContext);
  if (!context) throw new Error("useDeals must be used within DealsProvider");
  return context;
}
