# Math Sprint

**🎮 Live Demo: [https://game-prince010.vercel.app/](https://game-prince010.vercel.app/)**

A fast-paced mental math web game built with Next.js, TypeScript, Tailwind CSS, Supabase, shadcn/ui, Framer Motion, and Lucide Icons.

Race the clock — you have **60 seconds** to answer as many random math questions as possible. Each correct answer earns **10 points**. When time runs out, your score is automatically saved to the Supabase leaderboard.

## Features

- 60-second countdown timer with urgency animation in the last 10 seconds
- Random addition, subtraction, multiplication, and division questions
- Keyboard-only gameplay (Enter to submit, auto-focused input)
- Live score, accuracy, correct/wrong tracking
- Green/red answer flashes and subtle sound effects
- Dark and light mode
- Auto-save scores to Supabase
- Realtime top-20 leaderboard
- Confetti celebration for scores above 400

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- shadcn/ui
- Framer Motion
- Lucide Icons

## Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later
- [npm](https://www.npmjs.com/)
- A free [Supabase](https://supabase.com/) account

## Supabase Setup

### 1. Create a Supabase project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project**
3. Choose an organization, name, database password, and region
4. Wait for the project to finish provisioning

### 2. Run the database schema

1. Open your project in the Supabase dashboard
2. Go to **SQL Editor**
3. Click **New query**
4. Copy the contents of [`supabase/schema.sql`](./supabase/schema.sql)
5. Paste and click **Run**

This creates the `scores` table, indexes, row-level security policies, and enables Realtime.

### 3. Enable Realtime (if needed)

If Realtime does not work immediately:

1. Go to **Database → Publications**
2. Confirm `supabase_realtime` includes the `scores` table
3. Alternatively, go to **Database → Replication** and enable Realtime for `scores`

### 4. Get your API credentials

1. Go to **Project Settings → API**
2. Copy the **Project URL**
3. Copy the **anon public** key

## Local Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

3. Create your environment file:

```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## How to Play

1. Enter your name on the home screen
2. Click **Play**
3. Type the answer to each question and press **Enter**
4. Keep answering until the 60-second timer ends
5. View your final score on the result screen (auto-saved to the leaderboard)
6. Check the **Leaderboard** for the top 20 scores

## Project Structure

```
app/                 Next.js pages (home, game, result, leaderboard)
components/          UI components (Navbar, GameCard, Timer, etc.)
hooks/               useGame, useTimer, useLeaderboard
lib/                 Supabase client and constants
types/               Shared TypeScript types
utils/               Question generator, scoring, sounds, storage
animations/          Framer Motion variants
supabase/            SQL schema
public/              Static assets
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Build for production     |
| `npm start`    | Start production server  |
| `npm run lint` | Run ESLint               |

## Troubleshooting

### "Missing Supabase environment variables"

Make sure `.env.local` exists with valid `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then restart the dev server.

### Leaderboard is empty or shows an error

- Confirm you ran `supabase/schema.sql` in the Supabase SQL Editor
- Check that RLS policies allow public `select` and `insert` on `scores`
- Verify your anon key is correct

### Realtime updates not appearing

- Ensure Realtime is enabled for the `scores` table
- Refresh the leaderboard page once after setup

## License

MIT
