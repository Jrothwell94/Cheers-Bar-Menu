"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "Menu",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M6 2v7a3 3 0 0 0 3 3v10M6 2v7M9 2v7M6 6H4.5a1 1 0 0 0-1 1v0M18 2c-1.5 0-3 1.5-3 4v4a2 2 0 0 0 2 2h1v10"
          stroke={active ? "var(--gold)" : "currentColor"}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/whats-on",
    label: "What's On",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <rect
          x="3.5"
          y="5"
          width="17"
          height="15.5"
          rx="2"
          stroke={active ? "var(--gold)" : "currentColor"}
          strokeWidth="1.6"
        />
        <path
          d="M3.5 9.5h17M8 3v3.5M16 3v3.5"
          stroke={active ? "var(--gold)" : "currentColor"}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/about",
    label: "About",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <circle
          cx="12"
          cy="12"
          r="8.5"
          stroke={active ? "var(--gold)" : "currentColor"}
          strokeWidth="1.6"
        />
        <path
          d="M12 11v5.5M12 7.8v.1"
          stroke={active ? "var(--gold)" : "currentColor"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-surface/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {tabs.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] tracking-wide"
            >
              {tab.icon(active)}
              <span className={active ? "text-gold-soft" : "text-muted"}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
