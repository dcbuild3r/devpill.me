"use client";

import { ArrowUpRight, GithubLogo, List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const links = [
	{ href: "/docs/introduction/foreword/", label: "Guide" },
	{ href: "/blog/", label: "Notes" },
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
		<header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
			<div className="mx-auto flex h-[4.25rem] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
				<Link href="/" className="focus-ring group flex items-center gap-2 rounded-full" onClick={() => setMenuOpen(false)}>
					<span className="flex size-8 items-center justify-center rounded-full bg-primary text-base shadow-sm transition-transform group-hover:-rotate-6">
						💊
					</span>
					<span className="text-[0.98rem] font-extrabold tracking-[-0.04em]">devpill.me</span>
					<span className="hidden text-sm text-muted-foreground sm:inline">(👨‍💻,💊)</span>
				</Link>

				<nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							aria-current={activeLink(pathname, link.href) ? "page" : undefined}
							className={`focus-ring rounded-full px-3 py-2 text-sm font-medium transition-colors ${activeLink(pathname, link.href) ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="hidden items-center gap-1 md:flex">
					<a className="focus-ring inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" href="https://dcbuilder.dev" target="_blank" rel="noreferrer">
						About the author <ArrowUpRight size={14} weight="bold" />
					</a>
					<a className="focus-ring inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" href="https://github.com/dcbuild3r/devpill.me" target="_blank" rel="noreferrer" aria-label="devpill.me on GitHub">
						<GithubLogo size={18} weight="bold" />
					</a>
					<ThemeToggle />
				</div>

				<div className="flex items-center gap-1 md:hidden">
					<ThemeToggle />
					<Button type="button" variant="ghost" size="icon" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
						{menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
					</Button>
				</div>
			</div>

			{menuOpen ? (
				<div id="mobile-navigation" className="border-t border-border bg-background px-5 py-5 md:hidden">
					<nav className="mx-auto flex max-w-[1440px] flex-col gap-1" aria-label="Mobile navigation">
						{links.map((link) => (
							<Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-muted">
								{link.label}
							</Link>
						))}
						<a href="https://dcbuilder.dev" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 border-t border-border px-4 pt-4 text-sm font-semibold text-cyan">
							About the author <ArrowUpRight size={14} weight="bold" />
						</a>
						<a href="https://github.com/dcbuild3r/devpill.me" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
							<GithubLogo size={17} weight="bold" /> GitHub
						</a>
					</nav>
				</div>
			) : null}
		</header>
	);
}
