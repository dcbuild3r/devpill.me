import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { HeroCapsule } from "./hero-capsule";
import { GuideTracks } from "@/components/docs/guide-tracks";
import { Button } from "@/components/ui/button";
import type { Content, Page } from "@/lib/content";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function Home({ page, content }: { page: Page; content: Content }) {
	const { sections, tracks, posts } = content;
	const start = sections[0];
	const noteCount = sections.reduce((sum, section) => sum + section.pages.length, 0);
	const stats = [["Sections", sections.length], ["Notes", noteCount], ["Price", "Free"]];

	return (
		<>
			<section className="border-b border-border">
				<div className="shell flex flex-col gap-12 py-14 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
					<div className="min-w-0 flex-1">
						<p className="eyebrow text-primary">Public good · open source</p>
						<h1 className="display-face mt-5 max-w-2xl text-5xl font-bold leading-[1.08] sm:text-6xl">The blockchain development guide</h1>
						<p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">{page.lead}</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Button asChild className="h-12 gap-2 px-6 text-base font-semibold">
								<Link href={start.pages[0].route}>Start with the {start.pages[0].title.toLowerCase()} <ArrowRight weight="bold" /></Link>
							</Button>
							<Button asChild variant="outline" className="h-12 border-input px-6 text-base font-semibold">
								<Link href="/docs/">Browse all {sections.length} sections</Link>
							</Button>
						</div>
						<dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
							{stats.map(([label, value]) => (
								<div key={label}>
									<dt className="eyebrow text-muted-foreground">{label}</dt>
									<dd className="mt-1 text-3xl font-bold tracking-[-0.03em]">{value}</dd>
								</div>
							))}
						</dl>
					</div>
					<HeroCapsule />
				</div>
			</section>

			<section className="shell py-14 lg:py-20">
				<h2 className="display-face text-4xl font-bold">The guide</h2>
				<p className="mb-12 mt-3 max-w-2xl text-lg leading-7 text-muted-foreground">{sections.length} sections in {tracks.length} tracks. Read the foundations first, then follow the specialization that fits what you want to build.</p>
				<GuideTracks tracks={tracks} />
			</section>

			<section className="border-t border-border">
				<div className="shell flex flex-col gap-12 py-14 lg:flex-row lg:gap-16 lg:py-20">
					<div className="min-w-0 flex-1">
						<div className="flex items-baseline justify-between gap-4">
							<h2 className="display-face text-3xl font-bold">Announcements</h2>
							<Link href="/blog/" className="text-[0.9375rem] font-semibold text-primary hover:underline">All announcements</Link>
						</div>
						<ul className="mt-5 border-t border-border">
							{posts.slice(0, 3).map((post) => (
								<li key={post.route}>
									<Link href={post.route} className="group flex flex-col gap-x-6 gap-y-1 border-b border-border py-4 sm:flex-row sm:items-baseline">
										{post.date ? <time dateTime={post.date} className="w-28 shrink-0 font-mono text-[0.8125rem] text-muted-foreground">{formatDate(post.date, "short")}</time> : null}
										<span>
											<span className="block font-semibold text-foreground group-hover:text-primary">{post.title}</span>
											<span className="block text-[0.9375rem] text-muted-foreground">{post.description}</span>
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="w-full rounded border border-border bg-accent p-8 lg:max-w-md">
						<p className="eyebrow text-primary">Community-sourced</p>
						<h2 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.02em]">Know a resource that belongs here?</h2>
						<p className="mt-3 text-base leading-7 text-muted-foreground">Every page is a Markdown file. Open a pull request or start an issue and help keep the guide current.</p>
						<Button asChild className="mt-6 h-11 bg-foreground px-5 text-[0.9375rem] font-semibold text-background hover:bg-foreground/85">
							<a href={site.repo} target="_blank" rel="noreferrer">Contribute on GitHub</a>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
