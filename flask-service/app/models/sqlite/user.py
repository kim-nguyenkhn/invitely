from dataclasses import dataclass
from app import db

@dataclass
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    name = db.Column(db.String(120))
    password = db.Column(db.String(128))

    def __repr__(self):
        return '<Email {}>'.format(self.email)