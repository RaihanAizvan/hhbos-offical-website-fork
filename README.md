# HH Back Office Services — Website

Marketing website for **HH Back Office Services Pvt Ltd**, showcasing back-office outsourcing offerings and providing a contact form that emails inquiries to the team.

## What’s inside

### Pages (React Router)
- `/` — Home (hero video, services overview, leadership, insights, CTA)
- `/about` — Company overview
- `/services` — Detailed service offerings
  - Revenue Cycle Management (RCM)
  - Finance & Accounts outsourcing
  - Database administration & management
- `/industries` — Industry-focused solutions (e.g., Healthcare, Finance & Banking, etc.)
- `/contact` — Contact details + inquiry form (submits to a mail API)

### Frontend
- **Vite + React + TypeScript**
- **Tailwind CSS** + shadcn/ui (Radix primitives)
- Animations: **GSAP** and **motion**
- Data/query utilities: **@tanstack/react-query** (used as app provider)

### Backend (mail API)
- PHP endpoint: `backend/api/send-mail.php`
- Uses **PHPMailer** + **phpdotenv** to send contact-form inquiries via SMTP.

## Local development

### Prerequisites
- Node.js (for the frontend)
- PHP 8+ (for the mail API)

### 1) Frontend
```bash
npm install
npm run dev
```
Vite will run on `http://localhost:8080`.

### 2) Backend (mail API)
The contact form posts to `http://localhost:8000/api/send-mail.php`, so start a PHP server from the `backend/` directory.

Example:
```bash
php -S localhost:8000 -t backend
```
That will expose:
- `http://localhost:8000/api/send-mail.php`

#### SMTP configuration
The mail API loads environment variables from a `.env` file at the **repo root**.

Create `.env` (not committed) with:
```bash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_EMAIL=your-smtp-user@example.com
SMTP_PASSWORD=your-smtp-password
MAIL_FROM_NAME="HH Back Office Services"
MAIL_TO=recipient@example.com
```

## Deployment notes
- The frontend is a static build (`npm run build`) produced by Vite.
- The backend is a small PHP API that must be hosted where PHP can run.
- The contact form currently uses a hard-coded dev URL:
  - `src/pages/Contact.tsx` → `fetch("http://localhost:8000/api/send-mail.php", ...)`
  - For production, point this to your deployed API (commonly via an env-based config such as `import.meta.env`).

## Project structure
- `src/` — React app (pages, components, UI kit)
- `public/` — static assets (images, background video)
- `backend/` — PHP mail API + Composer dependencies

## Scripts
- `npm run dev` — start local dev server
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
