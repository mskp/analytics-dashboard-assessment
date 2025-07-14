from flask import Blueprint
from flask_restx import Api, Resource, fields
from flask_cors import cross_origin

# Create blueprint for API documentation
api_docs_bp = Blueprint('api_docs', __name__, url_prefix='/api')

# Create API instance
api = Api(
    api_docs_bp,
    title='Analytics Dashboard API',
    version='1.0',
    description='API documentation for the Analytics Dashboard backend',
    doc='/docs',
    authorizations={
        'apikey': {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization',
            'description': 'Bearer token for authentication',
        }
    },
    security='apikey',
)

# Define namespaces for different API sections
auth_ns = api.namespace('auth', description='Authentication operations')
dashboard_ns = api.namespace('dashboard', description='Dashboard data operations')
health_ns = api.namespace('health-check', description='Health check operations')

# Standard response model
standard_response_model = api.model(
    'StandardResponse',
    {
        'success': fields.Boolean(
            description='Indicates if the request was successful'
        ),
        'data': fields.Raw(description='The response data'),
        'message': fields.String(description='A message for the client'),
    },
)

# Auth request models
signup_request = api.model(
    'SignupRequest',
    {
        'name': fields.String(required=True, description='User name'),
        'email': fields.String(required=True, description='User email'),
        'password': fields.String(required=True, description='User password'),
    },
)

login_request = api.model(
    'LoginRequest',
    {
        'email': fields.String(required=True, description='User email'),
        'password': fields.String(required=True, description='User password'),
    },
)

google_login_request = api.model(
    'GoogleLoginRequest',
    {'id_token': fields.String(required=True, description='Google OAuth ID token')},
)

# Auth response models
auth_success_data = api.model(
    'AuthSuccessData',
    {
        'user_id': fields.Integer(description='User ID'),
        'token': fields.String(description='JWT access token'),
    },
)

# Dashboard response models
summary_card = api.model(
    'SummaryCard',
    {
        'value': fields.Integer(description='Current value'),
        'change': fields.Float(description='Change percentage'),
        'type': fields.String(description='Type of change (increase/decrease)'),
    },
)

dashboard_summary = api.model(
    'DashboardSummary',
    {
        'views': fields.Nested(summary_card, description='Views statistics'),
        'visits': fields.Nested(summary_card, description='Visits statistics'),
        'newUsers': fields.Nested(summary_card, description='New users statistics'),
        'activeUsers': fields.Nested(
            summary_card, description='Active users statistics'
        ),
    },
)

total_users_month = api.model(
    'TotalUsersMonth',
    {
        'month': fields.String(description='Month abbreviation (e.g., Jan, Feb)'),
        'This year': fields.Integer(description='User count for this year'),
        'Last year': fields.Integer(description='User count for last year'),
    },
)

traffic_device = api.model(
    'TrafficDevice',
    {
        'device': fields.String(description='Device type'),
        'traffic': fields.Integer(description='Traffic count'),
    },
)

traffic_location = api.model(
    'TrafficLocation',
    {
        'name': fields.String(description='Location name'),
        'value': fields.Integer(description='Traffic count'),
        'percentage': fields.String(description='Traffic percentage'),
    },
)

# Health check response model
health_data = api.model(
    'HealthData', {'status': fields.String(description='API status message')}
)


# Auth endpoints documentation
@auth_ns.route('/signup')
class Signup(Resource):
    @auth_ns.doc('signup_user')
    @auth_ns.expect(signup_request)
    @auth_ns.response(201, 'Success', standard_response_model)
    @auth_ns.response(400, 'Bad Request', standard_response_model)
    @auth_ns.response(409, 'Conflict', standard_response_model)
    @auth_ns.response(500, 'Internal Server Error', standard_response_model)
    def post(self):
        """
        Register a new user with name, email, and password.
        Returns a JWT token on success.
        """
        pass


