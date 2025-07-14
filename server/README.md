# Analytics Dashboard - Backend API

A robust Flask-based REST API for the analytics dashboard, featuring authentication, data management, and comprehensive analytics endpoints. Built with modern Python practices and containerized for easy deployment.

## 🚀 Live Demo

- **Backend API**: [https://api.analytics-dash.sushant.fun](https://api.analytics-dash.sushant.fun)
- **Frontend**: [https://analytics-dash.sushant.fun](https://analytics-dash.sushant.fun)

## 🏗️ Deployment

The backend is deployed on a **Google Cloud VPS** using Docker containers for scalability and reliability.

## Quick Start

### Development

```bash
poetry install
poetry run python run.py
```

### Docker

```bash
docker-compose up --build
```

### Production (Google Cloud VPS)

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Features

- RESTful API with Flask
- JWT authentication with Google OAuth
- PostgreSQL database with SQLAlchemy ORM
- Database migrations with Alembic
- Comprehensive API endpoints
- Health monitoring
- CORS support

## Tech Stack

- Flask 3.1.1
- Python 3.12
- PostgreSQL 15
- SQLAlchemy 2.0.41
- Alembic 1.13.0
- Poetry for dependency management

For detailed documentation, see the main project README.
