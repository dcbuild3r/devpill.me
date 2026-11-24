/// <reference types="bun-types" />
import { expect, test } from "bun:test";
import { generateStaticParams as ogParams } from "@/app/og/[...slug]/route";
import { getContent, getPage, ogImagePath } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { search } from "@/lib/search";

const content = getContent();

test("sections keep the guide's reading order", () => {
	expect(content.sections.map((section) => section.page.segments[1])).toEqual([
		"introduction", "get-started", "front-end-development", "back-end-development", "smart-contract-development", "full-stack-development",
		"starknet-development", "core-development", "cryptography", "getting-a-job", "mastery", "social-capital",
	]);
	expect(content.tracks.flatMap((track) => track.sections)).toEqual(content.sections);
});

test("previous and next walk every guide page once", () => {
	const walked = [];
	for (let page = content.sections[0].page; page; page = page.next!) walked.push(page);
	expect(walked.length).toBe(content.sections.reduce((sum, section) => sum + 1 + section.pages.length, 0));
	expect(getPage(["docs", "introduction", "foreword"])?.next?.title).toBe("What is blockchain development?");
});

test("every page has an Open Graph image route", () => {
	const generated = new Set(ogParams().map(({ slug }) => `/og/${slug.join("/")}`));
	for (const page of content.pages.values()) expect(generated.has(ogImagePath(page))).toBe(true);
});

test("links to devpill.me inside the content resolve to a page", () => {
	const dead = [];
	for (const page of content.pages.values()) {
		for (const [, target] of page.body.matchAll(/\]\(https?:\/\/(?:www\.)?devpill\.me([^)#\s]*)/g)) {
			if (!getPage(target.split("/").filter(Boolean))) dead.push(`${page.route} -> ${target}`);
		}
	}
	expect(dead).toEqual([]);
});

test("repeated headings get unique ids", () => {
	const { headings } = renderMarkdown("## Tools\n\n### `Foundry` setup\n\n## Tools\n\n## Tools-1\n\n```\n## not a heading\n```");
	expect(headings).toEqual([
		{ depth: 2, title: "Tools", id: "tools" },
		{ depth: 3, title: "Foundry setup", id: "foundry-setup" },
		{ depth: 2, title: "Tools", id: "tools-1" },
		{ depth: 2, title: "Tools-1", id: "tools-1-1" },
	]);
});

test("search ranks title matches above heading and description matches", () => {
	const entry = (title: string, description = "", headings: string[] = []) => ({ title, description, route: `/${title}/`, group: "", headings });
	const entries = [entry("Oracles", "about solidity"), entry("Testing", "", ["Solidity tests"]), entry("Solidity")];
	expect(search(entries, "solidity").map((result) => result.title)).toEqual(["Solidity", "Testing", "Oracles"]);
	expect(search(entries, "solidity tests").map((result) => result.title)).toEqual(["Testing"]);
	expect(search(entries, "zzz")).toEqual([]);
});
