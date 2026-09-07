import { ArrowUpRight, CalendarBlank, CaretRight, Notebook } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkdownContent } from "@/components/content/markdown-content";
import { SiteShell } from "@/components/layout/site-shell";
import { getReadingTime, type ContentPage } from "@/lib/content";

function formattedDate(value?: string) {
	if (!value) return "Undated";
	return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(new Date(value));
}

function PostMeta({ page }: { page: ContentPage }) {
	return <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1.5"><CalendarBlank size={14} /> {formattedDate(page.date)}</span><span>{getReadingTime(page.body)} min read</span>{page.contributors.map((contributor) => <a key={contributor} href="https://dcbuilder.dev" target="_blank" rel="noreferrer" className="font-semibold text-cyan hover:text-signal">{contributor}</a>)}</div>;
}

export function BlogIndex({ posts }: { posts: ContentPage[] }) {
	return (
		<SiteShell>
			<main id="main-content" className="site-grid relative overflow-hidden">
				<div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
					<div className="max-w-3xl"><Badge variant="outline" className="mb-5 gap-1.5 border-cyan/40 bg-accent text-accent-foreground"><Notebook size={14} weight="bold" /> Field notes</Badge><h1 className="display-face text-5xl font-extrabold leading-[0.95] sm:text-7xl">Thoughts from the trail.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Announcements, learning notes, and breadcrumbs from building in the open.</p></div>
					<div className="mt-14 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">{posts.map((post) => <article key={post.route} className="group p-5 transition-colors hover:bg-muted sm:p-7"><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div className="max-w-2xl"><PostMeta page={post} /><Link href={post.route} className="block"><h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] group-hover:text-cyan sm:text-3xl">{post.title}</h2><p className="mt-3 text-base leading-7 text-muted-foreground">{post.lead || post.description}</p></Link></div><Link href={post.route} aria-label={`Read ${post.title}`} className="self-start"><CaretRight size={22} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-signal" /></Link></div></article>)}</div>
				</div>
			</main>
		</SiteShell>
	);
}

export function BlogPost({ page }: { page: ContentPage }) {
	return (
		<SiteShell>
			<main id="main-content" className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-20 lg:px-12"><article className="mx-auto max-w-3xl"><Link href="/blog/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><ArrowUpRight className="rotate-[-135deg]" size={15} /> Back to notes</Link><div className="mt-12"><Badge variant="outline" className="mb-5 border-cyan/40 bg-accent text-accent-foreground">Field note</Badge><h1 className="display-face text-5xl font-extrabold leading-[0.96] sm:text-7xl">{page.title}</h1>{page.lead ? <p className="mt-6 text-xl leading-8 text-muted-foreground">{page.lead}</p> : null}<div className="mt-6"><PostMeta page={page} /></div></div><div className="mt-12 border-t border-border pt-10"><MarkdownContent source={page.body} /></div></article></main>
		</SiteShell>
	);
}

export function ContributorIndex({ contributors }: { contributors: ContentPage[] }) {
	return (
		<SiteShell>
			<main id="main-content" className="mx-auto max-w-[900px] px-5 py-16 sm:px-8 sm:py-24"><Badge variant="outline" className="mb-5 border-cyan/40 bg-accent text-accent-foreground">Contributors</Badge><h1 className="display-face text-5xl font-extrabold leading-none sm:text-7xl">People behind the pills.</h1><div className="mt-12 grid gap-4 sm:grid-cols-2">{contributors.map((contributor) => <Card key={contributor.route} className="border-border bg-card transition-colors hover:border-signal/60"><CardHeader><CardTitle className="text-xl">{contributor.title}</CardTitle></CardHeader><CardContent><p className="text-sm leading-6 text-muted-foreground">{contributor.description}</p><Link href={contributor.route} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:text-signal">Read profile <ArrowUpRight size={15} /></Link></CardContent></Card>)}</div></main>
		</SiteShell>
	);
}

export function ContributorPage({ page }: { page: ContentPage }) {
	return (
		<SiteShell>
			<main id="main-content" className="mx-auto max-w-[900px] px-5 py-16 sm:px-8 sm:py-24"><Link href="/contributors/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">← Contributors</Link><article className="mt-12"><Badge variant="outline" className="mb-5 border-signal/40 bg-signal-soft/40 text-signal">Author</Badge><h1 className="display-face text-5xl font-extrabold leading-none sm:text-7xl"><a href="https://dcbuilder.dev" target="_blank" rel="noreferrer" className="hover:text-cyan">{page.title}</a></h1><div className="mt-10 max-w-2xl"><MarkdownContent source={page.body} /></div></article></main>
		</SiteShell>
	);
}

export function GenericContentPage({ page }: { page: ContentPage }) {
	return <SiteShell><main id="main-content" className="mx-auto max-w-[900px] px-5 py-16 sm:px-8 sm:py-24"><article><Badge variant="outline" className="mb-5">Page</Badge><h1 className="display-face text-5xl font-extrabold leading-none sm:text-7xl">{page.title}</h1>{page.lead || page.description ? <p className="mt-6 max-w-2xl text-xl leading-8 text-muted-foreground">{page.lead || page.description}</p> : null}<div className="mt-12"><MarkdownContent source={page.body} /></div></article></main></SiteShell>;
}
