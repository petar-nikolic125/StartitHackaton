# 🪄 AI Business Coach

Launch and grow your business in _4 minutes — no code required._  
This single-page React application uses generative AI to create a fully-configured smart-link storefront, complete with payments, analytics, branding, and 24/7 founder support.

<p align="center">
  <img src="docs/screenshot-hero.png" width="600" alt="Hero section">
  <br/>
  <sub>Hero section (gradient headline, animated card, call-to-action)</sub>
</p>

---

## ✨ Features

| Category                  | What you get                          |
| ------------------------- | ------------------------------------- |
| _AI Quick-start_          | Automated shop set-up in minutes      |
| _Instant Payments_        | Stripe / Apple Pay auto-integration   |
| _AI Insights & Forecasts_ | Predictive analytics on what sells    |
| _Smart Link_              | One link that routes shoppers with AI |
| _AI Branding_             | Logo, palette & typography in seconds |
| _24 / 7 Founder Support_  | Always-on chat powered by GPT-4o      |

---

## 🏗 Tech Stack

| Layer             | Choices                                               |
| ----------------- | ----------------------------------------------------- |
| _Frontend_        | React + Vite, TypeScript, Tailwind CSS, Framer-Motion |
| _Design System_   | CSS variables, Radix UI primitives                    |
| _Auth / Payments_ | Firebase Auth, Stripe Checkout                        |
| _AI Services_     | OpenAI API (GPT-4o) for business advice & branding    |
| _Lint & Format_   | ESLint, Prettier, Husky + lint-staged                 |
| _CI / CD_         | GitHub Actions → Vercel preview & production deploys  |

---

## 📂 Folder Structure (src)

```text
├─ assets/          # Static images, SVGs, lottie animations
├─ components/      # Reusable UI atoms & molecules
│  ├─ Button.tsx
│  ├─ Card.tsx
│  └─ ...
├─ features/        # Domain slices (pricing, founders, smart-link wizard…)
├─ hooks/           # Custom React hooks
├─ lib/             # API clients (openai, stripe, firebase)
├─ pages/           # Top-level routed pages (/, /#features, /pricing …)
├─ styles/          # Tailwind config & global CSS variables
└─ main.tsx         # App entry
```
