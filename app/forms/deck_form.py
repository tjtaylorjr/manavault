from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.models import Deck, Deck_Card, User


class DeckForm(FlaskForm):
    # id = IntegerField('deck_id', validators=[DataRequired()])
    # would this even have an id slot?  It gets created in PostgreSQL.
    # unsure why I added this here so I am leaving it commented out for now
    user_id = IntegerField('user_id', validators=[DataRequired()])
    creator_name = StringField('creator_name', validators=[DataRequired()])
    deck_name = StringField('deck_name', validators=[DataRequired()])
    description = StringField('description')
    background_img = StringField('background_img')
    video_url = StringField('video_url')


class DeckCardForm(FlaskForm):
    deck_id = IntegerField('deck_id', validators=[DataRequired()])
    card_id = IntegerField('card_id', validators=[DataRequired()])
    in_deck = IntegerField('in_deck')
    in_sideboard = IntegerField('in_sideboard')
    is_commander = BooleanField('is_commander')
    is_companion = BooleanField('is_companion')


class DeckLikeForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
