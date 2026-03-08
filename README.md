# ParaPixel DigiServices - Official Website

<p align="center">
	<img src="./public/logo.svg" alt="ParaPixel logo" width="84" />
</p>

<p align="center">
	Brutalist, high-performance digital agency website built with Next.js, React, GSAP, Lenis, and React Three Fiber.
</p>

<p align="center">
	<a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.1.6-000000?logo=nextdotjs&logoColor=white" /></a>
	<a href="https://react.dev"><img alt="React" src="https://img.shields.io/badge/React-19.2.3-20232A?logo=react&logoColor=61DAFB" /></a>
	<a href="https://tailwindcss.com"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white" /></a>
	<a href="https://threejs.org"><img alt="Three.js" src="https://img.shields.io/badge/Three.js-0.182.0-111111?logo=threedotjs&logoColor=white" /></a>
	<a href="https://gsap.com"><img alt="GSAP" src="https://img.shields.io/badge/GSAP-3.14.2-88CE02?logo=greensock&logoColor=white" /></a>
	<a href="https://ai.google.dev"><img alt="Gemini API" src="https://img.shields.io/badge/Gemini_API-gemini--2.5--flash-4285F4?logo=google&logoColor=white" /></a>
</p>

![ParaPixel Open Graph](./public/og-image.png)

## Overview

This repository contains the official website for **ParaPixel DigiServices**, a digital agency focused on:

- Immersive 3D web experiences
- Mobile app development
- SaaS product engineering
- SEO and digital growth
- Creative marketing execution

The site includes animated service storytelling, horizontal work showcase, process sections, client testimonials, an AI consultation chatbot, and a lead capture overlay with calendar booking.

## Live Brand Links

- Website: [https://parapixel.net](https://parapixel.net)
- LinkedIn: [https://linkedin.com/company/parapixel](https://linkedin.com/company/parapixel)
- Booking: [https://cal.com/parapixel/intro](https://cal.com/parapixel/intro)
- Contact: [hello@parapixel.net](mailto:hello@parapixel.net)

## Core Features

- Custom brutalist UI direction with motion-heavy interactions
- GSAP timelines and ScrollTrigger-based scene choreography
- Smooth scrolling via Lenis (`@studio-freight/react-lenis`)
- React Three Fiber canvas background with responsive 3D knots
- Full-screen animated menu and CTA-driven lead flow
- Contact overlay with Web3Forms submission and INR/USD budget toggle
- AI chatbot (`/api/chat`) powered by Google Generative AI streaming
- SEO-ready metadata (Open Graph, Twitter cards, robots)
- Local and Google font pipeline via `next/font`

## Tech Stack

- Framework: Next.js `16.1.6` (App Router)
- Runtime: React `19.2.3`
- Styling: Tailwind CSS v4 + custom global CSS
- Animation: GSAP + ScrollTrigger + `@gsap/react`
- 3D: Three.js + React Three Fiber + Drei
- Scrolling: Lenis
- AI: Google Generative AI (`gemini-2.5-flash`)
- Validation/utility libraries present: `zod`, `zustand`

## Project Structure

```text
src/
	app/
		api/chat/route.js       # Edge API route for streaming AI responses
		globals.css             # Global styles, utilities, animation keyframes
		layout.js               # Fonts, metadata, root wrappers
		page.js                 # Main homepage experience
		process/page.js         # Process storytelling page
		work/page.js            # Work showcase page
	components/
		ChatBot.js              # Floating AI assistant UI
		CustomCursor.js         # Custom cursor and hover states
		SmoothScroll.js         # Lenis root wrapper
		SplitText.js            # Utility text splitter for animation
		canvas/
			Scene.js              # R3F animated knot scene
			SceneContainer.js     # Client-only dynamic canvas loader
public/
	*.png, *.svg             # Project visuals, logos, testimonials, previews
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

Without this key, the chatbot API route (`/api/chat`) will return an error response.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## NPM Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Routes

- `/` - Main landing page and primary conversion flow
- `/work` - Extended portfolio/work gallery
- `/process` - Process storytelling page
- `/api/chat` - Streaming AI consultation endpoint (Edge runtime)

## Brand + SEO Configuration

Metadata is configured in `src/app/layout.js` and includes:

- Open Graph image: `public/og-image.png`
- Twitter card setup
- Robots indexing rules
- Custom tab icons using `public/logo.svg`

## Deployment

This app is production-ready for Vercel or any Node-compatible deployment target that supports modern Next.js App Router.

Recommended production steps:

```bash
npm run build
npm run start
```

## Notes For Maintainers

- Ensure `GOOGLE_GENERATIVE_AI_API_KEY` is configured in production secrets.
- Contact form access key is currently embedded in `src/app/page.js` (Web3Forms flow).
- `next.config.mjs` allows remote images from `res.cloudinary.com`.
- `next.config.mjs` currently ignores TypeScript build errors.

## Ownership

Built for **ParaPixel DigiServices** official web presence.