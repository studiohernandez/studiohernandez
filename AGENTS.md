# Project guide

## Overview

This is the German-language portfolio site for Studio Hernández. It is a single-page, editorial architecture presentation built with TanStack Start and deployed on Netlify.

## Architecture

- `src/routes/index.tsx` contains the homepage sections and reusable project, service, and link components.
- `src/routes/__root.tsx` provides the German document shell and SEO/share metadata.
- `src/styles.css` defines the visual system, responsive layouts, interaction states, and reduced-motion behavior.
- `public/img/` contains five source photographs. Markup requests optimized WebP derivatives through Netlify Image CDN.
- `src/router.tsx`, `vite.config.ts`, and `netlify.toml` provide framework and deployment configuration.

## Conventions

Keep content semantic and German-language. Use PascalCase for React components and BEM-style class names for custom CSS. Preserve the restrained off-white, charcoal, hairline-rule visual system; avoid cards, shadows, rounded controls, and saturated color. New project images should be local assets, served through `/.netlify/images`, with descriptive alt text. Animation must remain subtle and respect `prefers-reduced-motion`.

## Non-obvious decisions

Project photography is shown in grayscale via CSS and returns to restrained color on hover. The contact call-to-action uses a direct email link because no public address, phone number, or form-processing requirement was provided. Google-hosted Manrope and Newsreader provide the editorial sans/italic contrast.
