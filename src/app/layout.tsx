import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { site } from "@/lib/site";
import "./globals.css";

const body = Hanken_Grotesk({ variable: "--font-body", subsets: ["latin"] });
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], weight: "700" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
	title: { default: `${site.name} - ${site.tagline}`, template: `%s | ${site.name}` },
	description: site.description,
	metadataBase: new URL(site.url),
	icons: {
		icon: [
			{ url: "/icon-light.png", type: "image/png", sizes: "320x320", media: "(prefers-color-scheme: light)" },
			{ url: "/icon-dark.png", type: "image/png", sizes: "320x320", media: "(prefers-color-scheme: dark)" },
		],
	},
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0e1217" },
	],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${body.variable} ${display.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col antialiased`}>
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
