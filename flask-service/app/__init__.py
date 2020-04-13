from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from app import config

db = SQLAlchemy()

def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(config.Config)
    db.init_app(app)

    with app.app_context():
        from . import models

        # Create tables for our models
        db.create_all()

        return app
