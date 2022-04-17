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


class UserTrash(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("category", type=str, required=True, help="Category required")
    parser.add_argument("username", type=str, required=True, help="user required")

    def post(self):
        data = UserTrash.parser.parse_args()

        user = UserModel.find_user_by_username(data["username"])

        category = data["category"]
        if category == "landfill":
            user.increment_landfill()
        elif category == "recycle":
            user.increment_recycle()
        elif category == "compost":
            user.increment_compost()
        elif category == "special":
            user.increment_special()

        return {"message": "increment"}, 200
