from .db import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import backref
from datetime import datetime
from flask_sqlalchemy import BaseQuery
from sqlalchemy.sql import func
from sqlalchemy_searchable import SearchQueryMixin
from sqlalchemy_utils import aggregated
from sqlalchemy_utils.types import TSVectorType
from .user import User, likes
import uuid

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
    is_commander = db.Column(db.Boolean, default=False)
    is_companion = db.Column(db.Boolean, default=False)
    # card = db.relationship('Card', sync_backref=False)
    card = db.relationship('Card', lazy="joined")
    deck = db.relationship('Deck', back_populates='card_list')

    # def __init__(self, deck_id, card_id, in_deck, in_sideboard):
    #     self.deck_id = deck_id
    #     self.card_id = card_id
    #     self.in_deck = in_deck
    #     self.in_sideboard = in_sideboard

    def __repr__(self):
        return f'Deck_Card({self.deck_id}, {self.card_id}, {self.in_deck}, {self.is_commander}, {self.in_sideboard}, {self.is_companion})'

    def to_dict(self):
        return {
            # "deck_id": self.deck_id,
            # "card_id": self.card_id,
            "in_deck": self.in_deck,
            "in_sideboard": self.in_sideboard,
            "is_commander": self.is_commander,
            "is_companion": self.is_companion,
            "card": self.card.to_dict()
        }

class Deck(db.Model):
    query_class = DeckQuery
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)

    # TO DO get uuids working properly in DB so that I can switch back off of string types.  Or get rid of them all together.

    # uuid = db.Column(UUID(as_uuid=True), server_default=db.text("uuid_generate_v4()"), nullable = False, unique = True)

    uuid = db.Column(db.String, default= generate_uuid, nullable = False, unique = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    creator_name = db.Column(db.String, db.ForeignKey('users.username'))
    deck_name = db.Column(db.String, default = "Unnamed Deck")
    # created_at = db.Column(db.DateTime, default = datetime.now())
    # updated_at = db.Column(db.DateTime, default = datetime.now())
    created_at = db.Column(db.DateTime(timezone=True), server_default = func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    description = db.Column(db.Text, nullable = True)
    background_img = db.Column(db.String, nullable = True)
    video_url = db.Column(db.String, nullable = True)
    # avg_rating = db.Column(db.Float(precision = 1), nullable = True)
    @aggregated('deck_likes', db.Column(db.Integer, default=0))
    def total_likes(self):
        return db.func.count('1')
    @aggregated('deck_comments', db.Column(db.Integer, default=0))
    def total_comments(self):
        return db.func.count('1')
    search_vector = db.Column(TSVectorType('deck_name', 'description', 'creator_name', weights={'deck_name': 'A', 'creator_name': 'B', 'description': 'C'}))
    card_list = db.relationship("Deck_Card", back_populates="deck", cascade="delete, delete-orphan")
    user = db.relationship("User", back_populates="decks", foreign_keys='Deck.user_id')
    deck_likes = db.relationship("User", secondary=likes, back_populates="user_likes")
    deck_comments = db.relationship("Comment", cascade="all, delete-orphan", backref="deck", lazy="joined")

    def __init__(self, user_id, creator_name, deck_name, description, background_img, video_url):
        self.user_id = user_id
        self.creator_name = creator_name
        self.deck_name = deck_name
        self.description = description
        self.background_img = background_img
        self.video_url = video_url

    def __repr__(self):
        return f'Deck({self.id}, {self.uuid}, {self.user_id}, {self.creator_name}, {self.deck_name}, {self.created_at}, {self.updated_at}, {self.description}, {self.background_img}, {self.video_url}, {self.total_likes}, {self.card_list})'

    def to_dict(self):
        return {
            "id": self.id,
            "uuid": self.uuid,
            "user_id": self.user_id,
            "creator_name": self.creator_name,
            "deck_name": self.deck_name,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "description": self.description,
            "background_img": self.background_img,
            "self.video_url": self.video_url,
            "total_comments": self.total_comments,
            "total_likes": self.total_likes,
            "card_list": [deck_card.to_dict() for deck_card in self.card_list],
            "deck_likes": [user.to_dict() for user in self.deck_likes]
        }

    def to_name_dict(self):
        return {
            "id": self.id,
            "deck_name": self.deck_name
        }
