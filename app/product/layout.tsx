import { DealsProvider } from "@/context/dealscontext";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DealsProvider>{children}</DealsProvider>;
}
