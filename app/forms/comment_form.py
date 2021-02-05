from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Comment


class CommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    user_avatar = StringField('user_avatar', validators=[DataRequired()])
    deck_id = IntegerField('deck_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])


class UpvoteForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])


class DownvoteForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
