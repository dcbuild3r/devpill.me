import { ArrowLeft, ArrowRight, BookOpen, CaretRight, Clock, Hash } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { MarkdownContent } from "@/components/content/markdown-content";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { SiteShell } from "@/components/layout/site-shell";
import { getReadingTime, getTableOfContents, type ContentPage, type DocSection } from "@/lib/content";

function flattenNavigation(navigation: DocSection[]) {
	return navigation.flatMap((section) => [
		{ ...section.items[0], route: section.route, title: section.title },
		...section.items,
	].filter(Boolean));
}

function SectionCards({ pages, label = "Inside this section" }: { pages: ContentPage[]; label?: string }) {
	return (
		<section className="mt-10">
			<div className="mb-3 flex items-center gap-2"><span className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{label}</span><span className="h-px flex-1 bg-border" /></div>
			<div className="divide-y divide-border overflow-hidden rounded border border-border bg-card">
				{pages.map((item) => (
					<Link key={item.route} href={item.route} className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted sm:px-6">
						<div><h3 className="font-semibold tracking-[-0.02em] group-hover:text-primary">{item.title}</h3>{item.description ? <p className="mt-1 text-sm text-muted-foreground">{item.description}</p> : null}</div>
						<CaretRight size={18} className="shrink-0 text-muted-foreground group-hover:text-primary" />
					</Link>
				))}
			</div>
		</section>
	);
}

function GuideOverview({ navigation }: { navigation: DocSection[] }) {
	return (
		<div className="mt-10 grid gap-3 sm:grid-cols-2">
			{navigation.map((section, index) => (
				<Link key={section.route} href={section.route} className="group rounded border border-border bg-card p-5 transition-colors hover:border-primary">
					<div className="flex items-start justify-between gap-4"><span className="font-mono text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span><CaretRight size={18} className="text-muted-foreground group-hover:text-primary" /></div>
					<h2 className="mt-5 text-lg font-bold tracking-[-0.02em] group-hover:text-primary">{section.title}</h2>
					<p className="mt-2 text-sm leading-6 text-muted-foreground">{section.items.length} notes to explore.</p>
				</Link>
			))}
		</div>
	);
}

function TableOfContents({ items }: { items: ReturnType<typeof getTableOfContents> }) {
	if (!items.length) return null;
	return (
		<aside className="hidden xl:block xl:sticky xl:top-[7.25rem] xl:self-start">
			<div className="border-l border-border pl-5">
				<div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground"><Hash size={13} weight="bold" /> On this page</div>
				<nav className="space-y-2" aria-label="On this page">
					{items.map((item) => <a key={`${item.id}-${item.depth}`} href={`#${item.id}`} className={`block text-sm leading-5 text-muted-foreground hover:text-foreground ${item.depth === 3 ? "pl-3 text-xs" : ""}`}>{item.title}</a>)}
				</nav>
			</div>
		</aside>
	);
}

function PreviousNext({ page, navigation }: { page: ContentPage; navigation: DocSection[] }) {
	const pages = flattenNavigation(navigation);
	const currentIndex = pages.findIndex((item) => item?.route === page.route);
	const previous = currentIndex > 0 ? pages[currentIndex - 1] : undefined;
	const next = currentIndex >= 0 ? pages[currentIndex + 1] : undefined;

	return (
		<div className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
			{previous ? <Link href={previous.route} className="group rounded border border-border bg-card p-4 hover:border-primary"><span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground"><ArrowLeft size={13} /> Previous</span><span className="mt-2 block font-semibold group-hover:text-primary">{previous.title}</span></Link> : <div />}
			{next ? <Link href={next.route} className="group rounded border border-border bg-card p-4 text-right hover:border-primary"><span className="flex items-center justify-end gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">Next <ArrowRight size={13} /></span><span className="mt-2 block font-semibold group-hover:text-primary">{next.title}</span></Link> : <div />}
		</div>
	);
}

export function DocsPage({ page, pages, navigation }: { page: ContentPage; pages: ContentPage[]; navigation: DocSection[] }) {
	const toc = getTableOfContents(page.body);
	const segments = page.route.split("/").filter(Boolean);
	const isDocsHome = page.route === "/docs/";
	const section = segments[1] ? navigation.find((item) => item.route === `/docs/${segments[1]}/`) : undefined;
	const isSectionOverview = Boolean(section && page.route === section.route);

	return (
		<SiteShell>
			<main id="main-content" className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
				<div className="mb-5 lg:hidden"><details className="rounded border border-border bg-card"><summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden"><BookOpen size={17} /> Browse the guide</summary><div className="border-t border-border p-4"><DocsSidebar navigation={navigation} pages={pages} currentRoute={page.route} /></div></details></div>
				<div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)_14rem]">
					<div className="hidden lg:block"><DocsSidebar navigation={navigation} pages={pages} currentRoute={page.route} /></div>
					<article className="min-w-0">
						<nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb"><Link href="/docs/" className="no-underline hover:text-primary">Guide</Link><CaretRight size={13} />{section ? <><Link href={section.route} className="no-underline hover:text-primary">{section.title}</Link><CaretRight size={13} /></> : null}<span className="truncate text-foreground">{page.title}</span></nav>
						<div className="max-w-3xl">
							<h1 className="display-face mt-0 text-4xl font-bold leading-tight sm:text-5xl">{page.title}</h1>
							{page.lead ? <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{page.lead}</p> : page.description && (isDocsHome || isSectionOverview) ? <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{page.description}</p> : null}
							{!isDocsHome && !isSectionOverview && page.body ? <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Clock size={14} /> {getReadingTime(page.body)} min read</div> : null}
							{isDocsHome ? <GuideOverview navigation={navigation} /> : isSectionOverview && section ? <SectionCards pages={section.items} /> : <div className="mt-10"><MarkdownContent source={page.body} /></div>}
							{!isDocsHome && !isSectionOverview ? <PreviousNext page={page} navigation={navigation} /> : null}
						</div>
					</article>
					<TableOfContents items={toc} />
				</div>
			</main>
		</SiteShell>
	);
}
