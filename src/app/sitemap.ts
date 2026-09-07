import type { MetadataRoute } from "next";
import { getAllContentPages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
	return getAllContentPages().map((page) => ({ url: `https://www.devpill.me${page.route}`, lastModified: page.lastmod ?? page.date ?? new Date(), changeFrequency: page.section === "blog" ? "yearly" : "monthly", priority: page.route === "/" ? 1 : page.section === "docs" ? 0.8 : 0.6 }));
}
