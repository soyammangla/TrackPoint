// "use client";

// import { useState, useMemo } from "react";
// import { BarChart3, Users, DollarSign, TrendingUp, Filter } from "lucide-react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// type AutomationReport = {
//   id: number;
//   name: string;
//   trigger: string;
//   success: number;
//   status: "Active" | "Inactive";
// };

// const AUTOMATIONS: AutomationReport[] = [
//   {
//     id: 1,
//     name: "Assign New Lead",
//     trigger: "New Lead Created",
//     success: 92,
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Deal Won Follow-up",
//     trigger: "Deal Closed Won",
//     success: 87,
//     status: "Inactive",
//   },
//   {
//     id: 3,
//     name: "Auto Reminder",
//     trigger: "No Response 3 Days",
//     success: 78,
//     status: "Active",
//   },
// ];

// export default function ReportsAnalyticsPage() {
//   const [dateRange, setDateRange] = useState("30");
//   const [statusFilter, setStatusFilter] = useState<
//     "All" | "Active" | "Inactive"
//   >("All");

//   const filteredAutomations = useMemo(() => {
//     if (statusFilter === "All") return AUTOMATIONS;
//     return AUTOMATIONS.filter((a) => a.status === statusFilter);
//   }, [statusFilter]);

//   const stats = useMemo(() => {
//     const totalLeads =
//       dateRange === "7" ? 312 : dateRange === "90" ? 2860 : 1248;
//     const dealsWon = dateRange === "7" ? 68 : dateRange === "90" ? 712 : 326;
//     const revenue =
//       dateRange === "7" ? 98000 : dateRange === "90" ? 1284000 : 482000;

//     return [
//       {
//         title: "Total Leads",
//         value: totalLeads,
//         icon: Users,
//       },
//       {
//         title: "Deals Won",
//         value: dealsWon,
//         icon: TrendingUp,
//       },
//       {
//         title: "Revenue",
//         value: `₹${revenue.toLocaleString()}`,
//         icon: DollarSign,
//       },
//       {
//         title: "Conversion Rate",
//         value: `${Math.round((dealsWon / totalLeads) * 100)}%`,
//         icon: BarChart3,
//       },
//     ];
//   }, [dateRange]);

//   return (
//     <div className="p-6 space-y-8 min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-neutral-100 transition-colors">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">Reports & Analytics</h1>
//           <p className="text-sm text-neutral-600 dark:text-neutral-400">
//             Sales, leads & automation insights
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-2">
//           <select
//             value={dateRange}
//             onChange={(e) => setDateRange(e.target.value)}
//             className="px-3 py-2 rounded-md border border-neutral-300 bg-white
//               dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
//           >
//             <option value="7">Last 7 Days</option>
//             <option value="30">Last 30 Days</option>
//             <option value="90">Last 90 Days</option>
//           </select>

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value as any)}
//             className="px-3 py-2 rounded-md border border-neutral-300 bg-white
//               dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
//           >
//             <option value="All">All Automations</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>

//           <Button
//             variant="outline"
//             className="border-neutral-300 dark:border-neutral-700"
//           >
//             <Filter size={16} />
//           </Button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <Card
//             key={stat.title}
//             className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
//           >
//             <CardContent className="p-5 space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-neutral-600 dark:text-neutral-400">
//                   {stat.title}
//                 </span>
//                 <stat.icon
//                   size={18}
//                   className="text-neutral-600 dark:text-neutral-400"
//                 />
//               </div>
//               <div className="text-2xl font-bold">{stat.value}</div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Funnel */}
//       <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
//         <CardHeader>
//           <CardTitle>Sales Funnel</CardTitle>
//         </CardHeader>
//         <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
//           <div>
//             New Leads: <b>1248</b>
//           </div>
//           <div>
//             Contacted: <b>842</b>
//           </div>
//           <div>
//             Qualified: <b>516</b>
//           </div>
//           <div>
//             Deals Won: <b>326</b>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Automation Table */}
//       <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
//         <CardHeader>
//           <CardTitle>Automation Performance</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <table className="w-full text-sm">
//             <thead className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
//               <tr>
//                 <th className="text-left py-2">Automation</th>
//                 <th className="text-left">Trigger</th>
//                 <th className="text-left">Success</th>
//                 <th className="text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredAutomations.map((a) => (
//                 <tr
//                   key={a.id}
//                   className="border-b border-neutral-200 dark:border-neutral-800
//                   hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition"
//                 >
//                   <td className="py-2">{a.name}</td>
//                   <td>{a.trigger}</td>
//                   <td>{a.success}%</td>
//                   <td
//                     className={
//                       a.status === "Active"
//                         ? "text-green-500"
//                         : "text-neutral-400"
//                     }
//                   >
//                     {a.status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Users, DollarSign, TrendingUp, Filter } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AutomationReport = {
  id: number;
  name: string;
  trigger: string;
  success: number;
  status: "Active" | "Inactive";
};

