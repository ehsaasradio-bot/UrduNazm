# UrduNazm — Project Conventions

## Stack
- Next.js 15 App Router with TypeScript
- Tailwind CSS v4 (CSS-first config via `@theme`)
- Supabase (Auth, Database, Storage)
- OpenAI API (AI Chat)
- Deployed on Vercel

## Project Structure
```
src/
  app/             # Next.js App Router pages
  components/      # React components
    ui/            # Reusable primitives (Button, Card, Input, etc.)
    home/          # Homepage sections
    poets/         # Poet-specific components
    poems/         # Poem-specific components
    blog/          # Blog-specific components
    chat/          # AI chat components
  lib/
    supabase/      # Supabase client, server, middleware utilities
  types/           # TypeScript types
public/
  fonts/           # Local font files (if needed)
```

## Conventions

### Languages
- Only Urdu and English. No other language support.
- Urdu text uses `className="urdu"` for Nastaliq font + RTL direction.
- Database fields use `_en` and `_ur` suffixes for bilingual content.

### Naming
- Components: PascalCase (`PoemCard.tsx`)
- Utilities/hooks: camelCase (`useBookmarks.ts`)
- Routes: kebab-case (`/poets/[slug]`)
- CSS: Tailwind utility classes. No CSS modules.

### Code Style
- Functional components only. No class components.
- Server Components by default. Add `"use client"` only when needed.
- Keep components small and reusable.
- No `any` type. Use proper TypeScript types.

### Design
- Premium, minimal Apple-style aesthetic.
- Gold accent color: `#c8a96e`
- Dark mode support via `.dark` class.
- Mobile-first responsive design.

### Supabase
- Browser client: `@/lib/supabase/client`
- Server client: `@/lib/supabase/server`
- Session refresh handled by middleware.

### Commands
```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # Run ESLint
```
