import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="shell max-w-[760px] py-16 text-center sm:py-24">
			<p className="eyebrow text-primary">404 / page not found</p>
			<h1 className="display-face mt-5 text-4xl font-bold sm:text-5xl">That page is not here.</h1>
			<p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-muted-foreground">The page you are looking for does not exist, but there is plenty more to explore.</p>
			<Button asChild size="lg" className="mt-8">
				<Link href="/docs/">Browse the guide</Link>
			</Button>
		</div>
	);
}
