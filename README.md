# devpill.me

devpill.me is a public-good blockchain development guide for people who want to understand the systems they are building on, and then make something of their own.

## Stack

The site is a Next.js 16 App Router application built with React 19 and TypeScript. Bun is used for dependency management and scripts. The interface uses Tailwind CSS 4, shadcn/ui components built on Radix UI primitives, next-themes for light and dark mode, and Lucide and Phosphor icons.

Guide content lives in Markdown files under `content/en/`. gray-matter parses front matter, while react-markdown and remark-gfm render the article content. Next.js generates the content routes at build time, and the site is deployed on Vercel.

## Run locally

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
bun run typecheck
bun run lint
bun run build
```

The author is [dcbuilder.eth](https://dcbuilder.dev). Source is available in this [GitHub repository](https://github.com/dcbuild3r/devpill.me).
