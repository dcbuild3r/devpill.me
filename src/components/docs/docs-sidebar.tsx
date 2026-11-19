import Link from "next/link";
import type { Page, Track } from "@/lib/content";

export function DocsSidebar({ tracks, current }: { tracks: Track[]; current: Page }) {
	const item = (page: Page, label: string) => {
		const active = page === current;
		return (
			<Link key={page.route} href={page.route} aria-current={active ? "page" : undefined} className={`-ml-px block border-l-2 px-4 py-2 text-[0.9375rem] ${active ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground hover:border-input hover:text-foreground"}`}>
				{label}
			</Link>
		);
	};

	return (
		<nav aria-label="Guide navigation" className="space-y-7">
			{tracks.map((track) => (
				<div key={track.name}>
					<p className="eyebrow mb-2 px-3 text-primary">{track.name}</p>
					{track.sections.map((section) => (
						<details key={section.page.route} open={section === current.section}>
							<summary className="flex min-h-10 cursor-pointer list-none items-center justify-between rounded px-3 py-2 text-[0.9375rem] font-semibold transition-colors hover:bg-muted [&::-webkit-details-marker]:hidden">
								{section.page.title}
								<span className="font-mono text-xs font-normal text-muted-foreground">{section.pages.length}</span>
							</summary>
							<div className="mb-2 ml-3 mt-0.5 border-l border-border">
								{item(section.page, "Overview")}
								{section.pages.map((page) => item(page, page.title))}
							</div>
						</details>
					))}
				</div>
			))}
		</nav>
	);
}
