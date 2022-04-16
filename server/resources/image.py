from genericpath import exists
from flask_restful import Resource, reqparse
from server.image import decodeImage
import os

class Image(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("image", type=str, required=True, help="Image is required")

    def post(self):
        data = Image.parser.parse_args()
        decodeImage(data['image'])
        ## input machine learning model here
        if exists('trash.jpeg'):
            os.rm('trash.jpeg')
        return {"message": "Image recieved successfully."}, 201