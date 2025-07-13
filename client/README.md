# Analytics Dashboard - Frontend

A modern, responsive analytics dashboard built with Next.js 15, TypeScript, and Tailwind CSS. This frontend application provides an intuitive interface for visualizing analytics data with real-time updates and interactive charts.

## 🌟 Features

### Core Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS and Radix UI components
- **Real-time Analytics**: Interactive charts and graphs using Recharts
- **Authentication**: Google OAuth integration with JWT token management
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Type Safety**: Full TypeScript implementation for better development experience

### Data Visualization

- **User Activity Charts**: Line charts showing user engagement over time
- **Traffic Analytics**: Bar charts for device and location-based traffic
- **System Metrics**: Real-time performance indicators
- **Interactive Dashboards**: Hover effects and data tooltips

### Technical Features

- **App Router**: Next.js 15 App Router for modern routing
- **Server Components**: Optimized rendering with React Server Components
- **Client Components**: Interactive elements with React Client Components
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios for API communication

## 🛠 Tech Stack

### Core Technologies

- **Framework**: Next.js 15.3.5 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Package Manager**: Bun

### UI & Components

- **UI Library**: Radix UI (Checkbox, Label, Slot)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with @hookform/resolvers
- **Validation**: Zod
- **Notifications**: React Hot Toast

### State & Data

- **Server State**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Authentication**: @react-oauth/google

### Development Tools

- **Linting**: Next.js ESLint configuration
- **Type Checking**: TypeScript
- **CSS Processing**: PostCSS with Tailwind

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Backend API running (see server README)

### Installation

1. **Install dependencies**

   ```bash
   # Using Bun (recommended)
   bun install

   # Using npm
   npm install

   # Using yarn
   yarn install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add the following to your `.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```

3. **Run the development server**

   ```bash
   # Using Bun (recommended)
   bun run dev

   # Using npm
   npm run dev

   # Using yarn
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Vercel Deployment

1. **Connect to Vercel**

   - Go to [Vercel](https://vercel.com) and sign in
   - Import your GitHub repository
   - Set the root directory to `client`

2. **Configure Environment Variables in Vercel**

   - `NEXT_PUBLIC_API_URL`: Your VPS backend URL (e.g., https://your-vps-domain.com:8000)
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google OAuth client ID

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Or use Vercel CLI: `vercel --prod`

## 📁 Project Structure

```
client/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (dashboard)/        # Dashboard pages (grouped)
│   │   │   ├── _components/    # Dashboard-specific components
│   │   │   ├── layout.tsx      # Dashboard layout
│   │   │   └── page.tsx        # Dashboard main page
│   │   ├── auth/               # Authentication pages
│   │   │   ├── _components/    # Auth-specific components
│   │   │   ├── layout.tsx      # Auth layout
│   │   │   ├── login/          # Login page
│   │   │   └── signup/         # Signup page
│   │   ├── globals.css         # Global styles
│   │   └── layout.tsx          # Root layout
│   ├── components/             # Reusable UI components
│   │   └── ui/                 # Base UI components (Radix)
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-auth.ts         # Authentication hook
│   │   ├── use-dashboard-data.ts # Dashboard data hook
│   │   └── use-mobile.tsx      # Mobile detection hook
│   ├── lib/                    # Utilities and configurations
│   │   ├── actions.ts          # Server actions
│   │   ├── api.ts              # API utilities
│   │   ├── axios-instance.ts   # Axios configuration
│   │   ├── constants.ts        # Application constants
│   │   ├── dal.ts              # Data access layer
│   │   └── utils.ts            # Utility functions
│   ├── providers/              # Context providers
│   │   └── query-provider.tsx  # TanStack Query provider
│   └── schemas/                # Zod validation schemas
│       └── auth.ts             # Authentication schemas
├── public/                     # Static assets
│   └── login_page_image.png    # Login page illustration
├── package.json                # Dependencies and scripts
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎨 UI Components

### Base Components

- **Button**: Customizable button component with variants
- **Input**: Form input with validation support
- **Label**: Accessible label component
- **Checkbox**: Custom checkbox with Radix UI
- **Skeleton**: Loading skeleton components

### Dashboard Components

- **StatsCard**: Metric display cards
- **TotalUsersChart**: User activity line chart
- **TrafficChart**: Traffic analytics bar chart
- **CommonSidebar**: Navigation sidebar
- **Header**: Dashboard header with user info

### Layout Components

- **AuthPageTitle**: Authentication page titles
- **GoogleLoginButton**: Google OAuth login button

## 🔧 Configuration

### Next.js Configuration

The application uses Next.js 15 with the following features:

- App Router for modern routing
- Turbopack for faster development builds
- TypeScript for type safety
- Tailwind CSS for styling

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Development
NODE_ENV=development
```

## 📊 Data Flow

### Authentication Flow

1. User clicks Google login button
2. Google OAuth popup opens
3. User authenticates with Google
4. Backend validates and returns JWT token
5. Frontend stores token and redirects to dashboard

### Dashboard Data Flow

1. Dashboard loads with loading states
2. TanStack Query fetches data from API
3. Data is cached and displayed in charts
4. Real-time updates via polling or WebSocket

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**

   - Go to [Vercel](https://vercel.com) and sign in
   - Import your GitHub repository
   - Set the root directory to `client`

2. **Configure Environment Variables**

   - `NEXT_PUBLIC_API_URL`: Your VPS backend URL (e.g., https://your-vps-domain.com:8000)
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google OAuth client ID

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Or use Vercel CLI: `vercel --prod`

### Local Production Build

```bash
# Build for production
bun run build

# Start production server
bun run start
```

## 🔍 Development

### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server

# Type checking
bun run type-check   # Run TypeScript compiler
```

### Code Quality

- **ESLint**: Code linting with Next.js configuration
- **TypeScript**: Static type checking
- **Prettier**: Code formatting (configured with ESLint)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🔗 Links

- **Backend API**: [Server README](../server/README.md)
- **Main Repository**: https://github.com/mskp/analytics-dashboard-assessment
- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Radix UI**: https://www.radix-ui.com
