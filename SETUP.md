# MindWaveAI — Setup & Deployment Guide

## Prerequisites

- Node.js 18.17+
- npm or pnpm
- Git
- Vercel account (for deployment)
- Supabase account
- Resend account
- Calendly account (for book-call page)

---

## 1. Local Development Setup

### Clone and install dependencies

```bash
git clone https://github.com/your-org/mindwaveai-site.git
cd mindwaveai-site
npm install
```

### Configure environment variables

```bash
cp .env.example .env.local
```

Fill in all values in `.env.local`. See comments in the file for where to get each value.

### Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 2. Database Setup (Supabase)

### Create a new Supabase project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Create a new project
3. Copy your **Project URL** and **Service Role Key** from Settings → API

### Run the schema

1. In Supabase, go to SQL Editor
2. Open `supabase/schema.sql` from this project
3. Paste and run the entire contents

This creates:
- `contacts` table — stores all inbound form submissions
- `blog_posts` table — manages blog content dynamically
- Proper indexes and Row Level Security policies

---

## 3. Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain (`mindwaveai.co`)
3. Create an API key
4. Add to `.env.local` as `RESEND_API_KEY`
5. Set `ADMIN_EMAIL` to the email that should receive lead notifications

**DNS records for Resend domain verification:**
Follow Resend's documentation for adding SPF, DKIM, and DMARC records.

---

## 4. Calendly Integration

1. Create a Calendly account at [calendly.com](https://calendly.com)
2. Create an event type: "30-Minute AI Workflow Audit"
3. Copy the event URL (e.g., `https://calendly.com/yourname/ai-workflow-audit`)
4. Set as `NEXT_PUBLIC_CALENDLY_URL` in your environment

---

## 5. CRM Webhook (Optional)

To send leads to your CRM automatically:

### Option A: Zapier
1. Create a Zapier webhook trigger
2. Copy the webhook URL to `CRM_WEBHOOK_URL`
3. Connect it to HubSpot, Salesforce, Pipedrive, or any CRM

### Option B: Make (Integromat)
1. Create a Make scenario with a Webhook module
2. Copy the webhook URL to `CRM_WEBHOOK_URL`

### Option C: Direct CRM API
Modify `lib/webhook.ts` to call your CRM's API directly.

---

## 6. Vercel Deployment

### Initial deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment variables in Vercel

In your Vercel project dashboard:
1. Go to Settings → Environment Variables
2. Add all variables from `.env.example` with their production values
3. Redeploy for changes to take effect

### Custom domain

1. In Vercel: Settings → Domains
2. Add `mindwaveai.co` and `www.mindwaveai.co`
3. Follow Vercel's DNS configuration instructions
4. SSL is automatically provisioned

---

## 7. SEO Checklist

Before going live:

- [ ] Update `NEXT_PUBLIC_SITE_URL` to your production domain
- [ ] Create and upload `/public/og-image.png` (1200×630px)
- [ ] Create and upload `/public/favicon.ico` and apple touch icons
- [ ] Update Calendly URL to your actual booking link
- [ ] Verify Google Search Console ownership
- [ ] Submit sitemap: `https://mindwaveai.co/sitemap.xml`
- [ ] Test structured data with Google's Rich Results Test

---

## 8. Project Structure

```
mindwaveai-site/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Navbar/Footer
│   ├── page.tsx                 # Homepage
│   ├── services/page.tsx        # Services page
│   ├── case-studies/page.tsx    # Case studies listing
│   ├── about/page.tsx           # About page
│   ├── blog/
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/page.tsx      # Dynamic blog post
│   ├── contact/page.tsx         # Contact form
│   ├── book-call/page.tsx       # Calendly booking
│   ├── privacy-policy/page.tsx  # Legal
│   ├── terms/page.tsx           # Legal
│   ├── api/
│   │   └── contact/route.ts     # Contact form API
│   ├── sitemap.ts               # Dynamic sitemap
│   ├── robots.ts                # Robots.txt
│   └── not-found.tsx            # 404 page
├── components/
│   ├── animations/              # Framer Motion wrappers
│   ├── layout/                  # Navbar, Footer
│   ├── sections/                # Page sections
│   └── ui/                      # Design system components
├── lib/
│   ├── db.ts                    # Supabase client and queries
│   ├── email.ts                 # Resend email functions
│   ├── rate-limit.ts            # In-memory rate limiter
│   ├── validations.ts           # Zod schemas
│   ├── utils.ts                 # Shared utilities
│   └── webhook.ts               # CRM webhook trigger
├── types/
│   └── index.ts                 # TypeScript type definitions
├── supabase/
│   └── schema.sql               # Database schema
├── public/                      # Static assets
├── .env.example                 # Environment template
└── tailwind.config.ts           # Design system tokens
```

---

## 9. Performance Targets

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse SEO: 100
- Largest Contentful Paint: < 2.5s
- First Input Delay: < 100ms
- Cumulative Layout Shift: < 0.1

---

## 10. Adding Blog Posts

**Option A: Via Supabase Dashboard**
1. Go to Supabase → Table Editor → blog_posts
2. Insert a new row with your content
3. Set `published: true` when ready to go live

**Option B: Via SQL**
```sql
INSERT INTO blog_posts (slug, title, excerpt, content, category, author_name, published, published_at, read_time)
VALUES ('your-post-slug', 'Your Post Title', 'Brief excerpt...', '# Markdown content here', 'Strategy', 'Your Name', true, NOW(), 8);
```

---

## Support

For questions or issues, contact: hello@mindwaveai.co
