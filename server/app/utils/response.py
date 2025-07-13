from flask import jsonify


def standard_response(success, data=None, message=None, status_code=200):
    """
    Standardize API responses.
    Args:
        success (bool): Indicates if the request was successful.
        data (dict or list, optional): The response data.
        message (str, optional): A message for the client.
        status_code (int): HTTP status code.
    Returns:
        Flask Response: JSON response with standard structure.
    """
    response = {
        "success": success,
        "data": data,
        "message": message,
    }
    return jsonify(response), status_code
