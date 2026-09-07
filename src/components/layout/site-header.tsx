"use client";

import { ArrowUpRight, GithubLogo, List, TwitterLogo, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const links = [
	{ href: "/docs/introduction/foreword/", label: "Guide" },
	{ href: "/blog/", label: "Announcements" },
];

function activeLink(pathname: string, href: string) {
	return href === "/blog/" ? pathname.startsWith("/blog") : pathname.startsWith("/docs");
}

export function SiteHeader() {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background">
			<div className="header-bar" aria-hidden="true" />
			<nav className="mx-auto flex min-h-[4.25rem] max-w-[1320px] items-center px-5 sm:px-8 lg:px-12" aria-label="Main navigation">
				<Link href="/" translate="no" className="focus-ring mr-auto font-bold text-foreground no-underline" onClick={() => setMenuOpen(false)}>
					devpill.me <span className="font-normal text-muted-foreground">(👨‍💻,💊)</span>
				</Link>

				<div className="hidden items-center md:flex">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							aria-current={activeLink(pathname, link.href) ? "page" : undefined}
							className={`focus-ring px-3 py-2 text-sm font-medium no-underline transition-colors ${activeLink(pathname, link.href) ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
						>
							{link.label}
						</Link>
					))}
				</div>

				<div className="hidden items-center md:flex">
					<a className="focus-ring inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-primary" href="https://dcbuilder.dev" target="_blank" rel="noreferrer">
						About the author <ArrowUpRight size={14} weight="bold" />
					</a>
					<a className="focus-ring inline-flex size-9 items-center justify-center text-muted-foreground no-underline transition-colors hover:text-primary" href="https://github.com/dcbuild3r/devpill.me" target="_blank" rel="noreferrer" aria-label="devpill.me on GitHub">
						<GithubLogo size={18} weight="bold" aria-hidden="true" />
					</a>
					<a className="focus-ring inline-flex size-9 items-center justify-center text-muted-foreground no-underline transition-colors hover:text-primary" href="https://twitter.com/devpillme" target="_blank" rel="noreferrer" aria-label="devpill.me on Twitter">
						<TwitterLogo size={18} weight="bold" aria-hidden="true" />
					</a>
					<ThemeToggle />
				</div>

				<div className="ml-2 flex items-center md:hidden">
					<ThemeToggle />
					<Button type="button" variant="ghost" size="icon" className="rounded" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
						{menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
					</Button>
				</div>
			</nav>

			{menuOpen ? (
				<div id="mobile-navigation" className="border-t border-border bg-background px-5 py-4 md:hidden">
					<nav className="mx-auto flex max-w-[1320px] flex-col" aria-label="Mobile navigation">
						{links.map((link) => (
							<Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="px-3 py-3 text-base font-semibold no-underline hover:text-primary">
								{link.label}
							</Link>
						))}
						<a href="https://dcbuilder.dev" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 border-t border-border px-3 pt-4 text-sm font-semibold text-primary no-underline">
							About the author <ArrowUpRight size={14} weight="bold" />
						</a>
						<a href="https://github.com/dcbuild3r/devpill.me" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground no-underline">
							<GithubLogo size={17} weight="bold" aria-hidden="true" /> GitHub
						</a>
						<a href="https://twitter.com/devpillme" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground no-underline">
							<TwitterLogo size={17} weight="bold" aria-hidden="true" /> Twitter
						</a>
					</nav>
				</div>
			) : null}
		</header>
	);
}
