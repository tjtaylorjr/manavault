from flask_wtf import FlaskForm
from wtforms import IntegerField, FloatField
from wtforms.validators import DataRequired
from app.models import Star_Rating


class CardRatingForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    card_id = IntegerField('card_id', validators=[DataRequired()])
    stars = FloatField('img_url', validators=[DataRequired()])
