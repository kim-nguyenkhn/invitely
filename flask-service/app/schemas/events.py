from marshmallow import fields
from marshmallow.validate import Length

from app.schemas.schema import Schema

class CreateEventSchema(Schema):
    # TODO: implement this marshmallow schema
    event_name=fields.String(required=True, validate=Length(0, 128))