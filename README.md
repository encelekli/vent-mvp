# Vent MVP

Anonymous emotional release space with voice-to-text.

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Backend Services**: Supabase
  - PostgreSQL database
  - Anonymous + OAuth authentication
  - Realtime subscriptions
  - Storage for audio files
- **Voice-to-text**: OpenAI Whisper API
- **Hosting**: Vercel (frontend), Supabase (backend)

## Database Schema

### profiles
Extends `auth.users` with anonymous user metadata.

### vents
User posts (text or voice transcription). Supports public/private visibility.

### vent_reactions
Emoji reactions on vents.

### topics
Topic-based group chats.

### topic_memberships
User subscriptions to topics.

### messages
Chat messages within topics.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase project credentials.

## Development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deployment

1. Create a Supabase project
2. Run the migration SQL in `supabase/migrations/`
3. Connect the project to Vercel
4. Set environment variables in Vercel

## Project Structure

```
app/              # Next.js App Router pages
  api/            # API routes
  auth/callback/  # OAuth callback handler
components/       # React components
lib/              # Utilities and clients
  supabase/       # Supabase client setup
public/           # Static assets
types/            # TypeScript types
```
