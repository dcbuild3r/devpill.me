import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<a href="#main-content" className="skip-link">Skip to main content</a>
			<SiteHeader />
			{children}
			<SiteFooter />
		</div>
	);
}
