import Image from "next/image";
import { site } from "@/lib/site";

export function Logo({ height }: { height: number }) {
	const width = Math.round((height * 1040) / 168);
	return (
		<>
			<Image src="/logo-light.png" alt={site.name} width={width} height={height} className="dark:hidden" />
			<Image src="/logo-dark.png" alt={site.name} width={width} height={height} className="hidden dark:block" />
		</>
	);
}
