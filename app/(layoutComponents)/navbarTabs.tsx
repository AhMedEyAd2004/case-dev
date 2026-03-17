"use client";

import { authClient } from "@/lib/auth/auth-client";
import Link from "next/link";

const TABS_WHEN_AUTH = [{ label: "Logout", link: "/home" }];
const TABS_WHEN_NOT_AUTH = [
  { label: "Sign up", link: "/sign-up" },
  { label: "Login", link: "/sign-in" },
];

export default function NavbarTabs() {
  const { data: session, isPending, isRefetching } = authClient.useSession();
  const tabsToDisplay = session ? TABS_WHEN_AUTH : TABS_WHEN_NOT_AUTH;

  return (
    <ul className="flex gap-4 text-xs">
      {tabsToDisplay.map((t, index) => (
        <li key={index} className="px-3">
          {isPending || isRefetching ? (
            <div className="h-6 w-12 animate-pulse rounded bg-gray-200" />
          ) : (
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
          )}
        </li>
      ))}
    </ul>
  );
}
