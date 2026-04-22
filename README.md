# QuemVotar

A civic technology platform designed to help Brazilian citizens make informed voting decisions by providing accessible information about political candidates, their platforms, and voting history.

## Overview

QuemVotar bridges the information gap between voters and candidates, offering a centralized platform where users can research, compare, and evaluate political options based on transparent data and verified information.

## Features

- **Candidate Database**: Comprehensive profiles with biographical information, platforms, and political history
- **Voting Records**: Track legislative voting patterns and parliamentary activity
- **Comparison Tool**: Side-by-side candidate comparison on key issues
- **Issue-Based Search**: Find candidates aligned with specific policy positions
- **Responsive Design**: Accessible on mobile, tablet, and desktop devices
- **Data Visualization**: Charts and graphs for complex political data

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Testing**: Vitest

## Architecture

```
src/
├── app/                # Next.js App Router pages
├── components/         # React components
├── lib/               # Utilities and API clients
├── types/             # TypeScript definitions
└── styles/            # Global styles

supabase/
├── schema.sql         # Database schema
└── migrations/        # Schema migrations
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
# Clone the repository
git clone https://github.com/joshuaas5/quemvotar.git

# Navigate to the project
cd quemvotar

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Deployment

```bash
npm run build
```

Deploy on Vercel for optimal Next.js performance:

```bash
vercel --prod
```

## Live Demo

[https://quemvotar.com.br](https://quemvotar.com.br)

---

Empowering democratic participation through technology.
