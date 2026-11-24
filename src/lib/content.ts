import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { site } from "@/lib/site";

const contentDir = path.join("content", "en");

export type PageKind = "home" | "docs-home" | "section" | "doc" | "blog-index" | "post" | "contributors-index" | "contributor" | "page";

export type Page = {
	kind: PageKind;
	route: string;
	segments: string[];
	title: string;
	description: string;
	lead: string;
	body: string;
	date?: string;
	lastmod?: string;
	weight: number;
	contributors: string[];
	readingTime: number;
	sourcePath: string;
	/** Set on `section` and `doc` pages. */
	section?: Section;
	/** Reading order across the whole guide, set on `section` and `doc` pages. */
	prev?: Page;
	next?: Page;
};

export type Section = { page: Page; number: number; pages: Page[] };
export type Track = { name: string; sections: Section[] };

export type Content = {
	pages: Map<string, Page>;
	tracks: Track[];
	sections: Section[];
	posts: Page[];
	contributors: Page[];
};

const trackNames = ["Foundations", "Specializations", "Career"];
const trackOfSection: Record<string, string> = {
	introduction: "Foundations",
	"get-started": "Foundations",
	"getting-a-job": "Career",
	mastery: "Career",
	"social-capital": "Career",
};

function kindOf([root, ...rest]: string[]): PageKind {
	if (!root) return "home";
	if (root === "docs") return rest.length === 0 ? "docs-home" : rest.length === 1 ? "section" : "doc";
	if (root === "blog") return rest.length ? "post" : "blog-index";
	if (root === "contributors") return rest.length ? "contributor" : "contributors-index";
	return "page";
}

function markdownFiles(directory: string): string[] {
	return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) return markdownFiles(entryPath);
		return entry.name.endsWith(".md") ? [entryPath] : [];
	});
}

function isoDate(value: unknown) {
	return value instanceof Date ? value.toISOString() : value ? String(value) : undefined;
}

function titleFromSlug(slug: string) {
	return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function readFrontMatter(source: string, sourcePath: string) {
	const opening = /^\uFEFF?---[ \t]*\r?\n/.exec(source);
	if (!opening) return { data: {}, content: source };

	const rest = source.slice(opening[0].length);
	const closing = /^---[ \t]*(?:\r?\n|$)/m.exec(rest);
	if (!closing) throw new Error(`Unclosed YAML front matter in ${sourcePath}`);

	const metadata: unknown = parse(rest.slice(0, closing.index), {
		customTags: ["timestamp"],
		maxAliasCount: 0,
	});
	if (metadata != null && (typeof metadata !== "object" || Array.isArray(metadata))) {
		throw new Error(`Expected a YAML mapping in ${sourcePath}`);
	}

	return {
		data: (metadata ?? {}) as Record<string, unknown>,
		content: rest.slice(closing.index + closing[0].length),
	};
}

function parsePage(sourcePath: string): Page[] {
	const { data, content } = readFrontMatter(fs.readFileSync(sourcePath, "utf8"), sourcePath);
	if (data.draft === true || data.draft === "true") return [];

	const segments = path.relative(contentDir, sourcePath).split(path.sep);
	const filename = segments.pop() ?? "";
	if (filename !== "_index.md" && filename !== "index.md") segments.push(filename.slice(0, -3));
	const body = content.trim();

	return [{
		kind: kindOf(segments),
		route: segments.length ? `/${segments.join("/")}/` : "/",
		segments,
		title: typeof data.title === "string" ? data.title : titleFromSlug(segments.at(-1) ?? site.name),
		description: typeof data.description === "string" ? data.description : "",
		lead: typeof data.lead === "string" ? data.lead : "",
		body,
		date: isoDate(data.date),
		lastmod: isoDate(data.lastmod),
		weight: Number(data.weight ?? 999),
		contributors: Array.isArray(data.contributors) ? data.contributors.filter((name): name is string => typeof name === "string") : [],
		readingTime: Math.max(1, Math.ceil(body.split(/\s+/).filter(Boolean).length / 220)),
		sourcePath: sourcePath.split(path.sep).join("/"),
	}];
}

function loadContent(): Content {
	const all = markdownFiles(contentDir).flatMap(parsePage).sort((a, b) => a.route.localeCompare(b.route));
	const byKind = (kind: PageKind) => all.filter((page) => page.kind === kind);
	const byWeight = (a: Page, b: Page) => a.weight - b.weight || a.title.localeCompare(b.title);

	// Section `_index.md` weights run high to low: Introduction is 20, Social Capital is 1.
	const sections = byKind("section")
		.sort((a, b) => byWeight(b, a))
		.map((page, index): Section => ({
			page,
			number: index + 1,
			pages: byKind("doc").filter((doc) => doc.segments[1] === page.segments[1]).sort(byWeight),
		}));

	const readingOrder = sections.flatMap((section) => {
		const pages = [section.page, ...section.pages];
		for (const page of pages) page.section = section;
		return pages;
	});
	readingOrder.forEach((page, index) => {
		page.prev = readingOrder[index - 1];
		page.next = readingOrder[index + 1];
	});

	return {
		pages: new Map(all.map((page) => [page.segments.join("/"), page])),
		tracks: trackNames.map((name) => ({
			name,
			sections: sections.filter((section) => (trackOfSection[section.page.segments[1]] ?? "Specializations") === name),
		})),
		sections,
		posts: byKind("post").sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || byWeight(a, b)),
		contributors: byKind("contributor"),
	};
}

let cached: Content | undefined;

export function getContent(): Content {
	// Development re-reads so Markdown edits show up without a restart.
	if (process.env.NODE_ENV !== "production") return loadContent();
	return (cached ??= loadContent());
}

export function getPage(slug: string[] = []) {
	return getContent().pages.get(slug.join("/"));
}

export function ogImagePath(page: Page) {
	return `/og/${[...page.segments, "card.png"].join("/")}`;
}

export function editUrl(page: Page) {
	return `${site.repo}/edit/main/${page.sourcePath}`;
}
