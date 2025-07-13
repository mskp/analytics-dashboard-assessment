import sys
import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from app.middleware.error_handlers import register_error_handlers

from .models import db
from .routes import auth_bp, dashboard_bp, health_check_bp

load_dotenv()

from .config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    # Test DB connection at startup
    try:
        with app.app_context():
            db.session.execute(text('SELECT 1'))
    except OperationalError as e:
        print(f"[FATAL] Database connection failed: {e}", file=sys.stderr)
        sys.exit(1)

    allowed_origins = os.getenv(
        "ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
    ).split(",")
    # Filter out empty strings
    allowed_origins = [origin.strip() for origin in allowed_origins if origin.strip()]
    CORS(
        app,
        origins=allowed_origins,
        methods=['GET', 'POST', 'OPTIONS'],
        supports_credentials=True,
        allow_headers=['Content-Type', 'Authorization'],
    )

    register_error_handlers(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(health_check_bp)

    return app
