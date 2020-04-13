from typing import Any
from typing import Dict

from app import db
from app.models.sqlite import models
from app.utils.types import JsonDict


class UserController():
    def __init__(self) -> None:
        self.M = models.User

    def create(self, args: JsonDict) -> JsonDict:
        m = self.M(**args)
        db.session.add(m)
        db.session.commit()
        return m

controller = UserController()