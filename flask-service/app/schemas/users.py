from marshmallow import fields
from marshmallow.validate import Length

from app.schemas.schema import Schema

class CreateUserSchema(Schema):
    email = fields.Email(required=True, validate=Length(0, 128))
    name = fields.String(required=True, allow_none=True, validate=Length(0, 64))
    password = fields.String(required=True, validate=Length(0, 16))