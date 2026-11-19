import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Every content route and internal link ends in a slash, as the original Hugo site's URLs did.
	trailingSlash: true,
};

export default nextConfig;