const AUTOMATIONS: AutomationReport[] = [
  {
    id: 1,
    name: "Assign New Lead",
    trigger: "New Lead Created",
    success: 92,
    status: "Active",
  },
  {
    id: 2,
    name: "Deal Won Follow-up",
    trigger: "Deal Closed Won",
    success: 87,
    status: "Inactive",
  },
  {
    id: 3,
    name: "Auto Reminder",
    trigger: "No Response 3 Days",
    success: 78,
    status: "Active",
  },
];

export default function ReportsAnalyticsPage() {
  const [dateRange, setDateRange] = useState("30");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  const [showFilters, setShowFilters] = useState(false);

  /* ---------------- FILTERED DATA ---------------- */

  const filteredAutomations = useMemo(() => {
    if (statusFilter === "All") return AUTOMATIONS;
    return AUTOMATIONS.filter((a) => a.status === statusFilter);
  }, [statusFilter]);

  /* ---------------- STATS ---------------- */

  const stats = useMemo(() => {
    const totalLeads =
      dateRange === "7" ? 312 : dateRange === "90" ? 2860 : 1248;
    const dealsWon = dateRange === "7" ? 68 : dateRange === "90" ? 712 : 326;
    const revenue =
      dateRange === "7" ? 98000 : dateRange === "90" ? 1284000 : 482000;

    return [
      {
        title: "Total Leads",
        value: totalLeads,
        icon: Users,
      },
      {
        title: "Deals Won",
        value: dealsWon,
        icon: TrendingUp,
      },
      {
        title: "Revenue",
        value: `₹${revenue.toLocaleString()}`,
        icon: DollarSign,
      },
      {
        title: "Conversion Rate",
        value: `${Math.round((dealsWon / totalLeads) * 100)}%`,
        icon: BarChart3,
      },
    ];
  }, [dateRange]);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-neutral-100 transition-colors">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Sales, leads & automation insights
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFilters((prev) => !prev)}
          className="border-neutral-300 dark:border-neutral-700"
        >
          <Filter size={16} />
        </Button>
      </div>

      {/* ---------------- FILTER PANEL ---------------- */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800
            bg-white dark:bg-neutral-900 p-4 flex flex-wrap gap-3 items-center"
          >
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 rounded-md border border-neutral-300 bg-white
              dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 rounded-md border border-neutral-300 bg-white
              dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
            >
              <option value="All">All Automations</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setDateRange("30");
                setStatusFilter("All");
                setShowFilters(false);
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- STATS ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {stat.title}
                </span>
                <stat.icon
                  size={18}
                  className="text-neutral-600 dark:text-neutral-400"
                />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ---------------- FUNNEL ---------------- */}
      <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <CardHeader>
          <CardTitle>Sales Funnel</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
          <div>
            New Leads: <b>1248</b>
          </div>
          <div>
            Contacted: <b>842</b>
          </div>
          <div>
            Qualified: <b>516</b>
          </div>
          <div>
            Deals Won: <b>326</b>
          </div>
        </CardContent>
      </Card>

      {/* ---------------- AUTOMATION TABLE ---------------- */}
      <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <CardHeader>
          <CardTitle>Automation Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
              <tr>
                <th className="text-left py-2">Automation</th>
                <th className="text-left">Trigger</th>
                <th className="text-left">Success</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAutomations.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-neutral-200 dark:border-neutral-800
                  hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition"
                >
                  <td className="py-2">{a.name}</td>
                  <td>{a.trigger}</td>
                  <td>{a.success}%</td>
                  <td
                    className={
                      a.status === "Active"
                        ? "text-green-500"
                        : "text-neutral-400"
                    }
                  >
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
