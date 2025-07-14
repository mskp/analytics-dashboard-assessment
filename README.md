# Analytics Dashboard Assessment

A modern, responsive analytics dashboard built with Next.js frontend and Flask backend. This project demonstrates a full-stack application with real-time data visualization, user authentication, and comprehensive analytics features.

## 🌟 Features

### Frontend Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS and Radix UI components
- **Real-time Analytics**: Interactive charts and graphs using Recharts
- **Authentication**: Google OAuth integration with JWT token management
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Mode**: Theme support (ready for implementation)
- **Data Visualization**:
  - User activity charts
  - Traffic analytics by device and location
  - System performance metrics
  - Real-time data updates

### Backend Features

- **RESTful API**: Flask-based API with comprehensive endpoints
- **Database Management**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT-based authentication with Google OAuth
- **Data Validation**: Marshmallow schemas for request/response validation
- **Database Migrations**: Alembic for schema management
- **Health Checks**: Built-in health monitoring endpoints
- **CORS Support**: Cross-origin resource sharing configuration

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 15.3.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **State Management**: TanStack Query (React Query)
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Authentication**: Google OAuth
- **Package Manager**: Bun

### Backend

- **Framework**: Flask 3.1.1
- **Language**: Python 3.12
- **Database**: PostgreSQL 15
- **ORM**: SQLAlchemy 2.0.41
- **Authentication**: PyJWT, Google Auth
- **Validation**: Marshmallow
- **Migrations**: Alembic
- **Package Manager**: Poetry
- **CORS**: Flask-CORS

### DevOps & Infrastructure

- **Backend Deployment**: Docker & Docker Compose on VPS
- **Frontend Deployment**: Vercel
- **Database**: PostgreSQL with persistent volumes
- **Environment Management**: Environment variables

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose (for backend)
- Node.js 18+ (for frontend development)
- Python 3.12+ (for backend development)
- PostgreSQL (for local development)

### Backend Setup (Docker)

1. **Clone the repository**

   ```bash
   git clone https://github.com/mskp/analytics-dashboard-assessment.git
   cd analytics-dashboard-assessment
   ```

2. **Set up environment variables**

   ```bash
   cp env.example .env
   # Edit .env with your Google OAuth credentials
   ```

3. **Run backend with Docker Compose**

   ```bash
   docker-compose up --build
   ```

4. **Access the backend**
   - Backend API: http://localhost:5000
   - Database: localhost:5432

### Frontend Setup (Vercel Deployment)

1. **Deploy to Vercel**

   ```bash
   # Connect your GitHub repository to Vercel
   # Or use Vercel CLI
   cd client
   vercel
   ```

2. **Configure environment variables in Vercel**
   - `NEXT_PUBLIC_API_URL`: Your VPS backend URL (e.g., https://your-vps-domain.com:8000)
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google OAuth client ID

### Local Development

#### Frontend Setup

```bash
cd client
bun install
bun run dev
```

#### Backend Setup

```bash
cd server
poetry install
poetry run python run.py
```

#### Database Setup

```bash
# Start PostgreSQL (if using Docker)
docker run -d --name postgres \
  -e POSTGRES_DB=analytics_dashboard \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:15-alpine

# Run migrations
cd server
poetry run alembic upgrade head
poetry run python -m app.scripts.seed_db
```

## 📁 Project Structure

```
analytics-dashboard-assessment/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   └── providers/     # Context providers
│   └── public/            # Static assets
├── server/                # Flask backend
│   ├── app/
│   │   ├── models/        # Database models
│   │   ├── routes/        # API endpoints
│   │   ├── utils/         # Utility functions
│   │   └── scripts/       # Database scripts
│   └── migrations/        # Database migrations
├── docker-compose.yml     # Development environment
├── docker-compose.prod.yml # Production environment
└── README.md
```

## 📊 API Endpoints

### Authentication

- `POST /api/auth/login` - Google OAuth login
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Dashboard

- `GET /api/dashboard/summary` - Get dashboard summary
- `GET /api/dashboard/metrics` - Get analytics metrics
- `GET /api/dashboard/users` - Get user statistics

### Health

- `GET /api/health-check` - Health check endpoint

## 🚀 Deployment

### Live Demo

- **Frontend**: [https://analytics-dash.sushant.fun](https://analytics-dash.sushant.fun)
- **Backend API**: [https://api.analytics-dash.sushant.fun](https://api.analytics-dash.sushant.fun)

### Frontend Deployment (Vercel)

The frontend is deployed on **Vercel** for optimal performance and automatic deployments.

1. **Connect to Vercel**

   - Go to [Vercel](https://vercel.com) and sign in
   - Import your GitHub repository
   - Set the root directory to `client`

2. **Configure Environment Variables**

   - `NEXT_PUBLIC_API_URL`: https://api.analytics-dash.sushant.fun
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google OAuth client ID

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Or use Vercel CLI: `vercel --prod`

### Backend Deployment (Google Cloud VPS)

The backend is deployed on a **Google Cloud VPS** using Docker containers.

1. **Setup Google Cloud VPS**

   ```bash
   # Install Docker and Docker Compose
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. **Deploy Backend**

   ```bash
   # Clone repository
   git clone https://github.com/mskp/analytics-dashboard-assessment.git
   cd analytics-dashboard-assessment

   # Setup environment
   cp env.example .env
   # Edit .env with production values

   # Start production services
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Configure Domain & SSL**
   - Point your domain to VPS IP
   - Setup SSL certificate (Let's Encrypt)
   - Configure firewall to allow port 8000

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: https://github.com/mskp/analytics-dashboard-assessment

## 🤝 Support

For support and questions, please open an issue in the GitHub repository or contact the maintainers.
