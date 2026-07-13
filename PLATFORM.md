# Daring Tribe × Buddy — Platform Setup (Phase 0)

Shared backend: **Buddy’s Supabase project** (same Auth + XP ledger).

## Required env (Tribe `.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=          # same as Buddy
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # same as Buddy
SUPABASE_SERVICE_ROLE_KEY=         # server-only; same as Buddy
NEXT_PUBLIC_SITE_URL=http://localhost:3001
# Production SSO across subdomains (omit on localhost):
# NEXT_PUBLIC_COOKIE_DOMAIN=.1159realty.com
```

## Required env (Buddy — add if missing)

```bash
# NEXT_PUBLIC_COOKIE_DOMAIN=.1159realty.com   # production only
NEXT_PUBLIC_SITE_URL=https://buddy.1159realty.com
```

## Supabase dashboard (manual)

1. Authentication → URL configuration → Redirect URLs, add:
   - `http://localhost:3001/auth/callback`
   - `https://daringtribe.1159realty.com/auth/callback`
   - Existing Buddy callback URLs
2. Site URL can stay Buddy’s; redirects are allowlisted per URL above.
3. Ensure label **`Daring Tribe`** exists in `labels` (no KPIs). Apps resolve by **name**, not hardcoded UUID.

## Label assignment

On Tribe signup, server upserts `user_labels` for label name `Daring Tribe`.

## Future CRM migration (Phase 6)

Keep `learn_*` tables and `xp_transactions` ledger modular. Cutover = new project env vars + Auth/user/XP/learn data migrate; UUID identity stays stable.
