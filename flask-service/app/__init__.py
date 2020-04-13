from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from app.config import Config


db = SQLAlchemy()

def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(Config)
    db.init_app(app)

    with app.app_context():
        from app.models import models
        from app.routes import healthcheck, events, users

        # Create tables for our models
        db.create_all()

        # Register routes
        app.register_blueprint(healthcheck.blueprint)
        app.register_blueprint(events.blueprint, url_prefix="/api")
        app.register_blueprint(users.blueprint, url_prefix="/api")

        return app

