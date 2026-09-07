import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex, BlogPost, ContributorIndex, ContributorPage, GenericContentPage } from "@/components/blog/blog-page";
import { DocsPage } from "@/components/docs/docs-page";
import { getAllContentPages, getBlogPosts, getContributors, getDocNavigation, getPageByRoute, type ContentPage } from "@/lib/content";

type RouteParams = { slug?: string[] };

function routeFromParams(slug?: string[]) {
	return slug?.length ? `/${slug.join("/")}/` : "/";
}

export function generateStaticParams() {
	return getAllContentPages()
		.filter((page) => page.route !== "/")
		.map((page) => ({ slug: page.route.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
	const { slug } = await params;
	const page = getPageByRoute(routeFromParams(slug));
	if (!page) return {};
	return { title: page.title, description: page.description || page.lead };
}

function searchPages(pages: ContentPage[]) {
	return pages.filter((page) => page.section === "docs" && page.route !== "/docs/");
}

export default async function RoutedPage({ params }: { params: Promise<RouteParams> }) {
	const { slug } = await params;
	const page = getPageByRoute(routeFromParams(slug));
	if (!page) notFound();

	const pages = getAllContentPages();
	if (page.section === "docs") return <DocsPage page={page} pages={searchPages(pages)} navigation={getDocNavigation(pages)} />;
	if (page.route === "/blog/") return <BlogIndex posts={getBlogPosts(pages)} />;
	if (page.section === "blog") return <BlogPost page={page} />;
	if (page.route === "/contributors/") return <ContributorIndex contributors={getContributors(pages)} />;
	if (page.section === "contributors") return <ContributorPage page={page} />;
	return <GenericContentPage page={page} />;
}
