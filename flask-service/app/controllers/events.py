from typing import Any
from typing import Dict

from app import db
from app.models.sqlite.event import Event
from app.utils.types import JsonDict


class EventController():
    def __init__(self) -> None:
        self.M = Event

    def create(self, args: JsonDict) -> JsonDict:
        m = self.M(**args)
        db.session.add(m)
        db.session.commit()
        return m

controller = EventController()