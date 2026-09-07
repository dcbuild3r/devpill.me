import type { Metadata, Viewport } from "next";
import { Jost, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
	title: { default: "devpill.me - Public-good blockchain guide", template: "%s | devpill.me" },
	description: "A public-good blockchain development guide for curious builders.",
	metadataBase: new URL("https://www.devpill.me"),
	openGraph: { title: "devpill.me", description: "A public-good blockchain development guide for curious builders.", url: "https://www.devpill.me", siteName: "devpill.me", type: "website" },
	icons: { icon: "/pill.png" },
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#212529" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <html lang="en" suppressHydrationWarning><body className={`${jost.variable} ${jetbrainsMono.variable} antialiased`}><ThemeProvider>{children}</ThemeProvider></body></html>;
}
