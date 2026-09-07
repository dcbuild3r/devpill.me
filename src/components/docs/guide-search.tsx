"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type SearchPage = { title: string; description: string; route: string; section: string };

let searchOpen = false;
const searchListeners = new Set<() => void>();

function subscribeToSearch(listener: () => void) {
	searchListeners.add(listener);
	return () => searchListeners.delete(listener);
}

function getSearchSnapshot() {
	return searchOpen;
}

function setSearchOpen(next: boolean | ((current: boolean) => boolean)) {
	const nextValue = typeof next === "function" ? next(searchOpen) : next;
	if (nextValue === searchOpen) return;
	searchOpen = nextValue;
	searchListeners.forEach((listener) => listener());
}

function useSearchOpen() {
	return useSyncExternalStore(subscribeToSearch, getSearchSnapshot, () => false);
}

function isEditableTarget(target: EventTarget | null) {
	return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}

export function GuideSearch() {
	const open = useSearchOpen();

	return (
		<Button type="button" variant="outline" className="h-10 w-full justify-between rounded bg-background px-3 text-muted-foreground" onClick={() => setSearchOpen(true)} aria-label="Search the guide" aria-expanded={open} aria-controls="guide-search-dialog">
			<span className="inline-flex items-center gap-2"><MagnifyingGlass size={17} /> Search the guide</span>
			<kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] sm:inline">⌘ K</kbd>
		</Button>
	);
}

export function GuideSearchDialog({ pages }: { pages: SearchPage[] }) {
	const open = useSearchOpen();
	const [query, setQuery] = useState("");
	const closeSearch = () => {
		setSearchOpen(false);
		setQuery("");
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				if (getSearchSnapshot()) setQuery("");
				setSearchOpen((current) => !current);
				return;
			}
			if (event.key === "/" && !isEditableTarget(event.target)) {
				event.preventDefault();
				setSearchOpen(true);
				return;
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

	if (!open) return null;

	return (
		<div id="guide-search-dialog" className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-foreground/35 px-4 pb-4 pt-[clamp(1rem,8vh,6rem)] sm:px-6" role="dialog" aria-modal="true" aria-label="Search the guide" onPointerDown={(event) => { if (event.target === event.currentTarget) closeSearch(); }}>
			<div className="mx-auto w-full max-w-xl overflow-hidden rounded border border-border bg-background shadow-xl">
				<div className="search-field flex items-center gap-3 border-b border-border px-4 py-3 focus-within:border-ring/70 focus-within:ring-2 focus-within:ring-ring/20">
					<MagnifyingGlass size={19} className="shrink-0 text-muted-foreground" aria-hidden="true" />
					<Input autoFocus name="guide-search" autoComplete="off" aria-label="Search sections, topics, and pages" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sections, topics, and pages…" className="search-input h-11 rounded-none border-0 bg-transparent px-1 text-base shadow-none focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none" />
					<Button type="button" variant="ghost" size="icon" className="shrink-0" onClick={closeSearch} aria-label="Close search"><X size={18} aria-hidden="true" /></Button>
				</div>
				<div className="max-h-[calc(100dvh-11rem)] overflow-y-auto overscroll-contain p-2">
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
	);
}
