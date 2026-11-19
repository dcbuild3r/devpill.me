"use client";

import { GithubLogo, List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PillMark } from "@/components/layout/pill-mark";
import { SiteSearch } from "@/components/layout/site-search";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { site } from "@/lib/site";

const iconButton = "inline-flex size-11 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-primary";

export function SiteHeader() {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const closeMenu = () => setMenuOpen(false);

	const links = (className: string) => (
		<>
			{site.nav.map((link) => {
				const active = pathname.startsWith(link.href);
				return (
					<Link key={link.href} href={link.href} onClick={closeMenu} aria-current={active ? "page" : undefined} className={`${className} ${active ? "font-semibold text-primary" : "text-muted-foreground hover:text-primary"}`}>
						{link.label}
					</Link>
				);
			})}
			<a href={site.repo} target="_blank" rel="noreferrer" className={`${className} text-muted-foreground hover:text-primary`}>Contribute</a>
		</>
	);

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background">
			<div className="header-bar" aria-hidden="true" />
			<nav className="shell flex min-h-[4.25rem] items-center gap-2" aria-label="Main navigation">
				<Link href="/" translate="no" onClick={closeMenu} className="mr-4 inline-flex items-center gap-2.5 font-bold text-foreground">
					<PillMark /> {site.name}
				</Link>
				<div className="hidden items-center md:flex">{links("px-3 py-3 text-[0.9375rem] font-medium transition-colors")}</div>
				<div className="ml-auto flex items-center gap-1">
					<SiteSearch />
					<a className={`${iconButton} hidden sm:inline-flex`} href={site.repo} target="_blank" rel="noreferrer" aria-label={`${site.name} on GitHub`}>
						<GithubLogo size={19} weight="bold" aria-hidden="true" />
					</a>
					<ThemeToggle className={iconButton} />
					<button type="button" className={`${iconButton} md:hidden`} onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
						{menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
					</button>
				</div>
			</nav>
			{menuOpen ? (
				<nav id="mobile-navigation" className="shell flex flex-col border-t border-border py-3 md:hidden" aria-label="Mobile navigation">
					{links("py-3 text-base font-medium")}
				</nav>
			) : null}
		</header>
	);
}
