import jwt
from flask_restful import Resource, reqparse
from flask_jwt import JWT
from model.model_interface import imageSearch


class CV(Resource):
    # parser settings
    parser = reqparse.RequestParser()
    parser.add_argument("image", type=str, required=True, help="Image required (convert to base64 string)")

    def post(self):
        data = parser.parse_args()
        prediction, category = imageSearch()
        return {
            "object": prediction,
            "method": category
        }, 201
