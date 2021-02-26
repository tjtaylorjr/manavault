from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from app.models import Deck, Deck_Card


class BuildSearchForm(FlaskForm):
    search_text = StringField('search_text')
