import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Code, Compass, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SiteShell } from "@/components/layout/site-shell";
import { getBlogPosts, getDocNavigation } from "@/lib/content";

const promises = [
	{ icon: Compass, label: "Start anywhere", text: "Begin with first principles or jump straight into the specialization that has your attention." },
	{ icon: Code, label: "Build as you learn", text: "The best ideas in this guide point back to code, protocols, and things you can try yourself." },
	{ icon: Sparkle, label: "Keep your curiosity", text: "A living index for the questions that make the decentralized web worth building." },
];

export default function Home() {
	const navigation = getDocNavigation();
	const posts = getBlogPosts().slice(0, 3);

	return (
		<SiteShell>
			<main id="main-content" className="site-grid relative overflow-hidden">
				<section className="relative mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-12 lg:py-28">
					<div className="relative z-10 max-w-3xl">
						<Badge variant="outline" className="mb-7 gap-2 border-signal/40 bg-signal-soft/50 px-3 py-1.5 text-signal"><span className="size-1.5 rounded-full bg-signal" /> Public-good learning guide</Badge>
						<h1 className="display-face max-w-3xl text-6xl font-extrabold leading-[0.9] sm:text-8xl lg:text-[7.4rem]">Learn the thread.<br /><span className="text-signal">Build the thing.</span></h1>
						<p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">devpill.me is a public-good blockchain development guide for people who want to understand the systems they’re building on — and then make something of their own.</p>
						<div className="mt-9 flex flex-wrap items-center gap-3"><Link href="/docs/introduction/foreword/" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-primary/85">Start reading <ArrowRight size={17} weight="bold" /></Link><Link href="/docs/" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-5 py-3.5 text-sm font-bold transition-colors hover:border-cyan/50 hover:text-cyan">Explore the guide</Link></div>
						<div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground"><span className="eyebrow">100+ notes</span><span className="h-1 w-1 rounded-full bg-border" /><span className="eyebrow">13 paths</span><span className="h-1 w-1 rounded-full bg-border" /><a className="eyebrow text-cyan hover:text-signal" href="https://dcbuilder.dev" target="_blank" rel="noreferrer">by dcbuilder.eth ↗</a></div>
					</div>

					<div className="relative mx-auto w-full max-w-[31rem] lg:justify-self-end">
						<div className="absolute -right-10 -top-12 size-32 rounded-full border border-signal/30 bg-signal/10 blur-xl sm:-right-20 sm:-top-20 sm:size-48" />
						<Card className="relative rotate-2 overflow-hidden border-border bg-card shadow-2xl shadow-foreground/10 transition-transform duration-500 hover:rotate-0">
							<div className="relative aspect-[1.16] overflow-hidden bg-[#24282b]"><Image src="/devpill.png" alt="devpill.me logo with builder and pill emojis" fill priority sizes="(min-width: 1024px) 31rem, 90vw" className="object-cover opacity-95" /></div>
							<CardContent className="p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow text-signal">The premise</p><p className="mt-3 max-w-sm text-lg font-semibold leading-7 tracking-[-0.03em]">The best way to learn a system is to follow your curiosity through it.</p></div><span className="text-2xl">🧪</span></div><div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground"><span>devpill.me / 2022 → now</span><span className="font-mono">v1.0</span></div></CardContent>
						</Card>
						<div className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-background px-4 py-3 shadow-xl sm:-left-8"><p className="eyebrow text-muted-foreground">currently indexing</p><p className="mt-1 text-sm font-bold">Ethereum + its wider ecosystem</p></div>
					</div>
				</section>

				<section className="border-y border-border bg-background/55"><div className="mx-auto grid max-w-[1440px] gap-px bg-border sm:grid-cols-3">{promises.map(({ icon: Icon, label, text }) => <div key={label} className="bg-background/80 px-5 py-8 sm:px-8 lg:px-12"><Icon size={22} weight="duotone" className="text-cyan" /><p className="mt-5 font-bold tracking-[-0.02em]">{label}</p><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div></section>

				<section className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow text-cyan">A map, not a maze</p><h2 className="display-face mt-3 text-4xl font-extrabold leading-none sm:text-6xl">Pick a direction.</h2></div><Link href="/docs/" className="inline-flex items-center gap-2 text-sm font-bold text-cyan hover:text-signal">See every section <ArrowUpRight size={16} /></Link></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{navigation.slice(0, 6).map((section, index) => <Link key={section.route} href={section.route} className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-cyan/40 hover:shadow-lg hover:shadow-cyan/5"><div className="flex items-center justify-between"><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span><ArrowRight size={17} className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-signal" /></div><h3 className="mt-12 text-xl font-bold tracking-[-0.04em] group-hover:text-cyan">{section.title}</h3><p className="mt-2 text-sm text-muted-foreground">{section.items.length} notes to explore</p></Link>)}</div></section>

				<section className="border-t border-border"><div className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow text-signal">From the archive</p><h2 className="display-face mt-3 text-4xl font-extrabold leading-none sm:text-6xl">Fresh from the trail.</h2></div><Link href="/blog/" className="hidden items-center gap-2 text-sm font-bold text-cyan hover:text-signal sm:inline-flex">All notes <ArrowUpRight size={16} /></Link></div><div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">{posts.map((post) => <Link key={post.route} href={post.route} className="group flex items-center justify-between gap-5 p-5 transition-colors hover:bg-muted sm:p-7"><div><p className="eyebrow text-muted-foreground">{post.date ? new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(new Date(post.date)) : "Field note"}</p><h3 className="mt-3 text-xl font-bold tracking-[-0.03em] group-hover:text-cyan sm:text-2xl">{post.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{post.lead || post.description}</p></div><ArrowRight size={20} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-signal" /></Link>)}</div><Link href="/blog/" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan hover:text-signal sm:hidden">All notes <ArrowUpRight size={16} /></Link></div></section>

				<section className="mx-auto max-w-[1120px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12"><div className="rounded-3xl border border-border bg-card p-7 sm:p-10 lg:p-14"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow text-cyan">Keep going</p><h2 className="display-face mt-4 max-w-xl text-4xl font-extrabold leading-none sm:text-6xl">Good systems reward patient questions.</h2><p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">Read one note. Follow one link. Build one small thing. Then come back with a better question.</p></div><Link href="/docs/introduction/foreword/" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/85">Open the guide <BookOpen size={17} weight="bold" /></Link></div></div></section>
			</main>
		</SiteShell>
	);
}
