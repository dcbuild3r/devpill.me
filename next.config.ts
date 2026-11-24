import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Every content route and internal link ends in a slash, as the original Hugo site's URLs did.
	trailingSlash: true,
	poweredByHeader: false,
	async headers() {
		return [{
			source: "/:path*",
			headers: [
				{ key: "X-Content-Type-Options", value: "nosniff" },
				{ key: "X-Frame-Options", value: "DENY" },
				{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
				{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
			],
		}];
	},
};

export default nextConfig;
