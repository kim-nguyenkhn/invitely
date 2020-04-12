from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate
from flask_restful import Api, Resource, reqparse, fields, marshal

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)

from app import models
