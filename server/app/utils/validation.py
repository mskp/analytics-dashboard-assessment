from typing import TypedDict

from marshmallow import Schema, fields


class SignupSchema(Schema):
    """Schema for user signup validation."""

    name = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)


class LoginSchema(Schema):
    """Schema for user login validation."""

    email = fields.Email(required=True)
    password = fields.String(required=True)


class GoogleLoginSchema(Schema):
    """Schema for Google OAuth login validation."""

    id_token = fields.String(required=True)


class SignupData(TypedDict):
    """TypedDict for validated signup data."""

    name: str
    email: str
    password: str


class LoginData(TypedDict):
    """TypedDict for validated login data."""

    email: str
    password: str


class GoogleLoginData(TypedDict):
    """TypedDict for validated Google login data."""

    id_token: str
