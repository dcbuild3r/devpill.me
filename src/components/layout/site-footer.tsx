import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { site } from "@/lib/site";

const columns = [
	{ title: "Guide", links: [{ href: "/docs/introduction/foreword/", label: "Foreword" }, { href: "/docs/", label: "All sections" }, { href: "/blog/", label: "Announcements" }] },
	{ title: "Project", links: [{ href: site.repo, label: "Source" }, { href: "/contributors/", label: "Contributors" }, { href: "/privacy-policy/", label: "Privacy" }] },
	{ title: "Elsewhere", links: [{ href: site.x, label: "X" }, { href: site.author.url, label: "dcbuilder.dev" }] },
];

export function SiteFooter() {
	return (
		<footer className="bg-muted">
			<div className="shell flex flex-col justify-between gap-10 py-12 text-[0.9375rem] text-muted-foreground md:flex-row">
				<div className="max-w-sm">
					<Logo height={26} />
					<p className="mt-3 leading-6">
						A public-good guide for curious builders. Built by{" "}
						<a className="font-semibold text-foreground underline" href={site.author.url} target="_blank" rel="noreferrer">{site.author.name}</a>.
					</p>
				</div>
				<div className="flex flex-wrap gap-x-16 gap-y-8">
					{columns.map((column) => (
						<nav key={column.title} aria-label={column.title} className="flex flex-col gap-2.5">
							<span className="eyebrow text-foreground">{column.title}</span>
							{column.links.map((link) =>
								link.href.startsWith("/") ? (
									<Link key={link.href} href={link.href} className="hover:text-primary">{link.label}</Link>
								) : (
									<a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-primary">{link.label}</a>
								),
							)}
						</nav>
					))}
				</div>
			</div>
		</footer>
	);
}
