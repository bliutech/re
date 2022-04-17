from db import db


class UserModel(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))
    landfill = db.Column(db.Integer)
    recycle = db.Column(db.Integer)
    compost = db.Column(db.Integer)
    special = db.Column(db.Integer)
    points = db.Column(db.Integer)

    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.landfill = 0
        self.recycle = 0
        self.compost = 0
        self.special = 0
        self.points = 0

    # Turns user into dictionary we can jsonify
    def json(self):
        return {
            "username": self.username,
            "landfill": self.landfill,
            "recycle": self.recycle,
            "compost": self.compost,
            "special": self.special,
            "recycle_count": self.points,
        }

    # This gets a user by their username
    @classmethod
    def find_user_by_username(cls, username):
        # This finds first instance where username = username of user in database
        return cls.query.filter_by(username=username).first()

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

    # increment landfill
    def increment_landfill(self):
        self.landfill += 1
        self.add_to_points()

    # increment recycle
    def increment_recycle(self):
        self.recycle += 1
        self.add_to_points()

    # increment compost
    def increment_compost(self):
        self.compost += 1
        self.add_to_points()

    # increment compost
    def increment_special(self):
        self.special += 1
        self.add_to_points()

    def add_to_points(self):
        self.points = self.landfill * 1 + self.recycle * 10 + self.compost * 5 + self.special * 1
