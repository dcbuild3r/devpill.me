import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage, BlogIndex, ContributorIndex } from "@/components/content/pages";
import { DocsPage } from "@/components/docs/docs-page";
import { Home } from "@/components/home/home";
import { getContent, getPage, ogImagePath, type Page } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return [...getContent().pages.values()].map((page) => ({ slug: page.segments }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const page = getPage((await params).slug);
	if (!page) return {};
	const description = page.description || page.lead || site.description;
	return {
		title: page.kind === "home" ? { absolute: `${site.name} - ${page.title}` } : page.title,
		description,
		alternates: { canonical: page.route },
		openGraph: {
			title: page.title,
			description,
			url: page.route,
			siteName: site.name,
			type: page.kind === "post" ? "article" : "website",
			images: [{ url: ogImagePath(page), width: 1200, height: 630, alt: page.title }],
		},
		twitter: { card: "summary_large_image" },
	};
}

function view(page: Page) {
	const content = getContent();
	switch (page.kind) {
		case "home":
			return <Home page={page} content={content} />;
		case "docs-home":
		case "section":
		case "doc":
			return <DocsPage page={page} tracks={content.tracks} />;
		case "blog-index":
			return <BlogIndex page={page} posts={content.posts} />;
		case "contributors-index":
			return <ContributorIndex page={page} contributors={content.contributors} />;
		case "post":
			return <ArticlePage page={page} back={{ href: "/blog/", label: "All announcements" }} />;
		case "contributor":
			return <ArticlePage page={page} back={{ href: "/contributors/", label: "Contributors" }} />;
		case "page":
			return <ArticlePage page={page} />;
		default:
			return page.kind satisfies never;
	}
}

export default async function RoutedPage({ params }: Props) {
	const page = getPage((await params).slug);
	if (!page) notFound();
	return view(page);
}
