from .config import Config
import sys

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from app.middleware.error_handlers import register_error_handlers

from .models import db
from .routes import auth_bp, dashboard_bp, health_check_bp

load_dotenv()


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

    CORS(app)

    register_error_handlers(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(health_check_bp)

    return app
