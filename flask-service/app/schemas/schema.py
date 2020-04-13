from typing import Any

from marshmallow import fields
from marshmallow import Schema as MarshmallowSchema


class Schema(MarshmallowSchema):
    class Meta:
        strict = True


# Override UUID's _deserialize, we don't want an actual UUID obj
class UUID(fields.UUID):
    def _deserialize(self, value: str, *args: Any, **kwargs: Any) -> str:
        self._validated(value)
        return value
