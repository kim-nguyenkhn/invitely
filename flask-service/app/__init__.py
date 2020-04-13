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
        from app.models.sqlite import event, guest, user
        from app.routes import healthcheck, events, users

        # Create tables for our models
        db.create_all()
        
        # Clear data for all tables, https://gist.github.com/vkotovv/6281951
        # clear_data(db.session)

        # Register routes
        app.register_blueprint(healthcheck.blueprint)
        app.register_blueprint(events.blueprint, url_prefix="/api")
        app.register_blueprint(users.blueprint, url_prefix="/api")

        return app


def clear_data(session):
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print('Clear table %s' % table)
        session.execute(table.delete())
    session.commit()
