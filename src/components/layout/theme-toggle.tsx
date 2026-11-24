"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

export function ThemeToggle({ className }: { className: string }) {
	const { resolvedTheme, setTheme } = useTheme();

	// Both icons render and CSS picks one, because the theme is unknown during server rendering.
	return (
		<button type="button" className={className} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label="Toggle dark mode">
			<Sun weight="bold" size={18} aria-hidden="true" className="hidden dark:block" />
			<Moon weight="bold" size={18} aria-hidden="true" className="dark:hidden" />
		</button>
	);
}
