from .db import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import backref
from flask_sqlalchemy import BaseQuery
from sqlalchemy_searchable import SearchQueryMixin
from sqlalchemy_utils import aggregated
from sqlalchemy_utils.types import TSVectorType
import uuid



def generate_uuid():
    return str(uuid.uuid4())


class AltCardQuery(BaseQuery, SearchQueryMixin):
    pass


class Alternate_Cardface(db.Model):
    query_class = AltCardQuery
    __tablename__ = 'alternate_cardfaces'

    id = db.Column(db.Integer, primary_key=True)
    # base_card_uuid = db.Column(UUID(as_uuid=True), db.ForeignKey('cards.uuid'), default=uuid.uuid4, nullable = False, unique = True)
    base_card_uuid = db.Column(db.Integer, db.ForeignKey('cards.uuid'), nullable = False, unique = True)
    # uuid = db.Column(UUID(as_uuid=True), server_default=db.text("uuid_generate_v4()"), nullable = False, unique = True)
    # uuid = db.Column(UUID(as_uuid=True), default=generate_uuid, unique=True)
    face_change = db.Column(db.String(50), nullable = False)
    name = db.Column(db.String(200), nullable = False)
    type = db.Column(db.String(100), nullable = True)
    mana_cost = db.Column(db.String(50), default="")
    power = db.Column(db.String(10), nullable = True)
    toughness = db.Column(db.String(10), nullable = True)
    loyalty = db.Column(db.String(10), nullable = True)
    keywords = db.Column(db.String(150), nullable = True)
    rules_text = db.Column(db.Text, nullable = True)
    flavor_text = db.Column(db.Text, nullable = True)
    search_vector = db.Column(TSVectorType('name', 'type', 'keywords',
                                           'rules_text', weights={'name': 'A', 'type': 'B', 'keywords': 'C', 'rules_text': 'D'}))
    card = db.relationship('Card', back_populates="alternate_cardfaces")
    illustration = db.relationship('Illustration', uselist=False, back_populates='alternate_cardface', cascade="delete, delete-orphan")

    def __repr__(self):
        return f'Card({self.id}, {self.base_card_uuid}, {self.face_change}, {self.name}, {self.type}, {self.power}, {self.toughness}, {self.loyalty}, {self.keywords}, {self.rules_text}, {self.flavor_text})'

    def to_dict(self):
        return {
            "id": self.id,
            "base_card_uuid": self.base_card_uuid,
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
