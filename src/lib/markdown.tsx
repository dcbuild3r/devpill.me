import type { Element, Root } from "hast";
import Link from "next/link";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

export type Heading = { depth: number; title: string; id: string };

function textOf(node: Root | Element): string {
	return node.children.map((child) => (child.type === "text" ? child.value : child.type === "element" ? textOf(child) : "")).join("");
}

function slugify(value: string) {
	return value.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/[\s-]+/g, "-");
}

/** Gives every h2-h4 a unique id and records it, so the table of contents and search read the ids that were rendered. */
function headingIds(headings: Heading[]) {
	return () => (tree: Root) => {
		const seen = new Map<string, number>();
		const visit = (node: Root | Element) => {
			for (const child of node.children) {
				if (child.type !== "element") continue;
				const depth = /^h([2-4])$/.exec(child.tagName)?.[1];
				if (depth) {
					const title = textOf(child);
					const base = slugify(title) || "section";
					const count = seen.get(base) ?? 0;
					seen.set(base, count + 1);
					const id = count ? `${base}-${count}` : base;
					child.properties.id = id;
					headings.push({ depth: Number(depth), title, id });
				}
				visit(child);
			}
		};
		visit(tree);
	};
}

const components: Components = {
	a: ({ href = "", children }) => {
		const internal = href.replace(/^https?:\/\/(www\.)?devpill\.me(?=\/|$)/, "") || "/";
		if (internal.startsWith("/")) return <Link href={internal}>{children}</Link>;
		if (href.startsWith("#")) return <a href={href}>{children}</a>;
		return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
	},
	// Markdown references arbitrary remote images, which next/image cannot optimize without an allowlist.
	// eslint-disable-next-line @next/next/no-img-element
	img: ({ alt, src }) => <img alt={alt ?? ""} src={src} loading="lazy" />,
};

export function renderMarkdown(source: string) {
	const headings: Heading[] = [];
	const content = Markdown({ children: source, remarkPlugins: [remarkGfm], rehypePlugins: [headingIds(headings)], components });
	return { content, headings };
}
