from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Integer, String

from . import Base


class User(Base):
    """
    User model for storing user credentials and profile information.
    Supports both email/password and Google OAuth users.
    """

    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    # Nullable for Google users
    password_hash = Column(String(255), nullable=True)
    google_id = Column(
        String(255), unique=True, nullable=True, index=True
    )  # New column for Google users
    created_at = Column(
        DateTime, default=lambda: datetime.now(timezone.utc), index=True
    )

    def __repr__(self):
        return f"<User {self.email}>"
