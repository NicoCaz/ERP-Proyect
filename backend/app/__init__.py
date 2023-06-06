from flask import Flask
from flask_session import Session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from .routes import 
from config.config import ApplicationConfig
from .models.models import db


app=Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

server_session = Session(app)

db.init_app(app)


with app.app_context():
    db.create_all()



app.register_blueprint(bills_scopes)