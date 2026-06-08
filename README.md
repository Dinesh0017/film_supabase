# FilmHub Supabase Version

Next.js movie website using Supabase Database. Prisma is fully removed.

## Setup

1. Install packages:

```bash
npm install
```

2. Create `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
ADMIN_PASSWORD="admin123"
SESSION_PASSWORD="change-this-to-a-random-32-character-secret"
```

3. In Supabase, open SQL Editor and run `supabase.sql`.

4. Start project:

```bash
npm run dev
```

Public site: `/`
Admin login: `/admin`
