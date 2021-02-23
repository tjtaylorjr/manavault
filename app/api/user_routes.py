
from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms import FollowForm
from app.models import db, User
from .auth_routes import validation_errors_to_error_messages


user_routes = Blueprint('users', __name__)


@user_routes.route('/browse')
def recently_joined_users():
    users = User.query.order_by(User.created_at.desc()).limit(50).all()
    return {"users": [user.to_dict_all() for user in users]}

@user_routes.route('/browse/<char>')
def users_by_alphabet(char):
    users = User.query.filter(User.username.ilike(f'{char}%')).all()
    return {"users": [user.to_dict_all() for user in users]}

@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict_all()


@user_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def follow_user(id):
    form = FollowForm()
    follower = User.query.get(form.data['follower_id'])
    followed = User.query.get(id)

    if follower in followed.followers:
        followed.followers.remove(follower)
        db.session.commit()
        return followed.to_dict_all()
    else:
        followed.followers.append(follower)
        db.session.commit()
        return followed.to_dict_all()

    return {'errors': validation_errors_to_error_messages(form.errors)}

# @user_routes.route('/profile/<int:id>')
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict_all()
