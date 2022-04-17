from genericpath import exists
from flask_restful import Resource, reqparse
import os
from model.model_interface import image_search
import base64
import json
    
def encodeImage(name):
    with open(name, "rb") as image2string:
        converted_string = base64.b64encode(image2string.read())
    # print(converted_string)
    
    with open(name + ".bin", "wb") as file:
        file.write(converted_string)

def decodeImage(data):
    ## print(len('data:image/jpeg;base64,'))
    # string processing to remove some garbage from JS
    byte = data[23:]
    decodeit = open('trash.jpeg', 'wb')
    decodeit.write(base64.b64decode((byte)))
    decodeit.close()

# if __name__ == '__main__':
#     encodeImage('myWebcam.jpeg')
#     file = open('myWebcam.jpeg.bin', 'rb')
#     byte = +file.read()
#     decodeImage(byte)
#     file.close()

class Image(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("image", type=str, required=True, help="Image is required")

    def post(self):
        data = Image.parser.parse_args()
        decodeImage(data['image'])
        ## input machine learning model here
        # {'plastic': ('recycle', 0.8807971), 'white-glass': ('recycle', 0.2798402), 'trash': ('landfill', 0.22779083)}
        output_list = image_search('trash.jpeg')
        # if exists('trash.jpeg'):
        #     os.rm('trash.jpeg')
        json_string = json.dumps(output_list)
        datastore = json.loads(json_string)
        return datastore, 200