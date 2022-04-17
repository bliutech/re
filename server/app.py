from security import authenticate, identity
from flask import Flask
from flask_restful import Api
from security import authenticate, identity
from flask_jwt import JWT
from flask_cors import CORS

from db import db
from resources.user import User
#from resources.cv import CV
from resources.getUser import GetUser
from resources.leaderboard import Leaderboard

import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
api = Api(app)
CORS(app)
app.secret_key = "insert_key_here"

jwt = JWT(app, authenticate, identity)


@app.before_first_request
def create_tables():
    db.create_all()

api.add_resource(User, "/register")
#api.add_resource(CV, "/img")
api.add_resource(GetUser, "/user/<string:name>")
api.add_resource(Leaderboard, "/leaderboard")

if __name__ == "__main__":
    db.init_app(app)
    app.run(port=8000, debug=True)

