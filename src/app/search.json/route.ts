import { getContent } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import type { SearchEntry } from "@/lib/search";

export const dynamic = "force-static";

export function GET() {
	const { sections, posts } = getContent();
	const entries: SearchEntry[] = [
		...sections.flatMap((section) => [section.page, ...section.pages]),
		...posts,
	].map((page) => ({
		title: page.title,
		description: page.description,
		route: page.route,
		group: page.section?.page.title ?? "Announcements",
		headings: renderMarkdown(page.body).headings.map((heading) => heading.title),
	}));
	return Response.json(entries);
}
