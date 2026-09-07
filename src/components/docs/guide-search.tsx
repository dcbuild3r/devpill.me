"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchPage = { title: string; description: string; route: string; section: string };

export function GuideSearch({ pages }: { pages: SearchPage[] }) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const closeSearch = () => {
		setOpen(false);
		setQuery("");
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.key === "/" || (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey))) && document.activeElement?.tagName !== "INPUT") {
				event.preventDefault();
				setOpen(true);
			}
			if (event.key === "Escape") closeSearch();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);
	const results = useMemo(() => {
		const normalized = query.trim().toLowerCase();
		if (!normalized) return pages.slice(0, 8);
		return pages.filter((page) => `${page.title} ${page.description} ${page.section}`.toLowerCase().includes(normalized)).slice(0, 12);
	}, [pages, query]);

	return (
		<>
			<Button type="button" variant="outline" className="h-10 w-full justify-between rounded bg-background px-3 text-muted-foreground" onClick={() => setOpen(true)} aria-label="Search the guide">
				<span className="inline-flex items-center gap-2"><MagnifyingGlass size={17} /> Search the guide</span>
				<kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] sm:inline">⌘ K</kbd>
			</Button>

			{open ? (
				<div className="fixed inset-0 z-[70] flex items-start justify-center bg-foreground/35 px-4 pt-[15vh]" role="dialog" aria-modal="true" aria-label="Search the guide" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
					<div className="w-full max-w-xl overflow-hidden rounded border border-border bg-background shadow-xl">
						<div className="flex items-center gap-2 border-b border-border px-4">
							<MagnifyingGlass size={19} className="text-muted-foreground" />
							<Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sections, topics, and pages..." className="h-14 border-0 px-1 text-base shadow-none focus-visible:ring-0" />
							<Button type="button" variant="ghost" size="icon" onClick={closeSearch} aria-label="Close search"><X size={18} /></Button>
						</div>
						<div className="max-h-[52vh] overflow-y-auto p-2">
							{results.length ? results.map((page) => (
								<Link key={page.route} href={page.route} onClick={closeSearch} className="block rounded px-3 py-3 no-underline transition-colors hover:bg-muted">
									<div className="flex items-center justify-between gap-3">
										<span className="font-semibold">{page.title}</span>
										<span className="eyebrow text-muted-foreground">{page.section}</span>
									</div>
									<p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{page.description || "Open this guide note"}</p>
								</Link>
							)) : <p className="px-3 py-8 text-center text-sm text-muted-foreground">No notes found. Try a broader search.</p>}
						</div>
						<div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">Press <kbd className="rounded border border-border bg-muted px-1 font-mono">Esc</kbd> to close</div>
					</div>
				</div>
			) : null}
		</>
	);
}
