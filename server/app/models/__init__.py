from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base

db = SQLAlchemy()
Base = declarative_base()

from .dashboard_summary import DashboardSummary
from .metric import Metric
from .user import User
