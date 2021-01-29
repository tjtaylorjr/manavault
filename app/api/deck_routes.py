from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Deck, Deck_Card, User
from app.forms import DeckForm, DeckCardForm, DeckLikeForm
from .auth_routes import validation_errors_to_error_messages


deck_routes = Blueprint('decks', __name__)

@deck_routes.route('/<int:id>')
def deck(id):
    deck = Deck.query.get(id)
    return deck.to_dict()

"""
recently created decks
"""
@deck_routes.route('/browse')
def recent_decks():
    decks = Deck.query.order_by(Deck.created_at.desc()).limit(50).all()
    return {"decks": [deck.to_dict() for deck in decks]}

"""
create a deck
"""
@deck_routes.route('/create', methods=["POST"])
@login_required
def new_deck():
    form = DeckForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        deck = Deck(
            user_id = current_user.get_id(),
            deck_name = form.data['deck_name'],
            description = form.data['description'],
            background_img = form.data['background_img'],
            video_url = form.data['video_url']
        )
        db.session.add(deck)
        db.session.commit()
        return deck.to_dict()
    print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}


"""
add/edit card list of deck
"""
@deck_routes.route('/<int:id>/cardlist', methods=["POST"])
@login_required
def new_cardlist(id):
    # form = DeckCardForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     deckcard = Deck_Card(
    #       deck_id = form_data['deck_id'],
    #       card_id = form_data['card_id'],
    #       in_deck = form_data['in_deck'],
    #       in_sideboard = form_data['in_sideboard']
    #     )
    #     db.session.add(deckcard)
    #     db.session.commit()
    #     return deckcard.to_dict()
    # print(form.errors)
    # return {'errors': validation_errors_to_error_messages(form.errors)}
    purge_list = Deck_Card.query.filter(Deck_Card.deck_id == id).delete(syncronize_session='fetch')
    db.session.execute(purge_list)
    db.session.commit()
    cardlist = request.json
    for card in cardlist:
        deckcard = Deck_Card(
          deck_id = id,
          card_id = card.card_id,
          in_deck = card.in_deck,
          in_sideboard = card.in_sideboard
        )
        db.session.add(deckcard)
        db.session.commit()
    new_decklist = Deck_Card.query.filter(Deck_Card.deck_id == id).all()
    # return jsonify({"card_list": [deckcard.to_dict() for deckcard in new_decklist]})
    return {"card_list": [deckcard.to_dict() for deckcard in new_decklist]}


"""
edit a deck
"""
@deck_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_deck(id):
    deck = Deck.query.get(id)

    deck.user_id = request.json.get('user_id', deck.user_id)
    deck.deck_name = request.json.get('deck_name', deck.deck_name)
    deck.description = request.json.get('description', deck.description)
    deck.background_img = request.json.get('background_img', deck.background_img)
    deck.video_url = request.json.get('video_url', deck.video_url)

    db.session.commit()
    return deck.to_dict()


"""
delete a deck
"""
@deck_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_deck(id):
    deck = Deck.query.get(id)
    if deck is not None:
        db.session.delete(deck)
        db.session.commit()
        return {"deck deleted": id}
    else:
        return {"error": "Deck not found"}


"""
like a deck
"""
@deck_routes.route('/<int:id>/like', methods=['PATCH'])
@login_required
def like_deck(id):
    form = DeckLikeForm()
    user = User.query.get(form.data['user_id'])
    deck = Deck.query.get(id)
    print(deck.to_dict())
    if form.validate_on_submit():
        if user in deck.deck_likes:
            deck.deck_likes.remove(user)
            db.session.commit()
            return deck.to_dict()
        else:
            deck.deck_likes.append(user)
            db.session.commit()
            return deck.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
