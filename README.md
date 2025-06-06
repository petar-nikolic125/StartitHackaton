# CourseGram

Rebooted landing experience built with React, Vite and Tailwind CSS. UI components live under `src/components` and page routes in `src/pages`. Global layout and navigation sit in `src/layout`.

## Scripts

```bash
npm install       # install dependencies
npm run dev       # start dev server
npm run build     # production build
npm test          # unit tests
npm run lint      # lint codebase
npm run test:e2e  # Cypress smoke tests
```

## AI Wizard Flow

Set the following environment variables before running the wizard:

```bash
VITE_OPENAI_API_URL=<your-ai-endpoint>
VITE_STRIPE_PK=<your-stripe-publishable-key>
```

These keys power the pricing and marketing steps during the AI onboarding flow.
