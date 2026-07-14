# TrackPoint

A full-stack CRM (Customer Relationship Management) app built with Next.js, Prisma, and PostgreSQL. Track leads, convert them into deals, move deals through a sales pipeline, manage tasks, and view revenue/conversion reports — with Google OAuth login and a Razorpay-powered paid tier.

**Live demo:** [https://track-point.vercel.app/](https://track-point.vercel.app/)

---

## Features

- **Lead management** — create, edit, and track leads through a status pipeline (New → Contacted → In Progress → Qualified → Converted / Unqualified / Lost)
- **Deal pipeline** — convert qualified leads into deals and move them through pipeline stages (New → Contacted → Qualified → Proposal → Closed Won / Closed Lost)
- **Task manager** — simple per-user to-do list with priority and due dates
- **Dashboard & reports** — total leads, deals won, revenue, conversion rate, and a month-by-month breakdown
- **Auth** — Google OAuth via NextAuth.js
- **Payments** — Razorpay checkout to upgrade from the Free plan (10 leads) to Pro (500 leads), with server-side HMAC signature verification before upgrading a user's plan
- **Transactional email** — invoice, proposal, and follow-up emails sent via Nodemailer

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) + TypeScript |
| Auth | [NextAuth.js](https://next-auth.js.org) (Google OAuth) |
| ORM / DB | [Prisma](https://www.prisma.io) + PostgreSQL |
| Payments | [Razorpay](https://razorpay.com) |
| Email | [Nodemailer](https://nodemailer.com) |
| Styling | Tailwind CSS + shadcn/ui + Radix primitives |
| Charts | Recharts |
| Hosting | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com), or local Postgres)
- A [Google OAuth](https://console.cloud.google.com/apis/credentials) client ID/secret
- A [Razorpay](https://dashboard.razorpay.com/) account (test mode is fine for local dev)
- A Gmail account with an [app password](https://myaccount.google.com/apppasswords) for sending email via SMTP

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/TrackPoint.git
cd TrackPoint
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Razorpay
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="your-razorpay-key-id"

# Email (Gmail SMTP)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-gmail-app-password"
CONTACT_RECEIVER="where-contact-form-submissions-should-go@example.com"
```

### 3. Set up the database

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  api/              # Route handlers (leads, deals, tasks, auth, payments, email)
  dashboard/        # Main authenticated dashboard
  product/          # Marketing pages for each feature (lead mgmt, pipeline, reports, tasks)
  login/            # Sign-in page
lib/
  authoptions.ts    # NextAuth configuration
  prisma.ts         # Prisma client singleton
  mailer.ts         # Shared Nodemailer helper
  getOrCreateUser.ts
prisma/
  schema.prisma     # Data models: User, Lead, Deal, Task
  migrations/
context/
  dealscontext.tsx  # React Context for shared deal state
components/
  ui/               # shadcn/ui components
```

## Database Schema (high level)

- **User** — account info, plan (`FREE` / `PAID`)
- **Lead** — a potential customer, with a status enum, belongs to a User
- **Deal** — created from a converted lead (1:1), moves through pipeline stages, belongs to a User
- **Task** — a simple to-do item, belongs to a User

See `prisma/schema.prisma` for the full definitions.

## Known Limitations

This is a personal/portfolio project, not a production-hardened SaaS. Known gaps as of this writing:

- The Credentials (email/password) auth provider is registered but not fully implemented — password hashing/verification hasn't been wired in. Use Google sign-in.
- A few API routes are missing consistent ownership checks (deal mutation endpoints in particular). Treat this as a project in active hardening, not something to expose to real user data without a security pass.
- No automated test suite yet.
- No rate limiting on public forms (contact, subscribe).

Contributions and issue reports welcome.

## License

See [LICENSE](./LICENSE).
