from flask import Blueprint
from flask import jsonify
from typing import Any

from app.controllers import users
from app.models import models
from app.routes.parser import parser
from app.utils.types import FlaskViewResult, JsonDict

blueprint = Blueprint('users', __name__)

@blueprint.route('/users', methods=['POST'])
@parser.use_args(models.Event, location="json")
def create_event(args: JsonDict) -> FlaskViewResult:
    return jsonify(users.controller.create(args))