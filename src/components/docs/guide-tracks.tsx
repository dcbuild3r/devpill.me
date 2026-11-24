import Link from "next/link";
import type { Track } from "@/lib/content";

export function GuideTracks({ tracks }: { tracks: Track[] }) {
	return (
		<div className="space-y-12">
			{tracks.map((track) => (
				<section key={track.name} aria-label={track.name}>
					<h3 className="eyebrow text-primary">{track.name}</h3>
					<div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{track.sections.map((section) => (
							<Link key={section.page.route} href={section.page.route} className="group flex min-h-36 flex-col rounded border border-border p-5 transition-colors hover:border-primary">
								<span className="flex justify-between font-mono text-[0.8125rem] text-muted-foreground">
									<span>{String(section.number).padStart(2, "0")}</span>
									<span>{section.pages.length} notes</span>
								</span>
								<span className="mt-4 text-xl font-bold tracking-[-0.02em] text-foreground group-hover:text-primary">{section.page.title}</span>
								<span className="mt-1.5 text-[0.9375rem] leading-[1.45] text-muted-foreground">{section.page.description}</span>
							</Link>
						))}
					</div>
				</section>
			))}
		</div>
	);
}
