# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are recruiters and hiring managers evaluating Achmad Ridho for full-time opportunities. They arrive with limited time, need to assess capability through real work, and should be able to start a conversation quickly. Secondary users are prospective freelance clients and developer peers interested in the projects, technical writing, and RSS feed.

The product owner is Achmad Ridho, who uses the private admin area to manage public projects, blog posts, and contact messages without changing code or redeploying.

## Product Purpose

This product is a public portfolio with a built-in custom CMS. It exists to present Achmad's work and writing, make his capabilities easy to evaluate, and provide a direct contact path. Success means a visitor can understand what Achmad builds, inspect a relevant project or post, and contact him without friction; the owner can keep the content current through the admin panel.

## Positioning

Achmad is positioned as an end-to-end product builder who can work across interface, backend, data, deployment, and operational tooling. The portfolio must demonstrate this through factual project evidence rather than relying on a generic fullstack label or an unverified claim.

## Operating Context

Public visitors follow the routes Home, Projects, project detail, Blog, post detail, tags, About, and Contact. A recruiter or hiring manager primarily scans the homepage, opens a project, and decides whether to initiate contact. Developer peers may continue to technical posts or RSS.

The owner signs in as a single administrator, creates or edits project and post content, uploads cover images, publishes or unpublishes content, and reviews or removes contact messages. Published content should appear on public routes after on-demand revalidation without a full redeploy.

## Capabilities and Constraints

- Public content is English; the admin interface is Bahasa Indonesia.
- Public routes include projects, project details, blog posts, tags, RSS, About, and a contact form.
- The private CMS supports single-admin authentication, project and post CRUD, markdown preview, tags, cover uploads, publish controls, and message read/delete actions.
- The implementation uses the existing Next.js 16 App Router, TypeScript, Prisma, Supabase Postgres and Storage, Auth.js credentials, Resend, Tailwind CSS, and Vercel delivery.
- The contact flow requires name, email, subject, and message, with honeypot and IP throttling. Public errors must not expose implementation details.
- The product is web-only, responsive, and must preserve the existing public functionality and factual content unless explicitly changed.
- Non-goals for the current release include multi-user authentication, third-party OAuth, comments, internal search, analytics, public mutation APIs, and editable static About content.
- The flagship project and the canonical case-study proof are not yet selected.

## Brand Commitments

- The product identity is Achmad Ridho, with the public role "Fullstack Developer".
- The site is based in Jakarta and currently communicates remote-friendly availability for full-time and freelance opportunities.
- The canonical contact email is `achmad.ridho.st@gmail.com`.
- Public communication should be direct, factual, and confident without inventing metrics, clients, testimonials, screenshots, demos, or outcomes.

## Evidence on Hand

- Product requirements and confirmed scope: `PRD.md`.
- Site identity and contact details: `src/lib/site.ts`.
- Existing project and post records are managed through Prisma and seeded in `prisma/seed.ts`.
- Existing public routes and CMS functionality are present in `src/app/` and `src/components/`.
- No additional verified demo, screenshot, project-specific public repository, testimonial, client result, or measurable outcome has been confirmed for the flagship case study. Future work must not fabricate these. The owner still needs to select the flagship project and provide or approve its evidence.

## Product Principles

- Let real work carry more weight than broad capability claims.
- Help a time-constrained evaluator understand role, problem, contribution, and result quickly.
- Keep every public claim traceable to content the owner has confirmed.
- Let the owner maintain public content without developer intervention or redeployment.
- Preserve an accessible, responsive, and dependable path from evaluation to contact.

## Accessibility & Inclusion

Public pages must be usable with keyboard navigation, responsive across mobile and desktop web, and aligned with the project target of Lighthouse Accessibility 90 or higher. Interactive states, validation feedback, and error recovery must not depend on color or hover alone. Touch controls and focus behavior must remain usable at narrow widths and increased browser zoom.
