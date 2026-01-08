"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

type ProtectedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function ProtectedLink({
  href,
  children,
  className = "",
}: ProtectedLinkProps) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    if (status !== "authenticated") {
      e.preventDefault();
      router.push(`/login?callbackUrl=${pathname}`);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
