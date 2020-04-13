from dataclasses import dataclass
from app import db
from datetime import datetime

@dataclass
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