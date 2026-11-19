import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getContent, getPage, ogImagePath, type Page } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
	return [...getContent().pages.values()].map((page) => ({ slug: ogImagePath(page).split("/").slice(2) }));
}

const font = (weight: 500 | 700) => readFile(path.join(process.cwd(), "src", "assets", `Jost-${weight}.ttf`));

function eyebrow(page: Page) {
	if (page.kind === "doc") return `Guide / ${page.section?.page.title}`;
	if (page.kind === "section" || page.kind === "docs-home") return "Guide";
	if (page.kind === "post" || page.kind === "blog-index") return "Announcements";
	return "";
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
	const page = getPage((await params).slug.slice(0, -1));
	if (!page) return new Response(null, { status: 404 });

	const title = page.kind === "home" ? site.tagline : page.title;
	const description = page.kind === "home" ? page.description : page.description || page.lead;
	const timed = page.kind === "doc" || page.kind === "post";

	return new ImageResponse(
		(
			<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fff", color: "#1d2d35", fontFamily: "Jost" }}>
				<div style={{ height: 14, background: "linear-gradient(90deg, #9f4fa9, #8ed6fb 50%, #d32e9d)" }} />
				<div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 72px 60px" }}>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 700 }}>
							<svg width="48" height="48" viewBox="0 0 24 24" style={{ marginRight: 16 }}>
								<g transform="rotate(-45 12 12)">
									<rect x="2" y="7.5" width="20" height="9" rx="4.5" fill="#9f4fa9" />
									<path d="M12 7.5h5.5a4.5 4.5 0 0 1 0 9H12z" fill="#d32e9d" />
								</g>
							</svg>
							{site.name}
						</div>
						<div style={{ fontSize: 22, letterSpacing: 1, textTransform: "uppercase", color: "#9f4fa9" }}>{eyebrow(page)}</div>
					</div>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div style={{ fontSize: title.length > 40 ? 68 : 92, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>{title}</div>
						{description ? <div style={{ marginTop: 20, fontSize: 32, lineHeight: 1.3, color: "#5f6770", lineClamp: 2 }}>{description}</div> : null}
					</div>
					<div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #e9ecef", paddingTop: 24, fontSize: 24, color: "#5f6770" }}>
						<div>{page.kind === "home" ? new URL(site.url).host : site.tagline}</div>
						<div>{timed ? `${page.readingTime} min read` : ""}</div>
					</div>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: "Jost", data: await font(500), weight: 500, style: "normal" },
				{ name: "Jost", data: await font(700), weight: 700, style: "normal" },
			],
		},
	);
}
