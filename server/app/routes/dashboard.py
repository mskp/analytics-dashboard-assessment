"""
Dashboard routes for analytics and summary data.
Provides endpoints for summary cards, user growth, device and location traffic breakdowns.
"""

from datetime import datetime, timedelta, timezone

from flask import Blueprint
from sqlalchemy import extract, func

from app.models import DashboardSummary, Metric, db

from ..utils.auth_utils import token_required
from ..utils.response import standard_response

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/api/dashboard")


@dashboard_bp.route("/summary", methods=["GET"])
@token_required
def get_summary_data():
    """
    Get dashboard summary statistics for cards (views, visits, new users, active users).
    Returns a JSON response with the summary data.
    """
    summary = db.session.execute(db.select(DashboardSummary)).scalar_one_or_none()
    if summary:
        data = {
            "views": {
                "value": summary.views,
                "change": summary.views_change,
                "type": summary.views_type,
            },
            "visits": {
                "value": summary.visits,
                "change": summary.visits_change,
                "type": summary.visits_type,
            },
            "newUsers": {
                "value": summary.new_users,
                "change": summary.new_users_change,
                "type": summary.new_users_type,
            },
            "activeUsers": {
                "value": summary.active_users,
                "change": summary.active_users_change,
                "type": summary.active_users_type,
            },
        }
        return standard_response(True, data, "Summary data fetched successfully.", 200)
    else:
        return standard_response(False, None, "No summary data found", 404)


@dashboard_bp.route("/total-users", methods=["GET"])
@token_required
def get_total_users_chart_data():
    """
    Get user registration data for the total users graph (this year vs last year).
    Returns a list of months with user counts for this year and last year.
    """
    current_year = datetime.now(timezone.utc).year
    last_year = current_year - 1

    this_year_data = (
        db.session.query(
            func.to_char(Metric.timestamp, "Mon").label("month"),
            func.count(Metric.id).label("count"),
        )
        .filter(
            Metric.event_type == "new_registration",
            extract("year", Metric.timestamp) == current_year,
        )
        .group_by(
            func.to_char(Metric.timestamp, "Mon"),
            extract("month", Metric.timestamp),
        )
        .order_by(extract("month", Metric.timestamp))
        .all()
    )

    last_year_data = (
        db.session.query(
            func.to_char(Metric.timestamp, "Mon").label("month"),
            func.count(Metric.id).label("count"),
        )
        .filter(
            Metric.event_type == "new_registration",
            extract("year", Metric.timestamp) == last_year,
        )
        .group_by(
            func.to_char(Metric.timestamp, "Mon"), extract("month", Metric.timestamp)
        )
        .order_by(extract("month", Metric.timestamp))
        .all()
    )

    chart_data = []
    months_order = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]

    this_year_dict = {row.month: row.count for row in this_year_data}
    last_year_dict = {row.month: row.count for row in last_year_data}

    for month in months_order:
        if month in this_year_dict or month in last_year_dict:
            chart_data.append(
                {
                    "month": month,
                    "This year": this_year_dict.get(month, 0),
                    "Last year": last_year_dict.get(month, 0),
                }
            )

    return standard_response(True, chart_data, "Total users chart data fetched.", 200)


@dashboard_bp.route("/traffic-by-device", methods=["GET"])
@token_required
def get_traffic_by_device_chart_data():
    """
    Get traffic breakdown by device for the last 30 days.
    Returns a list of devices and their traffic counts.
    """
    thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)

    traffic_by_device = (
        db.session.query(Metric.device, func.count(Metric.id).label("traffic"))
        .filter(
            Metric.event_type == "page_view",
            Metric.timestamp >= thirty_days_ago,
            Metric.device.isnot(None),
        )
        .group_by(Metric.device)
        .order_by(func.count(Metric.id).desc())
        .all()
    )

    data = [{"device": row.device, "traffic": row.traffic} for row in traffic_by_device]
    return standard_response(True, data, "Traffic by device fetched.", 200)


@dashboard_bp.route("/traffic-by-location", methods=["GET"])
@token_required
def get_traffic_by_location_chart_data():
    """
    Get traffic breakdown by location for the last 30 days.
    Returns a list of locations with traffic counts and percentages.
    """
    thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)

    traffic_by_location = (
        db.session.query(Metric.location, func.count(Metric.id).label("value"))
        .filter(
            Metric.event_type == "page_view",
            Metric.timestamp >= thirty_days_ago,
            Metric.location.isnot(None),
        )
        .group_by(Metric.location)
        .order_by(func.count(Metric.id).desc())
        .all()
    )

    total_traffic = sum(item.value for item in traffic_by_location)

    data = []
    for item in traffic_by_location:
        percentage = (item.value / total_traffic) * 100 if total_traffic > 0 else 0
        data.append(
            {
                "name": item.location,
                "value": item.value,
                "percentage": f"{percentage:.1f}%",
            }
        )

    return standard_response(True, data, "Traffic by location fetched.", 200)
