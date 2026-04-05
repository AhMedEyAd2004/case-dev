"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS_WHEN_AUTH = [
  { label: "Logout", link: "/home" },
  { label: "Dashboard ✨", link: "/dashboard" },
];
const TABS_WHEN_NOT_AUTH = [
  { label: "Sign up", link: "/sign-up" },
  { label: "Login", link: "/sign-in" },
];

export default function NavbarTabs() {
  const { data: session, isPending, isRefetching } = authClient.useSession();
  const pathname = usePathname();
  const tabsToDisplay = session ? [...TABS_WHEN_AUTH] : [...TABS_WHEN_NOT_AUTH];

  if (pathname === TABS_WHEN_AUTH[1].link) tabsToDisplay.pop();
  return (
    <ul className="flex gap-4 text-xs">
      {isPending || isRefetching ? (
        <Loader2 className="size-4 animate-spin text-green-600" />
      ) : (
        tabsToDisplay.map((t, index) => (
          <li key={index} className="px-3">
            <Link
              href={t.link}
              onClick={
                t.label === "Logout"
                  ? async (e) => {
                      e.preventDefault();
                      await authClient.signOut();
                    }
                  : undefined
              }
            >
              {t.label}
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}
