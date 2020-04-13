from typing import Any
from typing import Dict

from app import db
from app.models import models
from app.utils.types import JsonDict


class UserController():
    def __init__(self) -> None:
        self.M = models.User

    def create(self, args: JsonDict) -> JsonDict:
        m = self.M(**args)
        m.session.save()
        return m.to_dict()

controller = UserController()