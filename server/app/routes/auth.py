"""
Authentication routes for user signup, login, and Google OAuth.
"""

import os
from typing import Any, cast

from flask import Blueprint, request
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from marshmallow import ValidationError
from werkzeug.security import check_password_hash, generate_password_hash

from app.models import User, db

from ..utils.auth_utils import generate_jwt
from ..utils.response import standard_response
from ..utils.validation import (
    GoogleLoginData,
    GoogleLoginSchema,
    LoginData,
    LoginSchema,
    SignupData,
    SignupSchema,
)

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/signup", methods=["POST"])
def signup():
    """
    Register a new user with name, email, and password.
    Returns a JWT token on success.
    """
    schema = SignupSchema()
    try:
        raw_data: Any = schema.load(request.get_json())
        if not isinstance(raw_data, dict):
            return standard_response(False, None, "Invalid request format.", 400)
        data = cast(SignupData, raw_data)
    except ValidationError as err:
        return standard_response(False, None, err.messages, 400)
    name = data["name"]
    email = data["email"]
    password = data["password"]

    hashed_password = generate_password_hash(password, method="pbkdf2:sha256")

    existing_user = db.session.execute(
        db.select(User).filter_by(email=email)
    ).scalar_one_or_none()
    if existing_user:
        return standard_response(False, None, "Email already registered", 409)

    new_user = User(name=name, email=email, password_hash=hashed_password)
    db.session.add(new_user)
    try:
        db.session.commit()
        token = generate_jwt(new_user.id)
        return standard_response(
            True,
            {"user_id": new_user.id, "token": token},
            "User created successfully!",
            201,
        )
    except Exception:
        db.session.rollback()
        return standard_response(False, None, "An error occurred during signup", 500)


@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Log in a user with email and password. Returns a JWT token on success.
    """
    schema = LoginSchema()
    try:
        raw_data: Any = schema.load(request.get_json())
        if not isinstance(raw_data, dict):
            return standard_response(False, None, "Invalid request format.", 400)
        data = cast(LoginData, raw_data)
    except ValidationError as err:
        return standard_response(False, None, err.messages, 400)
    email = data["email"]
    password = data["password"]

    user = db.session.execute(
        db.select(User).filter_by(email=email)
    ).scalar_one_or_none()

    if (
        user
        and user.password_hash
        and check_password_hash(user.password_hash, password)
    ):
        token = generate_jwt(user.id)
        return standard_response(
            True,
            {"user_id": user.id, "token": token},
            "Login successful!",
            200,
        )
    else:
        return standard_response(False, None, "Invalid credentials", 401)


@auth_bp.route("/google-login", methods=["POST"])
def google_login():
    """
    Log in or register a user using Google OAuth. Returns a JWT token on success.
    """
    schema = GoogleLoginSchema()
    try:
        raw_data: Any = schema.load(request.get_json())
        if not isinstance(raw_data, dict):
            return standard_response(False, None, "Invalid request format.", 400)
        data = cast(GoogleLoginData, raw_data)
    except ValidationError as err:
        return standard_response(False, None, err.messages, 400)
    google_id_token = data["id_token"]

    try:
        CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
        if not CLIENT_ID:
            raise ValueError("GOOGLE_CLIENT_ID environment variable not set.")

        idinfo = id_token.verify_oauth2_token(
            google_id_token, google_requests.Request(), CLIENT_ID
        )

        google_user_id = idinfo["sub"]
        email = idinfo["email"]
        name = idinfo.get("name", email)

        user = db.session.execute(
            db.select(User).filter_by(google_id=google_user_id)
        ).scalar_one_or_none()

        if not user:
            user = db.session.execute(
                db.select(User).filter_by(email=email)
            ).scalar_one_or_none()
            if user:
                user.google_id = google_user_id
                db.session.add(user)
                db.session.commit()
            else:
                new_user = User(name=name, email=email, google_id=google_user_id)
                db.session.add(new_user)
                db.session.commit()
                user = new_user

        token = generate_jwt(user.id)
        return standard_response(
            True,
            {"user_id": user.id, "token": token},
            "Google login successful!",
            200,
        )

    except ValueError as e:
        return standard_response(False, None, f"Invalid Google ID token: {str(e)}", 401)
    except Exception:
        db.session.rollback()
        return standard_response(
            False, None, "An error occurred during Google login", 500
        )
