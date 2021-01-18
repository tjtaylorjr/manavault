from flask import Blueprint, jsonify, redirect, request
from app.models import db, Card, Deck, User
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)

@search_routes.route('/<query>')
def general_search(query):
    result = User.query.filter(User.username.ilike(f"%{query}%")).all()
    data = [user.to_dict() for user in result]
    user_results = {"users": data}

    result2 = Deck.query.filter(or_(Deck.deck_name.ilike(f"%{query}%"), Deck.description.ilike(f"%{query}%"))).all()
    data2 = [deck.to_dict() for deck in result2]
    deck_results = {"decks": data2}

    result3 = Card.query.filter(or_(Card.name.ilike(f"%{query}%"), Card.type.ilike(f"%{query}%"), Card.keywords.ilike(f"%{query}%"), Card.rules_text.ilike(f"%{query}%"), Card.flavor_text.ilike(f"%{query}%"))).all()
    data3 = [card.to_dict() for card in result3]
    card_results = {"cards": data3}

    return {"results": [{"users": data}, {"decks": data2}, {"cards": data3}]}
