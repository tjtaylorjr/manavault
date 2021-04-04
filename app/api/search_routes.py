from flask import Blueprint, jsonify, redirect, request
from app.models import db, Card, Deck, User, Illustration
from app.forms import BuildSearchForm
from sqlalchemy import or_, func, desc, text
from sqlalchemy.orm import joinedload
from sqlalchemy_searchable import search

search_routes = Blueprint('search', __name__)


@search_routes.route('/<params>')
def general_search(params):
    result = User.query.filter(User.username.ilike(f"%{params}%")).limit(50).all()
    data = [user.to_dict_all() for user in result]
    user_results = {"users": data}

    result2 = Deck.query.search(params, sort=True).order_by(Deck.deck_name).limit(50).all()
    data2 = [deck.to_dict() for deck in result2]
    deck_result = {"decks": data2}

    result3 = Card.query.search(params, sort=True).filter(func.LENGTH(Card.set_code) <= 3).distinct(
    ).options(joinedload(Card.illustration)).order_by(Card.name, Card.set_code).limit(1000).all()
    data3 = [card.to_dict() for card in result3]
    card_results = {"cards": data3}



    # result3 = Card.query.filter(or_(Card.name.ilike(f"%{query}%"), Card.type.ilike(f"%{query}%"), Card.keywords.ilike(f"%{query}%"), Card.rules_text.ilike(f"%{query}%"), Card.flavor_text.ilike(f"%{query}%"))).group_by(Card.id).order_by(func.count(Card.uuid).label('qty').desc()).all

    # subquery()
    # result3 = Card.query.filter(or_(Card.name.ilike(f"%{query}%"), Card.type.ilike(f"%{query}%"), Card.keywords.ilike(f"%{query}%"), Card.rules_text.ilike(f"%{query}%"), Card.flavor_text.ilike(f"%{query}%"))).distinct(func.count(Card.uuid).label(text('qty'))).group_by(Card.uuid).order_by(desc('qty')).all()

    # results3 = Card.query(func.count(Card.uuid).label('qty')).group_by(Card.uuid).order_by(desc('qty'))
    # result3 = Card.query.distinct(Card.uuid.in_(result3_subquery)).all()
    # result3 = Card.query.filter(or_(Card.name.ilike(f"%{query}%"), Card.type.ilike(f"%{query}%"), Card.keywords.ilike(f"%{query}%"), Card.rules_text.ilike(f"%{query}%"), Card.flavor_text.ilike(f"%{query}%"))).distinct(Card.uuid).all()

    return {"results": [{"users": data}, {"decks": data2}, {"cards": data3}]}

@search_routes.route('/build', methods=["POST"])
def deck_build_search():
    form = BuildSearchForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        text = form.data['search_text']

        results = Card.query.search(text, sort=True).filter(func.LENGTH(Card.set_code) <= 3).distinct(
        ).options(joinedload(Card.illustration)).order_by(Card.name, Card.id.desc()).limit(500).all()
        return {"cards": [card.to_dict() for card in results]}
