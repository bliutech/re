import jwt
from flask_restful import Resource, reqparse
from models.user import UserModel
from flask_jwt import JWT

class Leaderboard(Resource):

    def get(self):
        user = UserModel.get_all_users()
        if user:
            data = []
            for i in user:
                data.append(i.json())
            return data, 200
        # database connection
        return {"message": "unable to find user database"}, 401
        
