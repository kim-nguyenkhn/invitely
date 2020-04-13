from flask import Blueprint
from typing import Any

blueprint = Blueprint('example', __name__)

@blueprint.route('/healthcheck', methods=['GET'])
def hello_world() -> Any:
    return {'msg': "Hello World~!"}