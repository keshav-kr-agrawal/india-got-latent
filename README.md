# India’s Got Latent – Official Platform

![Logo](/file.svg)

> **India’s Got Latent** is a premium live‑entertainment web platform that blends stand‑up comedy, talent discovery, creator participation, and unfiltered audience interaction. Think of it as the official digital home for India’s most chaotic talent stage.

---

## 📖 Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development Scripts](#development-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Demo

Live demo: <http://localhost:3000/> (runs locally)

> The repository is already set up with a **GitHub remote** (`origin`). After the initial push you can view the repository at:
> 
> `https://github.com/keshav-kr-agrawal/india-got-latent`

---

## ✨ Features

- **Dynamic Episodes** – Latest show automatically promoted to the top of the playlist.
- **Team Gallery** – Accurate, locally‑hosted portraits (`/public/assets/team/*.jpg`).
- **Hero Section** – Responsive, dark‑mode‑friendly background with smooth gradient overlay.
- **Sponsor Tiers** – Title, Presenting, Associate, Partner with clear badge styling.
- **Merch Store** – Fully responsive product cards, size selection, and limited‑drop handling.
- **Live‑Show Booking** – Seat categories (VIP, Premium, Regular) with real‑time availability.
- **Community Posts** – Voting, challenges, talent ideas, and meme feed.
- **SEO‑Ready** – Metadata, keywords, and favicon (`/file.svg`).
- **Accessibility** – Semantic HTML, proper heading hierarchy, and ARIA‑friendly components.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | **Next.js 14** (React 18, TypeScript) |
| **Styling** | Tailwind CSS (utility‑first, dark mode enabled) |
| **UI Components** | Custom component library under `src/components/ui/` |
| **State Management** | Zustand (lightweight stores in `src/lib/`) |
| **Data** | Static data files (`src/lib/data.ts`) – episodes, guests, sponsors, etc. |
| **Assets** | Local images under `public/assets/` – no external CDN links |
| **Deployment** | Vercel (or any Node.js host) |

---

## 📦 Getting Started

### Prerequisites

- **Node.js** >= 18 (recommended latest LTS) 
- **npm** (comes with Node) 
- **Git**

### Clone & Install

```bash
# Clone the repo (already pushed to GitHub)
git clone https://github.com/keshav-kr-agrawal/india-got-latent.git
cd india-got-latent

# Install dependencies
npm install
```

### Run locally

```bash
npm run dev
```

The development server will start at `http://localhost:3000`. The site supports hot‑module reloading, so any file change is reflected instantly.

---

## 🛠️ Development Scripts

| Script | Description |
|--------|-------------|
| `dev` | Starts Next.js in development mode (`npm run dev`). |
| `build` | Creates an optimized production build (`npm run build`). |
| `start` | Runs the production build locally (`npm start`). |
| `lint` | Runs ESLint & Prettier checks. |

---

## 📤 Deployment

The project is ready for **Vercel** (recommended) or any Node.js compatible platform.

1. Connect your GitHub repository to Vercel.
2. Set the build command to `npm run build` and the output directory to `.next`.
3. Vercel will automatically handle the **favicon** (`/file.svg`) and the **static assets** under `public/`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository.
2. Create a feature branch: `git checkout -b feature/awesome-feature`.
3. Make your changes, ensuring the UI remains **responsive** and **visually premium** (smooth gradients, modern typography, micro‑animations).
4. Run `npm run lint` and fix any issues.
5. Submit a pull request with a clear description of what you changed.

---

## 📜 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## 🙏 Acknowledgements

- **Next.js team** – for the powerful React framework.
- **Tailwind Labs** – for the utility‑first CSS engine.
- **All creators & contributors** who helped build the platform.

---

*Built with ❤️ by the India’s Got Latent team.*
