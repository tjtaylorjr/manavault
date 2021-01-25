from .db import db

class User_Profile(db.Model):
    __tablename__ = 'user_profiles'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, primary_key=True, autoincrement=False)
    avatar = db.Column(db.String, default="faceless-walker.png")
    location = db.Column(db.String, nullable=True)
    about = db.Column(db.Text, nullable=True)
    VIP = db.Column(db.Boolean, default=False)
    background_img = db.Column(
        db.String, default="https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/d/adeccd88-8dc0-4cc1-943f-27d540d248bb.jpg?1555041035")
    user = db.relationship('User', back_populates='info')


    # def __init__(self, user_id, location, about):
    #     self.user_id = user_id
    #     self.avatar = avatar
    #     self.location = location
    #     self.about = about
    #     self.background_img = background_img


    def __repr__(self):
        return f'User_Profile({self.user_id}, {self.location}, {self.avatar}, {self.about}, {self.VIP}, {self.background_img})'


    def to_dict(self):
        return {
        "location": self.location,
        "avatar": self.avatar,
        "about": self.about,
        "VIP": self.VIP,
        "background_img": self.background_img
        }
