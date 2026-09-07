import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
	title: { default: "devpill.me — Public-good blockchain guide", template: "%s | devpill.me" },
	description: "A public-good blockchain development guide for curious builders.",
	metadataBase: new URL("https://www.devpill.me"),
	openGraph: { title: "devpill.me", description: "A public-good blockchain development guide for curious builders.", url: "https://www.devpill.me", siteName: "devpill.me", type: "website" },
	icons: { icon: "/pill.png" },
	robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <html lang="en" suppressHydrationWarning><body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}><ThemeProvider>{children}</ThemeProvider></body></html>;
}
