import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	return [...getContent().pages.values()].map((page) => ({
		url: `${site.url}${page.route}`,
		lastModified: page.lastmod ?? page.date,
		changeFrequency: page.kind === "post" ? "yearly" : "monthly",
		priority: page.kind === "home" ? 1 : page.section ? 0.8 : 0.6,
	}));
}
