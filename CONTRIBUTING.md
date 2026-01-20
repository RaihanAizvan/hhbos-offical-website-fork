# Contributing

Thanks for contributing to the HH Back Office Services website.

## Tech stack
- Frontend: Vite + React + TypeScript, Tailwind CSS, shadcn/ui
- Backend: PHP mail API (`backend/api/send-mail.php`) using PHPMailer + phpdotenv

## Getting started

### Frontend
```bash
npm install
npm run dev
```

### Backend (mail API)
```bash
php -S localhost:8000 -t backend
```

Create a local `.env` at the repo root for SMTP settings (see `README.md`).

## Development guidelines
- Keep UI components in `src/components/` and reuse existing shadcn/ui primitives in `src/components/ui/`.
- Prefer small, focused components and keep page-level code in `src/pages/`.
- Keep styling consistent with Tailwind utility patterns used in the codebase.
- Avoid hard-coding environment-specific values (URLs, keys). Prefer Vite envs (`import.meta.env`) for frontend config.

## Code quality
- Run lint before opening a PR:
```bash
npm run lint
```
- Ensure `npm run build` succeeds before submitting changes.

## Pull requests
- Write a clear description of the change and why it’s needed.
- Include screenshots/screen recordings for UI changes when relevant.
- If you change contact-form behavior, verify it against the PHP mail endpoint.

## Security
- Never commit secrets (SMTP passwords, API keys). Use `.env` locally and share secrets out-of-band.
