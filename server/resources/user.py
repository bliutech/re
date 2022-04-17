import jwt
from flask_restful import Resource, reqparse
from models.user import UserModel
from flask_jwt import JWT


class User(Resource):
    # parser settings
    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, required=True, help="Username is required")
    parser.add_argument("password", type=str, required=True, help="Password is required")

    def post(self):
        data = User.parser.parse_args()

        if UserModel.find_user_by_username(data["username"]):
            return {"message": "user with that username already exists"}, 401
        # database connection
        user = UserModel(**data)

        user.save_to_db()

        return {"message": "User created successfully."}, 201


class UserList(Resource):
    def get(self):
        return {"users": [x.json() for x in UserModel.query.all()]}
