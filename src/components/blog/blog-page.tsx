import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkdownContent } from "@/components/content/markdown-content";
import { SiteShell } from "@/components/layout/site-shell";
import { getReadingTime, type ContentPage } from "@/lib/content";

function formattedDate(value?: string) {
	if (!value) return "Undated";
	return new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "Europe/Prague" }).format(new Date(value));
}

function PostMeta({ page }: { page: ContentPage }) {
	return (
		<p className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-muted-foreground">
			Posted {formattedDate(page.date)}
			{page.contributors.length ? " by " : " "}
			{page.contributors.map((contributor, index) => (
				<span key={contributor}>
					{index > 0 ? " and " : null}
					<a href="https://dcbuilder.dev" target="_blank" rel="noreferrer" className="font-medium text-primary">{contributor}</a>
				</span>
			))}
			{" - "}<strong className="font-semibold text-foreground">{getReadingTime(page.body)} min read</strong>
		</p>
	);
}

export function BlogIndex({ posts }: { posts: ContentPage[] }) {
	return (
		<SiteShell>
			<main id="main-content" className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
				<article className="mx-auto max-w-3xl">
					<header className="text-center">
						<h1 className="display-face mt-0 text-4xl font-bold leading-tight sm:text-5xl">Announcements</h1>
						<p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">Updates about new features and additions to the guide.</p>
					</header>
					<div className="mt-8 space-y-8">
						{posts.map((post) => (
							<article key={post.route} className="border border-border bg-card p-6 sm:p-8">
								<h2 className="mt-0 text-2xl font-bold leading-tight sm:text-3xl">
									<Link href={post.route} className="text-foreground no-underline hover:text-primary">{post.title}</Link>
								</h2>
								{post.lead || post.description ? <p className="mt-3 text-base leading-7 text-muted-foreground">{post.lead || post.description}</p> : null}
								<div className="mt-4 flex items-end justify-between gap-4">
									<PostMeta page={post} />
									<Link href={post.route} aria-label={`Read ${post.title}`} className="shrink-0 text-primary no-underline hover:text-signal"><ArrowRight size={20} weight="bold" /></Link>
								</div>
							</article>
						))}
					</div>
				</article>
			</main>
		</SiteShell>
	);
}

export function BlogPost({ page }: { page: ContentPage }) {
	return (
		<SiteShell>
			<main id="main-content" className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
				<article className="mx-auto max-w-3xl">
					<Link href="/blog/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground no-underline hover:text-primary"><ArrowLeft size={15} weight="bold" /> Back to announcements</Link>
					<header className="mt-8 border-b border-border pb-8 text-center">
						<h1 className="display-face mt-0 text-4xl font-bold leading-tight sm:text-5xl">{page.title}</h1>
						<div className="mt-4"><PostMeta page={page} /></div>
						{page.lead ? <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{page.lead}</p> : null}
					</header>
					<div className="mt-8"><MarkdownContent source={page.body} /></div>
				</article>
			</main>
		</SiteShell>
	);
}

export function ContributorIndex({ contributors }: { contributors: ContentPage[] }) {
	return (
		<SiteShell>
			<main id="main-content" className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
				<article className="mx-auto max-w-3xl">
					<header className="text-center">
						<h1 className="display-face mt-0 text-4xl font-bold leading-tight sm:text-5xl">Contributors</h1>
						<p className="mt-4 text-lg leading-8 text-muted-foreground">The people who have helped shape devpill.me.</p>
					</header>
					<div className="mt-8 grid gap-6 sm:grid-cols-2">
						{contributors.map((contributor) => (
							<Card key={contributor.route} className="rounded border-border bg-card shadow-none">
								<CardHeader><CardTitle className="text-xl font-bold">{contributor.title}</CardTitle></CardHeader>
								<CardContent>
									<p className="text-sm leading-6 text-muted-foreground">{contributor.description}</p>
									<Link href={contributor.route} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">Read profile <ArrowRight size={15} weight="bold" /></Link>
								</CardContent>
							</Card>
						))}
					</div>
				</article>
			</main>
		</SiteShell>
	);
}

export function ContributorPage({ page }: { page: ContentPage }) {
	return (
		<SiteShell>
			<main id="main-content" className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
				<article className="mx-auto max-w-3xl">
					<Link href="/contributors/" className="text-sm font-medium text-muted-foreground no-underline hover:text-primary">Contributors</Link>
					<h1 className="display-face mt-8 text-4xl font-bold leading-tight sm:text-5xl"><a href="https://dcbuilder.dev" target="_blank" rel="noreferrer" className="text-foreground hover:text-primary">{page.title}</a></h1>
					<div className="mt-8"><MarkdownContent source={page.body} /></div>
				</article>
			</main>
		</SiteShell>
	);
}

export function GenericContentPage({ page }: { page: ContentPage }) {
	return (
		<SiteShell>
			<main id="main-content" className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
				<article className="mx-auto max-w-3xl">
					<h1 className="display-face mt-0 text-4xl font-bold leading-tight sm:text-5xl">{page.title}</h1>
					{page.lead || page.description ? <p className="mt-5 text-lg leading-8 text-muted-foreground">{page.lead || page.description}</p> : null}
					<div className="mt-8"><MarkdownContent source={page.body} /></div>
				</article>
			</main>
		</SiteShell>
	);
}
