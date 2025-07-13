"""
Health check route for API status monitoring.
"""

from flask import Blueprint

from ..utils.response import standard_response

health_check_bp = Blueprint("health_check", __name__, url_prefix="/api/health-check")


@health_check_bp.route("/", methods=["GET"])
def health_check():
    """
    Health check endpoint to verify API is running.
    Returns a JSON response with status.
    """
    return standard_response(
        True, {"status": "API is running!"}, "Health check successful.", 200
    )
