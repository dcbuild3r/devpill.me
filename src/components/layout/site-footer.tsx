import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export function SiteFooter() {
	return (
		<footer className="border-t border-border/80">
			<div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
				<p>
					A public-good guide for curious builders. Built by{" "}
					<a className="font-semibold text-foreground underline decoration-border hover:text-cyan" href="https://dcbuilder.dev" target="_blank" rel="noreferrer">
						dcbuilder.eth
					</a>
					.
				</p>
				<div className="flex items-center gap-4">
					<Link href="/privacy-policy/" className="hover:text-foreground">Privacy</Link>
					<a href="https://github.com/dcbuild3r/devpill.me" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground">
						<GithubLogo size={16} weight="bold" /> Source
					</a>
					<a href="https://dcbuilder.dev" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-cyan hover:text-signal">
						dcbuilder.dev <ArrowUpRight size={14} weight="bold" />
					</a>
				</div>
			</div>
		</footer>
	);
}
