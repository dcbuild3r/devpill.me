"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { search, type SearchEntry } from "@/lib/search";

function isEditable(target: EventTarget | null) {
	return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}

export function SiteSearch() {
	const router = useRouter();
	const dialog = useRef<HTMLDialogElement>(null);
	const requested = useRef(false);
	const [entries, setEntries] = useState<SearchEntry[] | null>(null);
	const [loadError, setLoadError] = useState(false);
	const [query, setQuery] = useState("");
	const [active, setActive] = useState(0);
	const results = entries ? search(entries, query) : [];

	const load = useCallback(async () => {
		if (requested.current) return;
		requested.current = true;
		setLoadError(false);
		try {
			const response = await fetch("/search.json");
			if (!response.ok) throw new Error("Search index unavailable");
			const entries: SearchEntry[] = await response.json();
			setEntries(entries);
		} catch {
			requested.current = false;
			setLoadError(true);
		}
	}, []);
	const open = useCallback(() => {
		void load();
		if (!dialog.current?.open) dialog.current?.showModal();
	}, [load]);
	const close = useCallback(() => dialog.current?.close(), []);
	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const isShortcut = event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
			if (!isShortcut && !(event.key === "/" && !isEditable(event.target))) return;
			event.preventDefault();
			if (isShortcut && dialog.current?.open) close();
			else open();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [close, open]);

	const onInputKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			const step = event.key === "ArrowDown" ? 1 : -1;
			if (!results.length) return;
			const next = (active + step + results.length) % results.length;
			setActive(next);
			document.getElementById(`search-result-${next}`)?.scrollIntoView({ block: "nearest" });
		} else if (event.key === "Enter" && results[active]) {
			router.push(results[active].route);
			close();
		}
	};

	return (
		<>
			<button type="button" onClick={open} onPointerEnter={load} onFocus={load} aria-label="Search the guide" className="inline-flex h-11 items-center justify-between gap-3 rounded border-input px-3 text-sm text-muted-foreground transition-colors hover:text-foreground max-lg:w-11 max-lg:justify-center lg:w-64 lg:border">
				<span className="inline-flex items-center gap-2"><MagnifyingGlass size={18} aria-hidden="true" /><span className="max-lg:hidden">Search the guide</span></span>
				<kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] max-lg:hidden">⌘K</kbd>
			</button>
			<dialog
				ref={dialog}
				aria-label="Search the guide"
				className="search-dialog"
				onClose={() => {
					setQuery("");
					setActive(0);
				}}
				onClick={(event) => {
					if (event.target === event.currentTarget) close();
				}}
			>
				<div className="flex items-center gap-3 border-b border-border px-4">
					<MagnifyingGlass size={19} className="shrink-0 text-muted-foreground" aria-hidden="true" />
					<input
						autoFocus
						role="combobox"
						aria-expanded="true"
						aria-controls="search-results"
						aria-activedescendant={results[active] ? `search-result-${active}` : undefined}
						aria-label="Search sections, topics, and pages"
						autoComplete="off"
						value={query}
						onChange={(event) => {
							setQuery(event.target.value);
							setActive(0);
						}}
						onKeyDown={onInputKeyDown}
						placeholder="Search sections, topics, and pages…"
						className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
					/>
					<button type="button" onClick={close} aria-label="Close search" className="inline-flex size-11 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground">
						<X size={18} aria-hidden="true" />
					</button>
				</div>
				<div id="search-results" role="listbox" aria-label="Results" className="max-h-[min(26rem,calc(100dvh-12rem))] overflow-y-auto overscroll-contain p-2">
					{results.map((entry, index) => (
						<Link key={entry.route} id={`search-result-${index}`} role="option" aria-selected={index === active} href={entry.route} onClick={close} onPointerMove={() => setActive(index)} className={`block rounded px-3 py-3 ${index === active ? "bg-muted" : ""}`}>
							<span className="flex items-baseline justify-between gap-3">
								<span className="min-w-0 break-words font-semibold text-foreground">{entry.title}</span>
								<span className="eyebrow shrink-0 text-muted-foreground">{entry.group}</span>
							</span>
							{entry.description ? <span className="mt-0.5 line-clamp-1 block text-sm text-muted-foreground">{entry.description}</span> : null}
						</Link>
					))}
				</div>
				{results.length === 0 && (
					<div className="px-3 pb-8 pt-4 text-center text-sm text-muted-foreground">
						<p role="status">
							{loadError ? "Could not load the guide. Try again." : entries ? "No notes found. Try a broader search." : "Loading the guide…"}
						</p>
						{loadError && <button type="button" onClick={load} className="mt-2 min-h-11 px-3 font-semibold text-primary underline">Retry</button>}
					</div>
				)}
			</dialog>
		</>
	);
}
