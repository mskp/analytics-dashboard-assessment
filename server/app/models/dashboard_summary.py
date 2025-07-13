from sqlalchemy import Column, Integer, String

from . import Base


class DashboardSummary(Base):
    """
    Dashboard summary statistics for the main dashboard cards.
    Stores views, visits, new users, and active users with their changes.
    """

    __tablename__ = "dashboard_summary"
    id = Column(Integer, primary_key=True)
    views = Column(String(50), nullable=False)
    views_change = Column(String(50), nullable=False)
    views_type = Column(String(10), nullable=False)  # 'increase' or 'decrease'
    visits = Column(String(50), nullable=False)
    visits_change = Column(String(50), nullable=False)
    visits_type = Column(String(10), nullable=False)
    new_users = Column(String(50), nullable=False)
    new_users_change = Column(String(50), nullable=False)
    new_users_type = Column(String(10), nullable=False)
    active_users = Column(String(50), nullable=False)
    active_users_change = Column(String(50), nullable=False)
    active_users_type = Column(String(10), nullable=False)
