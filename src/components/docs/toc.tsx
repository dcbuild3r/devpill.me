"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/markdown";

export function TableOfContents({ headings }: { headings: Heading[] }) {
	const [activeId, setActiveId] = useState(headings[0]?.id);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.find((entry) => entry.isIntersecting);
				if (visible) setActiveId(visible.target.id);
			},
			// A heading becomes current once it passes under the sticky header.
			{ rootMargin: "-96px 0px -70% 0px" },
		);
		for (const heading of headings) {
			const element = document.getElementById(heading.id);
			if (element) observer.observe(element);
		}
		return () => observer.disconnect();
	}, [headings]);

	return (
		<nav aria-label="On this page">
			<p className="eyebrow text-muted-foreground">On this page</p>
			<ul className="mt-3 border-l border-border">
				{headings.map((heading) => (
					<li key={heading.id}>
						<a href={`#${heading.id}`} className={`-ml-px block border-l-2 py-1.5 text-sm leading-5 ${heading.depth === 3 ? "pl-7" : "pl-4"} ${heading.id === activeId ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
							{heading.title}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
