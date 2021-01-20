from .db import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import backref
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Alternate_Cardface(db.Model):
    __tablename__ = 'alternate_cardfaces'

    id = db.Column(db.Integer, primary_key=True)
    # base_card_uuid = db.Column(UUID(as_uuid=True), db.ForeignKey('cards.uuid'), default=uuid.uuid4, nullable = False, unique = True)
    base_card_uuid = db.Column(db.String, db.ForeignKey('cards.uuid'), nullable = False, unique = True)
    # uuid = db.Column(UUID(as_uuid=True), server_default=db.text("uuid_generate_v4()"), nullable = False, unique = True)
    uuid = db.Column(db.String, default = generate_uuid, nullable = False, unique = True)
    face_change = db.Column(db.String(50), nullable = False)
    name = db.Column(db.String(200), nullable = False)
    type = db.Column(db.String(100), nullable = True)
    power = db.Column(db.String(10), nullable = True)
    toughness = db.Column(db.String(10), nullable = True)
    loyalty = db.Column(db.String(10), nullable = True)
    keywords = db.Column(db.String(150), nullable = True)
    rules_text = db.Column(db.Text, nullable = True)
    flavor_text = db.Column(db.Text, nullable = True)
    card = db.relationship('Card', back_populates = "alternate_cardfaces")
    illustration = db.relationship('Illustration', backref=backref('alternate_cardface', uselist=False))

    def __repr__(self):
        return f'Card({self.id}, {self.base_card_uuid}, {self.uuid}, {self.face_change}, {self.name}, {self.type}, {self.power}, {self.toughness}, {self.loyalty}, {self.keywords}, {self.rules_text}, {self.flavor_text})'

    def to_dict(self):
        return {
            "id": self.id,
            "base_card_uuid": self.base_card_uuid,
            "uuid": self.uuid,
            "face_change": self.face_change,
            "name": self.name,
            "type": self.type,
            "power": self.power,
            "toughness": self.toughness,
            "loyalty": self.loyalty,
            "keywords": self.keywords,
            "rules_text": self.rules_text,
            "flavor_text": self.flavor_text,
            "illustration": self.illustration.to_dict(),
        }
