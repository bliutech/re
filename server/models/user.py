from db import db
class UserModel(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))
    recycle_count = db.Column(db.Integer)

    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.recycle_count = 0

    # Turns user into dictionary we can jsonify
    def json(self):
        return {"username": self.username, "recycle_count": self.recycle_count}

    # This gets a user by their username
    @classmethod
    def find_user_by_username(cls, username):
        # This finds first instance where username = username of user in database
        return cls.query.filter_by(username=username).first()

    @classmethod
    def get_all_users(cls):
        # This returns all users in database
        return cls.query.filter_by().all()


    # This gets a user by their username
    @classmethod
    def find_user_by_id(cls, _id):
        # This finds first instance where username = username of user in database
        return cls.query.filter_by(id=_id).first()

    # This adds/updates itself from database
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    # This deletes user from database
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
