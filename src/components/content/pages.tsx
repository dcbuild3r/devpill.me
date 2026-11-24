import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getPage, type Page } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

function PageHeader({ eyebrow, page }: { eyebrow?: string; page: Page }) {
	const lead = page.lead || page.description;
	return (
		<header>
			{eyebrow ? <p className="eyebrow mb-4 text-primary">{eyebrow}</p> : null}
			<h1 className="display-face text-4xl font-bold leading-[1.1] sm:text-5xl">{page.title}</h1>
			{lead ? <p className="mt-4 text-xl leading-8 text-muted-foreground">{lead}</p> : null}
		</header>
	);
}

function Byline({ page }: { page: Page }) {
	return (
		<span className="flex flex-wrap gap-x-2 text-sm text-muted-foreground">
			{page.contributors.map((name) => {
				const profile = getPage(["contributors", name]);
				return profile ? <Link key={name} href={profile.route} className="font-medium text-foreground hover:text-primary">{name}</Link> : <span key={name}>{name}</span>;
			})}
			{page.contributors.length ? <span aria-hidden="true">·</span> : null}
			<span>{page.readingTime} min read</span>
		</span>
	);
}

export function BlogIndex({ page, posts }: { page: Page; posts: Page[] }) {
	return (
		<div className="shell max-w-[960px] py-12 lg:py-16">
			<PageHeader eyebrow="Changelog" page={page} />
			<ul className="mt-12">
				{posts.map((post) => (
					<li key={post.route}>
						<Link href={post.route} className="group flex flex-col gap-x-8 gap-y-2 py-7 sm:flex-row sm:items-baseline">
							{post.date ? <time dateTime={post.date} className="w-36 shrink-0 font-mono text-sm text-muted-foreground">{formatDate(post.date, "short")}</time> : null}
							<span className="min-w-0 flex-1">
								<span className="font-heading block text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground group-hover:text-primary">{post.title}</span>
								<span className="mb-3 mt-2 block text-[1.0625rem] leading-7 text-muted-foreground">{post.lead || post.description}</span>
								{/* Plain text: a profile link here would nest a link inside the post link. */}
									<span className="text-sm text-muted-foreground">{[...post.contributors, `${post.readingTime} min read`].join(" · ")}</span>
							</span>
							<ArrowRight size={20} weight="bold" className="hidden shrink-0 self-center text-primary sm:block" aria-hidden="true" />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export function ContributorIndex({ page, contributors }: { page: Page; contributors: Page[] }) {
	return (
		<div className="shell max-w-[960px] py-12 lg:py-16">
			<PageHeader page={page} />
			<ul className="mt-12 grid gap-4 sm:grid-cols-2">
				{contributors.map((contributor) => (
					<li key={contributor.route}>
						<Link href={contributor.route} className="group block h-full rounded border border-border p-6 hover:border-primary">
							<span className="block text-xl font-bold text-foreground group-hover:text-primary">{contributor.title}</span>
							<span className="mt-2 block text-[0.9375rem] leading-6 text-muted-foreground">{contributor.description}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

/** Announcements, contributor profiles and standalone pages such as the privacy policy. */
export function ArticlePage({ page, back }: { page: Page; back?: { href: string; label: string } }) {
	const isPost = page.kind === "post";
	return (
		<article className="shell max-w-[860px] py-10 lg:py-14">
			{back ? <Link href={back.href} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"><ArrowLeft size={15} weight="bold" /> {back.label}</Link> : null}
			<PageHeader page={page.kind === "contributor" ? { ...page, description: "" } : page} />
			{isPost ? (
				<div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 py-3 text-sm text-muted-foreground">
					{page.date ? <time dateTime={page.date}>{formatDate(page.date)}</time> : null}
					<Byline page={page} />
				</div>
			) : null}
			<div className="markdown-content mt-8">{renderMarkdown(page.body).content}</div>
		</article>
	);
}
