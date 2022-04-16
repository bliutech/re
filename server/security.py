from models.user import UserModel
from hmac import compare_digest


def authenticate(username, password):
    # .get(a) == b[a] except you can set a default value
    user = UserModel.find_user_by_username(username)
    if user and compare_digest(user.password, password):
        return user


def identity(payload):
    user_id = payload["identity"]
    return UserModel.find_user_by_id(user_id)
