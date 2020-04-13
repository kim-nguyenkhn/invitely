from typing import Any
from typing import Dict
from typing import Optional
from typing import Tuple
from typing import Union

from flask.wrappers import Response

# https://github.com/python/typing/issues/182
JsonDict = Dict[str, Any]

# Per Flask's flask.make_response
_FlaskResponse = Union[
    str,
    bytes,
    JsonDict,
    Response,
]
FlaskViewResult = Union[
    _FlaskResponse,
    Tuple[Optional[_FlaskResponse], int],  # (response, status_code)
    Tuple[Optional[_FlaskResponse], int, Dict[str, str]],  # (response, status_code, headers)
    Tuple[Optional[_FlaskResponse], Dict[str, str]],  # (response, headers)
]
