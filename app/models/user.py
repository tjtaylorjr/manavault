from .db import db
from .card import Card
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy.sql import func
from sqlalchemy.orm import backref

upvotes = db.Table(
    'upvotes',
    db.Model.metadata,
    db.Column(
              'user_id',
              db.Integer,
              db.ForeignKey('users.id'),
              primary_key=True),
    db.Column(
              'comment_id',
              db.Integer,
              db.ForeignKey('comments.id'),
              primary_key=True)
)

downvotes = db.Table(
    'downvotes',
    db.Model.metadata,
    db.Column(
              'user_id',
              db.Integer,
              db.ForeignKey('users.id'),
              primary_key=True),
    db.Column(
              'comment_id',
              db.Integer,
              db.ForeignKey('comments.id'),
              primary_key=True)
)

likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column(
              'user_id',
              db.Integer,
              db.ForeignKey('users.id'),
              primary_key=True),
    db.Column(
              'deck_id',
              db.Integer,
              db.ForeignKey('decks.id'),
              primary_key=True)
)

followers = db.Table(
    'followers',
    db.Model.metadata,
    db.Column(
              'followed_id',
              db.Integer,
              db.ForeignKey('users.id'),
              primary_key=True),
    db.Column(
              'follower_id',
              db.Integer,
              db.ForeignKey('users.id'),
              primary_key=True)
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
                           db.DateTime(timezone=True),
                           server_default=func.now())
    decks = db.relationship(
                            "Deck", back_populates="user",
                            cascade="delete, delete-orphan",
                            foreign_keys='Deck.user_id')
    info = db.relationship(
                           "User_Profile", uselist=False,
                           back_populates="user",
                           cascade="delete, delete-orphan")
    user_upvotes = db.relationship(
                                   "Comment",
                                   secondary=upvotes,
                                   back_populates="comment_upvotes")
    user_downvotes = db.relationship(
                                     "Comment",
                                     secondary=downvotes,
                                     back_populates="comment_downvotes")
    user_likes = db.relationship(
                                 "Deck",
                                 secondary=likes,
                                 back_populates="deck_likes")
    # if you run into issues you changed upvotes, downvotes,
    # and likes into back_populates instead of backref
    user_star_ratings = db.relationship(
                                        "Star_Rating",
                                        back_populates="user",
                                        cascade="delete, delete-orphan")
    following = db.relationship(
                                'User',
                                secondary="followers",
                                primaryjoin=id == followers.c.follower_id,
                                secondaryjoin=id == followers.c.followed_id,
                                backref="followers")
    comments = db.relationship("Comment", back_populates="posted_by")

    def __repr__(self):
        return f'User({self.id}, {self.username}, {self.email}, {self.hashed_password}, {self.created_at})'

    def __str__(self):
        return f'{self.id} can be reached at {self.email}'

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "username": self.username,
            "email": self.email,
            "info": self.info.to_dict()
        }

    def to_dict_all(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at,
            "info": self.info.to_dict(),
            "decks": [deck.to_dict() for deck in self.decks],
            "followers": [follower.to_dict() for follower in self.followers],
            "following": [followed.to_dict() for followed in self.following],
            "user_upvotes": [comment.to_dict() for comment in self.user_upvotes],
            "user_downvotes": [comment.to_dict() for comment in self.user_downvotes],
            "user_likes": [deck.to_dict() for deck in self.user_likes],
            "user_star_ratings": [star_rating.to_dict() for star_rating in self.user_star_ratings]
        }

    def to_name_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }
