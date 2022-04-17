import jwt
from flask_restful import Resource, reqparse
from models.user import UserModel
from flask_jwt import JWT

class GetUser(Resource):

    def get(self, name):
        user = UserModel.find_user_by_username(name)
        if user:
            return user.json(), 200
        # database connection
        return {"message": "unable to find user"}, 401
        
