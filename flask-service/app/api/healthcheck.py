from flask import jsonify
from . import api

@api.route('healthcheck', methods=['GET'])
def get_health():
    return jsonify({'message': 'hello world'})