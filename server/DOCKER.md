# Docker Setup for Analytics Dashboard Server

This document provides instructions for running the Flask server using Docker.

## Prerequisites

- Docker and Docker Compose installed
- Environment variables configured (see `.env` file)

## Quick Start (Development)

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Run database migrations:**
   ```bash
   docker-compose exec app alembic upgrade head
   ```

3. **Seed the database (optional):**
   ```bash
   docker-compose exec app poetry run seed-db
   ```

4. **Access the application:**
   - API: http://localhost:5000
   - Health check: http://localhost:5000/api/health-check

## Production Deployment

1. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your production values
   ```

2. **Build and run production stack:**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

3. **Run migrations:**
   ```bash
   docker-compose -f docker-compose.prod.yml exec app alembic upgrade head
   ```

## Docker Commands

### Development
```bash
# Build image
docker build -t analytics-dashboard-server .

# Run container
docker run -p 5000:5000 --env-file .env analytics-dashboard-server

# Run with database
docker-compose up
```

### Production
```bash
# Build production image
docker build -f Dockerfile.prod -t analytics-dashboard-server:prod .

# Run production stack
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f app
```

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL=postgresql://postgres:password@db:5432/analytics_dashboard
SECRET_KEY=your_super_secret_jwt_key_change_in_production
GOOGLE_CLIENT_ID=your_google_client_id
POSTGRES_PASSWORD=your_secure_password
```

## Database Management

### Run migrations
```bash
docker-compose exec app alembic upgrade head
```

### Create new migration
```bash
docker-compose exec app alembic revision --autogenerate -m "description"
```

### Reset database
```bash
docker-compose exec app alembic downgrade base
docker-compose exec app alembic upgrade head
```

## Troubleshooting

### Check container logs
```bash
docker-compose logs app
docker-compose logs db
```

### Access container shell
```bash
docker-compose exec app bash
```

### Check database connection
```bash
docker-compose exec db psql -U postgres -d analytics_dashboard
```

### Restart services
```bash
docker-compose restart app
docker-compose restart db
```

## Health Checks

The application includes health checks that monitor:
- Flask application availability
- Database connectivity
- API endpoint responsiveness

Health check endpoint: `http://localhost:5000/health`

## Security Notes

- The production Dockerfile runs as a non-root user
- Environment variables should be properly secured in production
- Database passwords should be strong and unique
- SSL certificates should be configured for HTTPS in production

## Performance Optimization

- Production uses Gunicorn with 4 workers
- Database connection pooling is configured
- Static files are served efficiently
- Health checks prevent traffic to unhealthy instances 