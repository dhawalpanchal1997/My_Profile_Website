# Dhawal Panchal Portfolio

A modern AI Engineer portfolio built with Next.js, React, Tailwind CSS, and Framer Motion. The site showcases professional experience, featured projects, skills, contact details, and a polished interactive UI with premium glassmorphism styling and motion-driven sections.

## Overview

This repository contains a personal portfolio website for **Dhawal Panchal** focused on:

- GenAI systems
- Agentic workflows
- RAG and MCP-driven platforms
- Full-stack engineering
- Cloud-native product delivery

The experience is designed to feel clean, futuristic, and professional while staying highly readable and accessible.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Features

- Premium sticky navbar with animated active state and responsive mobile menu
- Interactive hero section with motion, spotlight effects, and rotating impact scenarios
- Structured sections for About, Experience, Projects, Skills, and Contact
- Reusable glass-style surface components and soft-glow visual system
- Scroll-aware navigation using section spy behavior
- Responsive layout optimized for desktop first, with tablet and mobile support
- Smooth motion with reduced-motion fallbacks

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```text
.
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── projects/page.tsx
│   ├── components/
│   ├── data/
│   ├── hooks/
│   └── styles/
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Where To Edit Content

Most portfolio content is centralized in:

- [`src/data/resumedata.ts`](/Users/dhawalpanchal/Documents/My_Profile_Website-main/src/data/resumedata.ts)

You can update:

- personal links and resume URL
- hero messaging
- STAR-style scenario highlights
- experience entries
- skill categories

## Key UI Files

- [`src/app/page.tsx`](/Users/dhawalpanchal/Documents/My_Profile_Website-main/src/app/page.tsx): homepage composition
- [`src/components/Navbar.tsx`](/Users/dhawalpanchal/Documents/My_Profile_Website-main/src/components/Navbar.tsx): sticky navigation and CTA
- [`src/components/Hero.tsx`](/Users/dhawalpanchal/Documents/My_Profile_Website-main/src/components/Hero.tsx): hero section and animated highlights
- [`src/styles/globals.css`](/Users/dhawalpanchal/Documents/My_Profile_Website-main/src/styles/globals.css): color tokens, background system, and shared visual styles

## Styling Notes

The portfolio uses a custom visual language built around:

- deep navy backgrounds
- cyan and sky-blue accents
- translucent layered surfaces
- soft gradients and glows
- rounded pill-based navigation and components

## Accessibility

This project includes:

- visible focus states
- keyboard-friendly navigation
- high-contrast text treatments
- reduced-motion support for users who prefer less animation

## Deployment

This app can be deployed to any platform that supports Next.js, including:

- Vercel
- Netlify
- AWS
- Docker-based hosting

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## License

This repository is currently unlicensed. Add a license if you plan to distribute or open-source it publicly.
