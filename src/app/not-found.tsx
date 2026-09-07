import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";

export default function NotFound() {
	return <SiteShell><main id="main-content" className="mx-auto max-w-[760px] px-5 py-24 text-center sm:px-8"><p className="eyebrow text-signal">404 / missing note</p><h1 className="display-face mt-5 text-6xl font-extrabold">That pill is still in the lab.</h1><p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-muted-foreground">The page you’re after doesn’t exist here, but there’s plenty more to explore.</p><Link href="/docs/" className="mt-8 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/80">Browse the guide</Link></main></SiteShell>;
}
