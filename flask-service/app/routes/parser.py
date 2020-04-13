from typing import Any
from webargs.flaskparser import FlaskParser

from app.exceptions import InvalidRequestParameters

parser = FlaskParser()


# TODO: Figure out what type error is so we don't have to use Any here
@parser.error_handler
def handle_error(error: Any, *args: Any, **kwargs: Any) -> None:
    raise InvalidRequestParameters(error.messages)
