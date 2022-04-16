import jwt
from flask_restful import Resource, reqparse
from flask_jwt import JWT
from model.model_interface import image_search


class CV(Resource):
    # parser settings
    parser = reqparse.RequestParser()
    parser.add_argument("image", type=str, required=True, help="Image required (convert to base64 string)")

    def post(self):
        data = parser.parse_args()
        output_list = image_search()
        return {
            "object": output_list,
        }, 201
