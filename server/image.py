import base64

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