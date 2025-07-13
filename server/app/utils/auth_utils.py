"""
Authentication utility functions for JWT generation and token-required decorator.
"""

from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
from flask import current_app, g, request

from app.models import User, db
from app.utils.response import standard_response


def generate_jwt(user_id):
    """
    Generate a JWT token for a given user ID.
    Token expires in 24 hours.
    """
    payload = {
        "user_id": user_id,
        # Token expires in 24 hours
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")


def token_required(f):
    """
    Decorator to require JWT authentication for Flask routes.
    Attaches the current user to Flask's global context (g.current_user).
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]  # Bearer <token>

        if not token:
            return standard_response(
                False, None, "Authentication Token is missing!", 401
            )

        try:
            data = jwt.decode(
                token, current_app.config["SECRET_KEY"], algorithms=["HS256"]
            )
            current_user = db.session.get(User, data["user_id"])
            if not current_user:
                return standard_response(
                    False, None, "Invalid Token: User not found!", 401
                )
            g.current_user = current_user  # Store user object in Flask's global context
        except jwt.ExpiredSignatureError:
            return standard_response(False, None, "Token has expired!", 401)
        except jwt.InvalidTokenError:
            return standard_response(False, None, "Token is invalid!", 401)
        except Exception as e:
            return standard_response(
                False, None, f"Token validation error: {str(e)}", 401
            )

        return f(*args, **kwargs)

    return decorated
