# CourseGram

Rebooted landing experience built with React, Vite and Tailwind CSS. UI components live under `src/components` and page routes in `src/pages`. Global layout and navigation sit in `src/layout`.

## Scripts

```bash
npm install       # install dependencies
npm run dev       # run front-end and API server together
npm run build     # production build
npm test          # unit tests
npm run lint      # lint codebase
npm run test:e2e  # Cypress smoke tests
```

## AI Wizard Flow

Set the following environment variables before running the wizard and API server:

```bash
VITE_OPENAI_API_URL=https://api.openai.example.com
VITE_STRIPE_PK=pk_test_XXXXXXXXXXXXXXXX
OPENAI_KEY=<your-openai-secret>
PORT=3001
```

These keys power the pricing and marketing steps during the AI onboarding flow.
Click **Start Free Store** on the home page to begin. At any time you can click
“Exit Wizard” in the top‑right corner to clear your progress and return home.

Run both servers in one command:

```bash
npm run dev
```

To run only the API server use:

```bash
npm run server
```
The API server listens on `http://localhost:3001` by default. Create a `.env` file in the project root:

```bash
OPENAI_KEY=sk-...
PORT=3001
```
