import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/content";

function nodeText(value: unknown): string {
	if (typeof value === "string" || typeof value === "number") return String(value);
	if (Array.isArray(value)) return value.map(nodeText).join("");
	return "";
}

const components: Components = {
	h2: ({ children, ...props }) => (
		<h2 id={slugifyHeading(nodeText(children))} {...props}>
			{children}
		</h2>
	),
	h3: ({ children, ...props }) => (
		<h3 id={slugifyHeading(nodeText(children))} {...props}>
			{children}
		</h3>
	),
	h4: ({ children, ...props }) => (
		<h4 id={slugifyHeading(nodeText(children))} {...props}>
			{children}
		</h4>
	),
	a: ({ href, children, ...props }) => {
		const isExternal = href?.startsWith("http");
		return (
			<a
				href={href}
				target={isExternal ? "_blank" : undefined}
				rel={isExternal ? "noreferrer" : undefined}
				{...props}
			>
				{children}
			</a>
		);
	},
	img: ({ alt, ...props }) => {
		// Markdown may reference arbitrary remote assets, so Next Image cannot optimize these safely.
		// eslint-disable-next-line @next/next/no-img-element
		return <img alt={alt ?? ""} loading="lazy" {...props} />;
	},
};

export function MarkdownContent({ source }: { source: string }) {
	if (!source) return null;

	return (
		<div className="markdown-content">
			<ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
				{source}
			</ReactMarkdown>
		</div>
	);
}
