import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";
import { getPageByRoute } from "@/lib/content";

export default function Home() {
	const page = getPageByRoute("/");

	return (
		<SiteShell>
			<main id="main-content">
				<section className="mx-auto max-w-[1320px] px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-12 lg:px-12">
					<div className="mx-auto max-w-4xl text-center">
						<h1 className="display-face mt-0 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{page?.title ?? "Public Good Blockchain Development Guide"}</h1>
						<p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{page?.lead ?? "devpill.me is a public good blockchain development guide aimed at becoming the go-to learning resource aggregator for building on Ethereum and its wider ecosystem of scaling solutions and applications."}</p>
						<Button asChild size="lg" className="mt-7 px-6">
							<Link href="/docs/introduction/foreword/">Get Started</Link>
						</Button>
					</div>
				</section>
			</main>
		</SiteShell>
	);
}
