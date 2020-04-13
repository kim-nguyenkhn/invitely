from flask import Blueprint
from flask import jsonify
from typing import Any

from app.controllers import events
from app.models import models
from app.routes.parser import parser
from app.utils.types import FlaskViewResult, JsonDict

blueprint = Blueprint('events', __name__)

@blueprint.route('/events', methods=['POST'])
@parser.use_args(models.Event, location="json")
def create_event(args: JsonDict) -> FlaskViewResult:
    return jsonify(events.controller.create(args))