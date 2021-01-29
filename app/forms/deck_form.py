from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Deck, Deck_Card, User


class DeckForm(FlaskForm):
    id = IntegerField('deck_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    deck_name = StringField('deck_name', validators=[DataRequired()])
    description = StringField('description')
    background_img = StringField('background_img')
    video_url = StringField('video_url')


class DeckCardForm(FlaskForm):
    id = IntegerField('deck_id', validators=[DataRequired()])
    card_id = IntegerField('deck_id', validators=[DataRequired()])
    in_deck = IntegerField('in_deck')
    in_sideboard = IntegerField('in_sideboard')


class DeckLikeForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
