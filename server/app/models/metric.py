from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String

from . import Base


class Metric(Base):
    """
    Metric model for storing raw event data for analytics.
    Includes event type, timestamp, device, location, and value.
    """

    __tablename__ = "metrics"
    id = Column(Integer, primary_key=True)
    timestamp = Column(
        DateTime, default=lambda: datetime.now(timezone.utc), nullable=False, index=True
    )
    event_type = Column(
        String(50), nullable=False, index=True
    )  # e.g., 'page_view', 'user_login', 'new_registration'
    user_id = Column(
        Integer, ForeignKey("users.id"), nullable=True, index=True
    )  # Link to user if applicable
    device = Column(
        String(50), nullable=True, index=True
    )  # e.g., 'Windows', 'Mac', 'iOS', 'Android', 'Linux'
    location = Column(
        String(50), nullable=True, index=True
    )  # e.g., 'United States', 'Canada', 'Mexico', 'Other'
    value = Column(
        Float, default=1.0
    )  # Generic value, e.g., 1 for a count, or a specific metric value
