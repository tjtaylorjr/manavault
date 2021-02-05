from flask import Blueprint, jsonify, redirect, request
from app.models import db, Card, Illustration
from sqlalchemy import text

card_routes = Blueprint('cards', __name__)


"""
look up info for a card
"""


@card_routes.route('/<int:id>')
def card(id):
    card = Card.query.get(id)
    return card.to_dict()


"""
rate a card
"""
# @card_routes.route('/<int:id>/like', methods=['PATCH'])
# @login_required
# def rate_card(id):
#     form = CardRatingForm()
#     user = User.query.get(form.data['user_id'])
#     card = Card.query.get(id)
#     rating = form.data['rating_value']
#     print(card.to_dict())
#     if form.validate_on_submit():
#         star_rating.stars.
#         db.session.commit()
#         return post.to_dict_likes()
#         else:
#             star_rating.stars.append(user)
#             db.session.commit()
#             return post.to_dict_likes()
#     return {'errors': validation_errors_to_error_messages(form.errors)}
