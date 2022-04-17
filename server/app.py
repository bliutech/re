from security import authenticate, identity
from flask import Flask, jsonify
from flask_restful import Api
from security import authenticate, identity
from flask_jwt import JWT
from flask_cors import CORS

from db import db
from resources.user import User, UserList
from resources.getUser import GetUser
from resources.leaderboard import Leaderboard
from resources.image import Image

import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
api = Api(app)
CORS(app)
# CORS(app, resources={r"/image": {"origins": "*"}})
app.secret_key = "insert_key_here"

jwt = JWT(app, authenticate, identity)


@app.before_first_request
def create_tables():
    db.create_all()

api.add_resource(User, "/register")
api.add_resource(Image, "/image")
api.add_resource(GetUser, "/user/<string:name>")
# api.add_resource(UserList, "/users")
api.add_resource(Leaderboard, "/leaderboard")

@jwt.auth_response_handler
def customized_response_handler(access_token, identity):
    resp = {"access_token": access_token.decode("utf-8")}
    resp.update(identity.json())
    return jsonify(resp)

api.add_resource(User, "/register")
api.add_resource(UserList, "/users")
api.add_resource(Image, "/image")

if __name__ == "__main__":
    db.init_app(app)
    app.run(port=8000, debug=True)

