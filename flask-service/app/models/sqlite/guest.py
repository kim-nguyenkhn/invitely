from dataclasses import dataclass
from app import db
from datetime import datetime

@dataclass
class Guest(db.Model):
    guest_id = db.Column(db.Integer, primary_key = True, index=True, nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), primary_key=True, nullable=False)
    time_added = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    telephone = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(120), nullable=True)
    accepted = db.Column(db.Boolean, nullable=False)

    # Relationships
    events = db.relationship("Event", backref="guest", lazy=True)
