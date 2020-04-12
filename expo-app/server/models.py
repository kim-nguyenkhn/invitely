from datetime import datetime
from app import db

# Users
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True)
    name = db.Column(db.String(120))
    password = db.Column(db.String(128))

    def __repr__(self):
        return '<Email {}>'.format(self.email)

# Events