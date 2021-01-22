from .db import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import backref
from datetime import datetime
from flask_sqlalchemy import BaseQuery
from sqlalchemy_searchable import SearchQueryMixin
from sqlalchemy_utils.types import TSVectorType
# from sqlalchemy_searchable import make_searchable

import uuid

# make_searchable(db.metadata)

# deck_cards = db.Table(
#     "deck_card",
#     db.Model.metadata,
#     db.Column('deck_id', db.Integer, db.ForeignKey("decks.id"), primary_key = True,
#     db.Column('card_id', db.Integer, db.ForeignKey("cards.id"), primary_key = True)


def generate_uuid():
    return str(uuid.uuid4())


class DeckQuery(BaseQuery, SearchQueryMixin):
    pass


class Deck_Card(db.Model):
    __tablename__ = 'deck_cards'
    deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'), primary_key = True)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), primary_key = True)
    in_deck = db.Column(db.Integer, default=0)
    in_sideboard = db.Column(db.Integer, default=0)
    card = db.relationship('Card', lazy="joined")
    deck = db.relationship('Deck', back_populates='card_list')

    def __init__(self, deck_id, card_id, in_deck, in_sideboard):
        self.deck_id = deck_id
        self.card_id = card_id
        self.in_deck = in_deck
        self.in_sideboard = in_sideboard

    def __repr__(self):
        return f'Deck_Card({self.deck_id}, {self.card_id}, {self.in_deck}, {self.in_sideboard})'


class Deck(db.Model):
    query_class = DeckQuery
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)
    # uuid = db.Column(UUID(as_uuid=True), server_default=db.text("uuid_generate_v4()"), nullable = False, unique = True)
    uuid = db.Column(db.String, default= generate_uuid, nullable = False, unique = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    creator_name = db.Column(db.String, db.ForeignKey('users.username'))
    deck_name = db.Column(db.String, default = "Unnamed Deck")
    created_at = db.Column(db.DateTime, default = datetime.now())
    updated_at = db.Column(db.DateTime, default = datetime.now())
    description = db.Column(db.Text, nullable = True)
    background_img = db.Column(db.String, nullable = True)
    video_url = db.Column(db.String, nullable = True)
    avg_rating = db.Column(db.Float(precision = 1), nullable = True)
    search_vector = db.Column(TSVectorType('deck_name'))
    # card_list = db.Column(db.ARRAY(db.String), default = [])
    # cards = db.relationship('Card', secondary=deck_list, backref="decks"))
    card_list = db.relationship("Deck_Card", back_populates="deck", cascade="delete, delete-orphan")
    user = db.relationship("User", back_populates="decks", foreign_keys='Deck.user_id')

    def __init__(self, user_id, creator_name, deck_name, description, background_img, video_url):
        self.user_id = user_id
        self.creator_name = creator_name
        self.deck_name = deck_name
        self.description = description
        self.background_img = background_img
        self.video_url = video_url

    def __repr__(self):
        return f'Deck({self.id}, {self.uuid}, {self.user_id}, {self.creator_name}, {self.deck_name}, {self.created_at}, {self.updated_at}, {self.description}, {self.background_img}, {self.video_url}, {self.avg_rating}, {self.card_list})'

    def to_dict(self):
        return {
            "id": self.id,
            "uuid": self.uuid,
            "user_id": self.user_id,
            "creator_username": self.creator_username,
            "deck_name": self.deck_name,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "description": self.description,
            "background_img": self.background_img,
            "self.video_url": self.self.video_url,
            "avg_rating": self.avg_rating,
            "card_list": [deck_card.to_dict() for deck_card in self.card_list]
        }
