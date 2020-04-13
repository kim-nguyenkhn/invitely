from flask import Blueprint
from flask import jsonify
from typing import Any

from app.controllers import users
from app.schemas.users import CreateUserSchema
from app.api.parser import parser
from app.utils.types import FlaskViewResult, JsonDict

blueprint = Blueprint('users', __name__)

@blueprint.route('/users', methods=['POST'])
@parser.use_args(CreateUserSchema(), location="json")
def create_user(args: JsonDict) -> FlaskViewResult:
    return jsonify(users.controller.create(args))