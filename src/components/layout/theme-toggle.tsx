"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// The theme is only available after hydration, preventing an icon mismatch.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	if (!mounted) return <div className="size-9" aria-hidden="true" />;

	const isDark = resolvedTheme === "dark";

	return (
		<button
			type="button"
			className="focus-ring inline-flex size-9 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			aria-pressed={isDark}
		>
			{isDark ? <Sun weight="bold" size={17} /> : <Moon weight="bold" size={17} />}
		</button>
	);
}