@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.doc('login_user')
    @auth_ns.expect(login_request)
    @auth_ns.response(200, 'Success', standard_response_model)
    @auth_ns.response(400, 'Bad Request', standard_response_model)
    @auth_ns.response(401, 'Unauthorized', standard_response_model)
    def post(self):
        """
        Log in a user with email and password. Returns a JWT token on success.
        """
        pass


@auth_ns.route('/google-login')
class GoogleLogin(Resource):
    @auth_ns.doc('google_login_user')
    @auth_ns.expect(google_login_request)
    @auth_ns.response(200, 'Success', standard_response_model)
    @auth_ns.response(400, 'Bad Request', standard_response_model)
    @auth_ns.response(401, 'Unauthorized', standard_response_model)
    @auth_ns.response(500, 'Internal Server Error', standard_response_model)
    def post(self):
        """
        Log in or register a user using Google OAuth. Returns a JWT token on success.
        """
        pass


@auth_ns.route('/verify-token')
class VerifyToken(Resource):
    @auth_ns.doc('verify_token')
    @auth_ns.response(200, 'Success', standard_response_model)
    @auth_ns.response(401, 'Unauthorized', standard_response_model)
    def get(self):
        """
        Verify JWT token validity.
        """
        pass


# Dashboard endpoints documentation
@dashboard_ns.route('/summary')
class DashboardSummary(Resource):
    @dashboard_ns.doc('get_dashboard_summary')
    @dashboard_ns.response(200, 'Success', standard_response_model)
    @dashboard_ns.response(401, 'Unauthorized', standard_response_model)
    @dashboard_ns.response(404, 'Not Found', standard_response_model)
    def get(self):
        """
        Get dashboard summary statistics for cards (views, visits, new users, active users).
        Returns a JSON response with the summary data.
        """
        pass


@dashboard_ns.route('/total-users')
class TotalUsers(Resource):
    @dashboard_ns.doc('get_total_users_chart_data')
    @dashboard_ns.response(200, 'Success', standard_response_model)
    @dashboard_ns.response(401, 'Unauthorized', standard_response_model)
    def get(self):
        """
        Get user registration data for the total users graph (this year vs last year).
        Returns a list of months with user counts for this year and last year.
        """
        pass


@dashboard_ns.route('/traffic-by-device')
class TrafficByDevice(Resource):
    @dashboard_ns.doc('get_traffic_by_device_chart_data')
    @dashboard_ns.response(200, 'Success', standard_response_model)
    @dashboard_ns.response(401, 'Unauthorized', standard_response_model)
    def get(self):
        """
        Get traffic breakdown by device for the last 30 days.
        Returns a list of devices and their traffic counts.
        """
        pass


@dashboard_ns.route('/traffic-by-location')
class TrafficByLocation(Resource):
    @dashboard_ns.doc('get_traffic_by_location_chart_data')
    @dashboard_ns.response(200, 'Success', standard_response_model)
    @dashboard_ns.response(401, 'Unauthorized', standard_response_model)
    def get(self):
        """
        Get traffic breakdown by location for the last 30 days.
        Returns a list of locations with traffic counts and percentages.
        """
        pass


# Health check endpoint
@health_ns.route('/')
class HealthCheck(Resource):
    @health_ns.doc('health_check')
    @health_ns.response(200, 'Success', standard_response_model)
    def get(self):
        """
        Health check endpoint to verify API is running.
        Returns a JSON response with status.
        """
        pass


# Add a simple documentation page
@api_docs_bp.route('/')
@cross_origin()
def api_home():
    """API documentation home page"""
    return {
        'message': 'Analytics Dashboard API',
        'version': '1.0',
        'documentation': '/api/docs',
        'endpoints': {
            'auth': '/api/auth',
            'dashboard': '/api/dashboard',
            'health': '/api/health-check',
        },
        'response_format': {
            'success': 'boolean - Indicates if the request was successful',
            'data': 'object/array - The response data',
            'message': 'string - A message for the client',
        },
    }
