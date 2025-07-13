from werkzeug.exceptions import HTTPException

from app.utils.response import standard_response


def register_error_handlers(app):
    """
    Register global error handlers for the Flask app.
    Args:
        app (Flask): The Flask application instance.
    """

    @app.errorhandler(Exception)
    def handle_exception(e):
        # HTTP errors (e.g., 404, 400)
        if isinstance(e, HTTPException):
            return standard_response(
                success=False,
                data=None,
                message=e.description,
                status_code=e.code or 500,
            )
        # Non-HTTP errors (internal server errors)
        return standard_response(
            success=False,
            data=None,
            message="An unexpected error occurred. Please try again later.",
            status_code=500,
        )

    @app.errorhandler(400)
    def bad_request(e):
        return standard_response(False, None, "Bad request.", 400)

    @app.errorhandler(404)
    def not_found(e):
        return standard_response(False, None, "Resource not found.", 404)

    @app.errorhandler(405)
    def method_not_allowed(e):
        return standard_response(False, None, "Method not allowed.", 405)

    @app.errorhandler(500)
    def internal_error(e):
        return standard_response(False, None, "Internal server error.", 500)
