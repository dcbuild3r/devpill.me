import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content", "en");

type FrontMatter = {
	title?: string;
	description?: string;
	lead?: string;
	draft?: boolean | string;
	date?: Date | string;
	lastmod?: Date | string;
	weight?: number | string;
	contributors?: string[];
	images?: string[];
};

export type ContentPage = {
	route: string;
	title: string;
	description: string;
	lead: string;
	body: string;
	date?: string;
	lastmod?: string;
	weight: number;
	contributors: string[];
	images: string[];
	section: string;
	sourcePath: string;
};

export type DocSection = {
	title: string;
	route: string;
	items: ContentPage[];
};

function walkMarkdownFiles(directory: string): string[] {
	return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const absolutePath = path.join(directory, entry.name);
		if (entry.isDirectory()) return walkMarkdownFiles(absolutePath);
		return entry.isFile() && entry.name.endsWith(".md") ? [absolutePath] : [];
	});
}

function titleFromSlug(slug: string) {
	return slug
		.replace(/[-_]+/g, " ")
		.replace(/\b\w/g, (character) => character.toUpperCase());
}

function routeFromSource(sourcePath: string) {
	const relativePath = path.relative(contentRoot, sourcePath);
	const segments = relativePath.split(path.sep);
	const filename = segments.pop() ?? "";

	if (filename === "_index.md" || filename === "index.md") {
		// Section index files map to the containing directory.
	} else if (filename.endsWith(".md")) {
		segments.push(filename.slice(0, -3));
	}

	return segments.length === 0 ? "/" : `/${segments.join("/")}/`;
}

function normalizeValue(value: unknown) {
	return value instanceof Date ? value.toISOString() : value ? String(value) : undefined;
}

function parsePage(sourcePath: string): ContentPage | null {
	const parsed = matter(fs.readFileSync(sourcePath, "utf8"));
	const data = parsed.data as FrontMatter;
	if (data.draft === true || data.draft === "true") return null;
	const route = routeFromSource(sourcePath);
	const routeSegments = route.split("/").filter(Boolean);
	const title = data.title ?? titleFromSlug(routeSegments.at(-1) ?? "devpill.me");

	return {
		route,
		title,
		description: data.description ?? "",
		lead: data.lead ?? "",
		body: parsed.content.trim(),
		date: normalizeValue(data.date),
		lastmod: normalizeValue(data.lastmod),
		weight: Number(data.weight ?? 999),
		contributors: data.contributors ?? [],
		images: data.images ?? [],
		section: routeSegments[0] ?? "home",
		sourcePath,
	};
}

export function getAllContentPages() {
	return walkMarkdownFiles(contentRoot)
		.map(parsePage)
		.filter((page): page is ContentPage => Boolean(page))
		.sort((a, b) => a.route.localeCompare(b.route));
}

export function getPageByRoute(route: string) {
	const normalizedRoute = route === "/" ? "/" : `/${route.replace(/^\//, "").replace(/\/+$/, "")}/`;
	return getAllContentPages().find((page) => page.route === normalizedRoute);
}

export function getDocNavigation(pages = getAllContentPages()): DocSection[] {
	const docs = pages.filter((page) => page.section === "docs");
	const sectionIndexes = docs.filter((page) => page.route.split("/").filter(Boolean).length === 2);

	return sectionIndexes
		.sort((a, b) => a.weight - b.weight || a.title.localeCompare(b.title))
		.map((section) => {
			const sectionKey = section.route.split("/").filter(Boolean)[1];
			const items = docs
				.filter((page) => {
					const segments = page.route.split("/").filter(Boolean);
					return segments[1] === sectionKey && segments.length > 2;
				})
				.sort((a, b) => a.weight - b.weight || a.title.localeCompare(b.title));

			return { title: section.title, route: section.route, items };
		});
}

export function getBlogPosts(pages = getAllContentPages()) {
	return pages
		.filter((page) => page.section === "blog" && page.route !== "/blog/")
		.sort((a, b) => {
			const dateDifference = (b.date ?? "").localeCompare(a.date ?? "");
			return dateDifference || a.weight - b.weight;
		});
}

export function getContributors(pages = getAllContentPages()) {
	return pages.filter((page) => page.section === "contributors" && page.route !== "/contributors/");
}

export function getReadingTime(body: string) {
	return Math.max(1, Math.ceil(body.split(/\s+/).filter(Boolean).length / 220));
}

export function slugifyHeading(value: string) {
	return value
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s-]/gu, "")
		.trim()
		.replace(/[\s-]+/g, "-");
}

export function getTableOfContents(body: string) {
	return [...body.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match) => {
		const title = match[2].replace(/[`*_\[\]]/g, "").trim();
		return { depth: match[1].length, title, id: slugifyHeading(title) };
	});
}
