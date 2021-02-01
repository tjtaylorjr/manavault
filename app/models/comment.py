from .db import db
from .deck import Deck
from .user import User, upvotes, downvotes
from sqlalchemy_utils import aggregated
from sqlalchemy.sql import func
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_avatar = db.Column(db.String)
    deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'))
    created_at = db.Column(db.DateTime(timezone=True), server_default = func.now())
    content = db.Column(db.String(1000), nullable=False)
    @aggregated('comment_upvotes', db.Column(db.Integer))
    def upvote_count(self):
        return db.func.count('1')
    @aggregated('comment_downvotes', db.Column(db.Integer))
    def downvote_count(self):
        return db.func.count('1')
    comment_upvotes = db.relationship("User", secondary=upvotes, back_populates="user_upvotes")
    comment_downvotes = db.relationship("User", secondary=downvotes, back_populates="user_downvotes")


    def to_dict(self):
        return {
          "id": self.id,
          "user_id": self.user_id,
          "user_avatar": self.user_avatar,
          "deck_id": self.deck_id,
          "created_at": self.created_at,
          "content": self.content,
          "comment_upvotes": [user.to_dict() for user in self.comment_upvotes],
          "comment_downvotes": [user.to_dict() for user in self.comment_downvotes]
        }
