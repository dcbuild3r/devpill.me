import { BookOpen, CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { GuideTracks } from "@/components/docs/guide-tracks";
import { TableOfContents } from "@/components/docs/toc";
import { editUrl, type Page, type Track } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

function PageList({ pages }: { pages: Page[] }) {
	return (
		<ol className="mt-10 divide-y divide-border rounded border border-border">
			{pages.map((item, index) => (
				<li key={item.route}>
					<Link href={item.route} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted">
						<span className="font-mono text-[0.8125rem] text-primary">{String(index + 1).padStart(2, "0")}</span>
						<span className="min-w-0 flex-1">
							<span className="block font-semibold text-foreground group-hover:text-primary">{item.title}</span>
							{item.description ? <span className="block text-sm text-muted-foreground">{item.description}</span> : null}
						</span>
						<span className="shrink-0 font-mono text-xs text-muted-foreground">{item.readingTime} min</span>
					</Link>
				</li>
			))}
		</ol>
	);
}

function PreviousNext({ page }: { page: Page }) {
	const card = (target: Page | undefined, label: string, className: string) =>
		target ? (
			<Link href={target.route} className={`group rounded border px-5 py-4 hover:border-primary ${className}`}>
				<span className="eyebrow block text-muted-foreground">{label}</span>
				<span className="mt-1.5 block font-semibold text-foreground group-hover:text-primary">{target.title}</span>
			</Link>
		) : <span />;

	return (
		<nav aria-label="Previous and next notes" className="mt-14 grid gap-4 sm:grid-cols-2">
			{card(page.prev, "Previous", "border-border")}
			{card(page.next, "Next", "border-primary text-right")}
		</nav>
	);
}

export function DocsPage({ page, tracks }: { page: Page; tracks: Track[] }) {
	const { section } = page;
	const isDoc = page.kind === "doc";
	const { content, headings } = renderMarkdown(page.body);
	const toc = headings.filter((heading) => heading.depth < 4);
	const position = section ? section.pages.indexOf(page) + 1 : 0;
	const updated = page.lastmod ?? page.date;

	return (
		<div className="shell py-8 lg:py-12">
			<details className="mb-6 rounded border border-border lg:hidden">
				<summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden"><BookOpen size={17} /> Browse the guide</summary>
				<div className="border-t border-border p-4"><DocsSidebar tracks={tracks} current={page} /></div>
			</details>
			<div className="grid gap-12 lg:grid-cols-[16.5rem_minmax(0,1fr)] xl:grid-cols-[16.5rem_minmax(0,1fr)_13rem]">
				<aside className="hidden lg:sticky lg:top-[6.75rem] lg:block lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
					<DocsSidebar tracks={tracks} current={page} />
				</aside>
				<article className="min-w-0 max-w-3xl">
					<nav className="flex flex-wrap items-center gap-2 font-mono text-[0.8125rem] text-muted-foreground" aria-label="Breadcrumb">
						<Link href="/docs/" className="hover:text-primary">Guide</Link>
						{section ? <><CaretRight size={11} aria-hidden="true" /><Link href={section.page.route} className="hover:text-primary">{section.page.title}</Link></> : null}
						{isDoc ? <><CaretRight size={11} aria-hidden="true" /><span className="text-foreground">{page.title}</span></> : null}
					</nav>
					<h1 className="display-face mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl">{page.kind === "docs-home" ? "The guide" : page.title}</h1>
					{page.kind === "docs-home" ? (
						<>
							<p className="mb-12 mt-4 text-xl leading-8 text-muted-foreground">Pick a track, or read it front to back starting with the introduction.</p>
							<GuideTracks tracks={tracks} />
						</>
					) : (
						<p className="mt-4 text-xl leading-8 text-muted-foreground">{page.lead || page.description}</p>
					)}
					{page.kind === "section" && section ? <PageList pages={section.pages} /> : null}
					{isDoc ? (
						<>
							<div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-3 text-sm text-muted-foreground">
								<span>{page.readingTime} min read</span>
								{updated ? <span>Updated <time dateTime={updated}>{formatDate(updated)}</time></span> : null}
								<a href={editUrl(page)} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline sm:ml-auto">Edit this page on GitHub</a>
							</div>
							<div className="markdown-content mt-8">{content}</div>
							<PreviousNext page={page} />
						</>
					) : null}
				</article>
				{isDoc && section ? (
					<aside className="hidden space-y-8 xl:sticky xl:top-[6.75rem] xl:block xl:max-h-[calc(100vh-8rem)] xl:self-start xl:overflow-y-auto">
						<div>
							<p className="eyebrow text-muted-foreground">In this section</p>
							<p className="mt-3 text-[0.9375rem] font-semibold">{section.page.title}, {position} of {section.pages.length}</p>
							<div className="mt-2.5 flex gap-1" role="img" aria-label={`Note ${position} of ${section.pages.length} in this section`}>
								{section.pages.map((item, index) => <span key={item.route} className={`h-1 flex-1 rounded-full ${index < position ? "bg-primary" : "bg-border"}`} />)}
							</div>
						</div>
						{toc.length ? <TableOfContents headings={toc} /> : null}
					</aside>
				) : null}
			</div>
		</div>
	);
}
