import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ContentPage, DocSection } from "@/lib/content";
import { GuideSearch } from "@/components/docs/guide-search";

export function DocsSidebar({ navigation, pages, currentRoute }: { navigation: DocSection[]; pages: ContentPage[]; currentRoute: string }) {
	return (
		<aside className="lg:sticky lg:top-[6.75rem] lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-4">
			<GuideSearch pages={pages.map(({ title, description, route, section }) => ({ title, description, route, section }))} />
			<nav className="mt-6" aria-label="Guide navigation">
				<Link href="/docs/" className={`mb-4 flex items-center justify-between rounded px-3 py-2 text-sm font-semibold no-underline transition-colors ${currentRoute === "/docs/" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
					<span>All sections</span><span className="eyebrow text-muted-foreground">{navigation.length}</span>
				</Link>
				<div className="space-y-1">
					{navigation.map((section) => {
						const isCurrent = currentRoute === section.route || section.items.some((item) => item.route === currentRoute);
						return (
							<details key={section.route} open={isCurrent} className="group rounded">
								<summary className="flex cursor-pointer list-none items-center justify-between rounded px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted [&::-webkit-details-marker]:hidden">
									<span className="flex items-center gap-2"><CaretDown size={14} weight="bold" />{section.title}</span>
									<span className="eyebrow text-muted-foreground">{section.items.length}</span>
								</summary>
								<div className="ml-3 border-l border-border pl-4 pb-2 pt-1">
									<Link href={section.route} className={`block rounded px-3 py-2 text-sm no-underline ${currentRoute === section.route ? "bg-accent font-semibold text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>Overview</Link>
									{section.items.map((item) => (
										<Link key={item.route} href={item.route} className={`block rounded px-3 py-2 text-sm no-underline ${currentRoute === item.route ? "bg-accent font-semibold text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
											{item.title}
										</Link>
									))}
								</div>
							</details>
						);
					})}
				</div>
			</nav>
		</aside>
	);
}
