from .db import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Illustration(db.Model):
    __tablename__ = 'illustrations'

    id = db.Column(db.Integer, primary_key=True)
    card_uuid = db.Column(db.String, db.ForeignKey('cards.uuid'), nullable = True, unique = True)
    # card_uuid = db.Column(UUID(as_uuid=True), db.ForeignKey('cards.uuid'), nullable = True, unique = True)
    # alternate_cardface_uuid = db.Column(UUID(as_uuid=True), db.ForeignKey('alternate_cardfaces.uuid'), nullable = True, unique = True)
    alternate_cardface_uuid = db.Column(db.String, db.ForeignKey('alternate_cardfaces.uuid'), nullable = True, unique = True)
    artist = db.Column(db.String, default = "")
    small_image = db.Column(db.String, nullable = False)
    normal_image = db.Column(db.String, nullable = False)
    large_image = db.Column(db.String, nullable = False)
    highres_png = db.Column(db.String, nullable = False)
    art_crop = db.Column(db.String, nullable = False)
    card = db.relationship('Card', back_populates='illustration')
    alternate_cardface = db.relationship('Alternate_Cardface', back_populates='illustration')



    def __repr__(self):
        return f'Illustrations({self.id}, {self.card_uuid}, ,{self.alternate_cardface_uuid}, {self.artist}, {self.small_image}, {self.normal_image}, {self.large_image}, {self.highres_png}, {self.art_crop})'
    def to_dict(self):
        return {
            "id": self.id,
            "card_uuid": self.card_uuid,
            "alternate_cardface_uuid": self.alternate_cardface_uuid,
            "artist": self.artist,
            "small_image": self.small_image,
            "normal_image": self.normal_image,
            "large_image": self.large_image,
            "highres_png": self.highres_png,
            "art_crop": self.art_crop
        }
