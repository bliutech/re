# Server


## Installation of Dependencies
On Mac:
1. Install python 3.9
2. run ```pip install virtualenv```
3. In this folder run ```virtualenv venv --python=3.9```
4. Enter venv by doing ```source venv/bin/activate```
5. pip install the following. You can do this with one install of ```pip install -r requirements.txt```.
``` 
    flask
    flask-restful
    flask-sqlalchemy
    flask-jwt
    flask-cors
```
cd to code folder then run ```python app.py```
If you make changes make sure to delete the data.db as that is currently acting as the database