// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";

// export type Deal = {
//   id: string;
//   name: string;
//   email?: string;
//   amount: number;
//   owner?: string;
//   stage: string;
//   leadId: string;
//   createdAt: string;
// };

// type DealsContextType = {
//   deals: Deal[];
//   addDeal: (deal: Deal) => void;
//   updateDeal: (deal: Deal) => void;
//   removeDeal: (id: string) => void;
//   setDeals: (deals: Deal[]) => void;
// };

// const DealsContext = createContext<DealsContextType | undefined>(undefined);

// export function DealsProvider({ children }: { children: ReactNode }) {
//   const [deals, setDealsState] = useState<Deal[]>([]);

//   // Initial fetch on mount
//   useEffect(() => {
//     const fetchDeals = async () => {
//       try {
//         const res = await fetch("/api/deals");
//         if (!res.ok) throw new Error("Failed to fetch deals");
//         const data: Deal[] = await res.json();
//         setDealsState(data);
//       } catch (err) {
//         console.error("Fetch deals error:", err);
//       }
//     };
//     fetchDeals();
//   }, []);

//   const addDeal = (deal: Deal) => setDealsState((prev) => [...prev, deal]);

//   const updateDeal = async (updatedDeal: Deal) => {
//     try {
//       const res = await fetch(`/api/deals/${updatedDeal.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedDeal),
//       });
//       if (!res.ok) throw new Error("Update failed");
//       const data: Deal = await res.json();
//       setDealsState((prev) => prev.map((d) => (d.id === data.id ? data : d)));
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };

//   const removeDeal = async (id: string) => {
//     try {
//       const res = await fetch(`/api/deals/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Delete failed");
//       setDealsState((prev) => prev.filter((d) => d.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   return (
//     <DealsContext.Provider
//       value={{
//         deals,
//         addDeal,
//         updateDeal,
//         removeDeal,
//         setDeals: setDealsState,
//       }}
//     >
//       {children}
//     </DealsContext.Provider>
//   );
// }

// export function useDeals() {
//   const context = useContext(DealsContext);
//   if (!context) throw new Error("useDeals must be used within DealsProvider");
//   return context;
// }

"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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

  // Initial fetch on mount
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch("/api/deals");
        const data: Deal[] = res.ok ? await res.json() : [];
        setDealsState(data); // fallback empty array
      } catch (err) {
        console.error("Fetch deals error:", err);
        setDealsState([]); // fallback empty array
      }
    };
    fetchDeals();
  }, []);

  const addDeal = (deal: Deal) => setDealsState((prev) => [...prev, deal]);

  const updateDeal = async (updatedDeal: Deal) => {
    try {
      const res = await fetch(`/api/deals/${updatedDeal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDeal),
      });
      if (!res.ok) throw new Error("Update failed");
      const data: Deal = await res.json();
      setDealsState((prev) => prev.map((d) => (d.id === data.id ? data : d)));
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const removeDeal = async (id: string) => {
    try {
      const res = await fetch(`/api/deals/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setDealsState((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

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
