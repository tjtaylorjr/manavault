from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Deck, Comment
from app.forms import CommentForm, UpvoteForm, DownvoteForm
from .auth_routes import validation_errors_to_error_messages


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>')
def last_100_comments(id):
    comments = Comment.query.filter(Comment.deck_id == id).order_by((Comment.upvote_count - Comment.downvote_count).desc(), Comment.created_at.desc()).limit(100)
    return {"comments": [comment.to_dict() for comment in comments]}


@comment_routes.route('/<int:id>/latest')
def latest_comment(id):
    comment = Comment.query.filter(Comment.deck_id == id).order_by(Comment.created_at.desc()).first()
    return comment.to_dict()


@comment_routes.route('/<int:id>', methods=["POST"])
@login_required
def new_comment(id):
    form = CommentForm()
    deck = Deck.query.get(id)
    comment = Comment(
        user_id=form.data['user_id'],
        user_avatar=form.data['user_avatar'],
        deck_id=id,
        content=form.data['content']
    )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()


@comment_routes.route('/<int:id>/upvote', methods=["PATCH"])
@login_required
def manage_upvote(id):
    form = UpvoteForm()
    comment = Comment.query.get(id)
    user = User.query.get(form.data['user_id'])
    if form.validate_on_submit():
        if user in comment.comment_upvote:
            comment.comment_upvote.remove(user)
            db.session.commit()
            return comment.to_dict()
        else:
            if user in comment.comment_downvote:
                comment.comment_downvote.remove(user)
            comment.comment_upvote.append(user)
            db.session.commit()
            return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

@comment_routes.route('/<int:id>/downvote', methods=["PATCH"])
@login_required
def manage_downvote(id):
    form = DownvoteForm()
    comment = Comment.query.get(id)
    user = User.query.get(form.data['user_id'])
    if form.validate_on_submit():
        if user in comment.comment_downvote:
            comment.comment_downvote.remove(user)
            db.session.commit()
            return comment.to_dict()
        else:
            if user in comment.comment_upvote:
                comment.comment_upvote.remove(user)
            comment.comment_downvote.append(user)
            db.session.commit()
            return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
