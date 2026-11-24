import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getContent, getPage, ogImagePath, type Page } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
	return [...getContent().pages.values()].map((page) => ({ slug: ogImagePath(page).split("/").slice(2) }));
}

const font = (file: string) => readFile(path.join(process.cwd(), "src", "assets", file));
const logo = async () => `data:image/png;base64,${(await readFile(path.join(process.cwd(), "public", "logo-light.png"))).toString("base64")}`;

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
	const logoSrc = await logo();
	const timed = page.kind === "doc" || page.kind === "post";

	return new ImageResponse(
		(
			<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fff", color: "#1d2d35", fontFamily: "Hanken Grotesk" }}>
				<div style={{ height: 14, background: "linear-gradient(90deg, #9f4fa9, #8ed6fb 50%, #d32e9d)" }} />
				<div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 72px 60px" }}>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						{/* eslint-disable-next-line @next/next/no-img-element -- the image renderer only understands img */}
						<img src={logoSrc} alt={site.name} width={347} height={56} />
						<div style={{ fontFamily: "JetBrains Mono", fontSize: 22, letterSpacing: 1, textTransform: "uppercase", color: "#9f4fa9" }}>{eyebrow(page)}</div>
					</div>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div style={{ fontFamily: "Bricolage Grotesque", fontSize: title.length > 40 ? 68 : 96, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>{title}</div>
						{description ? <div style={{ marginTop: 20, fontSize: 32, lineHeight: 1.3, color: "#5f6770", lineClamp: 2 }}>{description}</div> : null}
					</div>
					<div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, fontSize: 24, color: "#5f6770" }}>
						<div>{page.kind === "home" ? new URL(site.url).host : site.tagline}</div>
						<div style={{ fontFamily: "JetBrains Mono", fontSize: 22 }}>{timed ? `${page.readingTime} min read` : ""}</div>
					</div>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: "Hanken Grotesk", data: await font("Hanken-400.ttf"), weight: 400, style: "normal" },
				{ name: "Bricolage Grotesque", data: await font("Bricolage-700.ttf"), weight: 700, style: "normal" },
				{ name: "JetBrains Mono", data: await font("JetBrainsMono-400.ttf"), weight: 400, style: "normal" },
			],
		},
	);
}
