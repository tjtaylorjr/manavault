from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    decks = db.relationship("Deck", back_populates="user",
                            cascade="delete, delete-orphan", foreign_keys='Deck.user_id')
    info = db.relationship("User_Profile", uselist=False, back_populates="user", cascade="delete, delete-orphan")

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
            "username": self.username,
            "email": self.email
        }

    def to_dict_all(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at,
            "info": self.info.to_dict(),
            "decks": [deck.to_dict() for deck in self.decks]
        }
