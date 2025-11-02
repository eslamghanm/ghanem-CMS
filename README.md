# Ghanem Dental — Dental Cost

Modern Angular app to manage patients, treatments, and invoices for Ghanem Dental Clinic. All data is stored locally in the browser via `localStorage` under key `gh_dental_v1` — no backend required.

## Quick Start

- Requirements: Node 18+ and npm.
- Install: `npm install`
- Run dev: `npm start` then open `http://localhost:4200`
- Build: `npm run build`
- Unit tests: `npm test`
- E2E tests (optional): `npm run e2e` (uses Cypress)

On first run, the app auto-loads seed data from `src/assets/seed/seed.json` (patients, treatments, invoices, settings) if no data exists.

## Features

- Dashboard with KPI cards and sparkline
- Patients: create/edit, search, filter, pagination
- Treatments: catalog with add/edit and bulk import
- Invoices: builder (select patient, add treatments, discount, tax), save draft/paid, print view, export JSON/CSV
- Settings: clinic name, currency (EGP), tax, rounding, theme, export/import data, clear data
- UX polish: responsive layout, Tailwind styling, dark mode toggle, toasts, smooth modal
- Accessibility: keyboard-friendly forms, semantic HTML

## Architecture

- Angular 17 (module-based), TypeScript, Angular CLI
- Tailwind CSS for styling, dark mode via `class` method
- Feature modules (lazy): `dashboard`, `patients`, `treatments`, `invoices`, `settings`, `shared`
- Services with `BehaviorSubject` state synced to `localStorage`
- Models: `Patient`, `Treatment`, `Invoice`, `ClinicSettings`
- Storage versioning and migration-ready structure

## LocalStorage Schema

Root key `gh_dental_v1` stores:

- `version`: number
- `patients`: Patient[]
- `treatments`: Treatment[]
- `invoices`: Invoice[]
- `settings`: ClinicSettings

## Repo Layout

- `src/app/core/models/*` — interfaces
- `src/app/core/services/*` — LocalStorage, Patients, Treatments, Invoices, Settings, Toast, Theme, Seed
- `src/app/core/utils/*` — helpers (uid, invoice-calc)
- `src/app/features/*` — feature modules and components
- `src/assets/seed/seed.json` — seed data
- `tailwind.config.js`, `postcss.config.js` — Tailwind setup

## One‑Minute Walkthrough

1. Open app → Dashboard shows revenue/metrics and a sparkline.
2. Add a patient in Patients → “Save Patient” (toast confirms).
3. Add or import treatments in Treatments.
4. Build an invoice in Invoices → select patient, add treatments, set discount → Save Draft or Save Paid. Use Print link for a clean print page.
5. Settings → set tax/currency/theme, export/import or clear data.

Data persists across reloads via localStorage.

## Environment

- Angular CLI: 17.x (Angular 16+ compatible code style)
- Tailwind CSS: 3.x

## Notes

- For PWA, add `@angular/pwa` and configure service worker (optional).
- For CI, add a GitHub Actions workflow to `/.github/workflows` (optional).
