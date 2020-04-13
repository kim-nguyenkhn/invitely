# This directory contains Flask blueprints (routes).
from flask import Blueprint

api = Blueprint('api', __name__)

from . import events, healthcheck, parser, users
