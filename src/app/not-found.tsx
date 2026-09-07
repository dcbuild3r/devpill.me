import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";

export default function NotFound() {
	return <SiteShell><main id="main-content" className="mx-auto max-w-[760px] px-5 py-16 text-center sm:px-8 sm:py-24"><p className="eyebrow text-signal">404 / page not found</p><h1 className="display-face mt-5 text-4xl font-bold sm:text-5xl">That page is not here.</h1><p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-muted-foreground">The page you are looking for does not exist, but there is plenty more to explore.</p><Link href="/docs/" className="mt-8 inline-flex rounded bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground no-underline hover:bg-primary/80">Browse the guide</Link></main></SiteShell>;
}
