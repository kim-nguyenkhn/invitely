from datetime import datetime
from app import db

# Users
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    name = db.Column(db.String(120))
    password = db.Column(db.String(128))

    def __repr__(self):
        return '<Email {}>'.format(self.email)

# Events
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    creation_time = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    event_name = db.Column(db.String(280), nullable=False)
    event_host = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    location_address1 = db.Column(db.String(140), nullable=False)
    location_address2 = db.Column(db.String(140), nullable=True)
    location_city = db.Column(db.String(120), nullable=True)
    location_state = db.Column(db.String(2), nullable=False)
    location_zipcode = db.Column(db.String(5), nullable=False)
    host_message = db.Column(db.String(500), nullable=True)


# guests
class Guest(db.Model):
    guest_id = db.Column(db.Integer, primary_key = True, index=True, nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), primary_key=True, nullable=False)
    time_added = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    telephone = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(120), nullable=True)
    accepted = db.Column(db.Boolean, nullable=False)

    # Relationships
    events = db.relationship("Events", backref="guests", lazy=True)
