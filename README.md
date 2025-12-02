# Cow Track

A modern cattle rotation management system built with Next.js 15 for tracking paddock usage and herd movements.

## Features

- **Rotation Management**: Track cattle movements between paddocks with detailed records
- **Dashboard Analytics**: Visual overview of rotation statistics and trends
- **Paddock Monitoring**: Monitor grass height, recovery status, and cattle distribution
- **Data Tables**: Paginated, sortable data views with filtering capabilities
- **Authentication**: Secure login system with session management
- **Dark/Light Mode**: Theme switching with multiple color schemes

## Tech Stack

- **Framework**: Next.js 15.2 with App Router
- **Database**: PostgreSQL (Vercel Postgres)
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Radix primitives
- **Charts**: Recharts
- **Icons**: Tabler Icons

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Vercel Postgres)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fpuglap/cow-track.git
cd cow-track
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure your database connection and auth secret in `.env.local`.

4. Seed the database:
```bash
npm run seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Demo Credentials

For the deployed version, demo credentials are pre-filled:
- **Email**: admin@cowrporation.com
- **Password**: Demo_P4ssw0rd!

## Project Structure

```
├── app/
│   ├── dashboard/       # Dashboard pages and components
│   ├── lib/            # Server actions, utilities, definitions
│   └── login/          # Authentication pages
├── components/         # Shared React components
├── lib/               # Utility functions and type definitions
├── public/            # Static assets
└── scripts/           # Database seeding scripts
```

## License

MIT
