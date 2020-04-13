from typing import Any
from typing import Dict

from app import db
from app.models.sqlite.user import User
from app.utils.types import JsonDict

# TODO: implement a BaseController class that implements some basic sqlite model interactions
# Example: create(), get(), update(), delete()
class UserController():
    def __init__(self) -> None:
        self.M = User

    def create(self, args: JsonDict) -> JsonDict:
        # NOTE: This pattern seems a bit wonky, 
        # but essentially we're returning the result if it already exists.
        # Instead we should return a HTTP_409_CONFLICT status code
        query = User.query.filter_by(email=args['email']).first()
        if query is not None:
            return query
        else:
            m = self.M(**args)
            db.session.add(m)
            db.session.commit()
            return m

controller = UserController()