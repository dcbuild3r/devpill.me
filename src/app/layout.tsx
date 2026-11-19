import type { Metadata, Viewport } from "next";
import { Jost, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { site } from "@/lib/site";
import "./globals.css";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
	title: { default: `${site.name} - ${site.tagline}`, template: `%s | ${site.name}` },
	description: site.description,
	metadataBase: new URL(site.url),
	icons: { icon: "/pill.png" },
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#212529" },
	],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${jost.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col antialiased`}>
				<ThemeProvider>
					<a href="#main-content" className="skip-link">Skip to main content</a>
					<SiteHeader />
					<main id="main-content" className="flex-1">{children}</main>
					<SiteFooter />
				</ThemeProvider>
			</body>
		</html>
	);
}
