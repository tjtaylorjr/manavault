from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Deck, Deck_Card, User, Comment
from app.forms import DeckForm, DeckCardForm, DeckLikeForm, CommentForm, UpvoteForm, DownvoteForm
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy.sql.expression import func


deck_routes = Blueprint('decks', __name__)


"""
a selection of random decks
"""


@deck_routes.route('/browse')
def recent_decks():
    decks = Deck.query.order_by(func.random()).limit(50).all()
    return {"decks": [deck.to_dict() for deck in decks]}


"""
latest decks
"""

@deck_routes.route('/browse/latest')
def latest_decks():
    decks = Deck.query.order_by(Deck.created_at.desc()).limit(50).all()
    return {"decks": [deck.to_dict() for deck in decks]}


"""
most liked decks
"""
@deck_routes.route('/browse/most-liked')
def most_liked_decks():
    decks = Deck.query.order_by(Deck.total_likes.desc()).limit(50).all()
    return {"decks": [deck.to_dict() for deck in decks]}


"""
most viewed decks

will work on this later.  Needs special handling due to reacts nature as single page application
"""


# @deck_routes.route('/browse/most-viewed')
# def most_viewed_decks():
#     decks = Deck.query.order_by(Deck.PLACEHOLDER.desc()).limit(50).all()
#     return {"decks": [deck.to_dict() for deck in decks]}


"""
most discussed decks
"""

@deck_routes.route('/browse/most-discussed')
def most_commented_decks():
    decks = Deck.query.order_by(Deck.total_comments.desc()).limit(50).all()
    return {"decks": [deck.to_dict() for deck in decks]}


"""
create a deck
"""


@deck_routes.route('/build', methods=["POST"])
@login_required
def new_deck():
    form = DeckForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        deck = Deck(
            # user_id = current_user.get_id(),
            user_id = form.data['user_id'],
            creator_name = form.data['creator_name'],
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
get information about a specific deck
"""


@deck_routes.route('/<int:id>')
def deck(id):
    deck = Deck.query.get(id)
    return deck.to_dict()



"""
add/edit card list of deck
"""


@deck_routes.route('/<int:deck_id>/cardlist', methods=["POST"])
@login_required
def new_cardlist(deck_id):
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
    purge_list = Deck_Card.query.filter(Deck_Card.deck_id == deck_id).delete(syncronize_session='fetch')
    db.session.execute(purge_list)
    db.session.commit()
    data = request.json
    for card in data.cardList:
        deckcard = Deck_Card(
          deck_id = deck_id,
          card_id = card.card.card_id,
          in_deck = card.in_deck,
          in_sideboard = card.in_sideboard,
          is_commander = card.is_commander,
          is_companion = card.is_companion
        )
        db.session.add(deckcard)
        db.session.commit()
    new_decklist = Deck_Card.query.filter(Deck_Card.deck_id == deck_id).all()
    # return jsonify({"card_list": [deckcard.to_dict() for deckcard in new_decklist]})
    return {"card_list": [deckcard.to_dict() for deckcard in new_decklist]}


"""
edit a deck
"""


@deck_routes.route('/<int:deck_id>/edit', methods=["PUT"])
@login_required
def edit_deck(deck_id):
    deck = Deck.query.get(deck_id)

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


@deck_routes.route('/<int:deck_id>/delete', methods=["DELETE"])
@login_required
def delete_deck(deck_id):
    deck = Deck.query.get(deck_id)
    if deck is not None:
        db.session.delete(deck)
        db.session.commit()
        return {"deck deleted ID": deck_id}
    else:
        return {"error": "Deck not found"}


"""
like a deck
"""


@deck_routes.route('/<int:deck_id>/like', methods=['PATCH'])
@login_required
def like_deck(deck_id):
    form = DeckLikeForm()
    user = User.query.get(form.data['user_id'])
    deck = Deck.query.get(deck_id)
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


"""
get last 100 comments for deck / or post a new message
"""


@deck_routes.route('/<int:deck_id>/comments')
def last_100_comments(deck_id):
    comments = Comment.query.filter(
        Comment.deck_id == deck_id).order_by((
            Comment.upvote_count - Comment.downvote_count).desc(),
        Comment.created_at.desc()).limit(100)
    return {"comments": [comment.to_dict() for comment in comments]}


"""
get newest posted comment
"""


@deck_routes.route('/<int:deck_id>/comments/newest')
def latest_comment(deck_id):
    comment = Comment.query.filter(
        Comment.deck_id == deck_id).order_by(
        Comment.created_at.desc()).first()
    return comment.to_dict()


"""
get a specific comment
"""

@deck_routes.route('/<int:deck_id>/comments/<int:comment_id>')
def fetch_comment_info(deck_id, comment_id):
    comment = Comment.query.get(comment_id)
    return comment.to_dict()


"""
post a comment
"""


@deck_routes.route('/<int:deck_id>/comments', methods=["POST"])
@login_required
def new_comment(deck_id):
    form = CommentForm()
    deck = Deck.query.get(deck_id)
    comment = Comment(
        user_id=form.data['user_id'],
        user_avatar=form.data['user_avatar'],
        deck_id=deck_id,
        content=form.data['content']
    )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()


"""
upvote a comment
"""


@deck_routes.route('/<int:deck_id>/comments/<int:comment_id>/upvote', methods=["PATCH"])
@login_required
def manage_upvote(deck_id, comment_id):
    form = UpvoteForm()
    comment = Comment.query.get(comment_id)
    user = User.query.get(form.data['user_id'])

    if user in comment.comment_upvotes:
        comment.comment_upvotes.remove(user)
        db.session.commit()
        return comment.to_dict()
    else:
        if user in comment.comment_downvotes:
            comment.comment_downvotes.remove(user)
        comment.comment_upvotes.append(user)
        db.session.commit()
        return comment.to_dict()


"""
downvote a comment
"""


@deck_routes.route('/<int:deck_id>/comments/<int:comment_id>/downvote', methods=["PATCH"])
@login_required
def manage_downvote(deck_id, comment_id):
    form = DownvoteForm()
    comment = Comment.query.get(comment_id)
    user = User.query.get(form.data['user_id'])
    if user in comment.comment_downvotes:
        comment.comment_downvotes.remove(user)
        db.session.commit()
        return comment.to_dict()
    else:
        if user in comment.comment_upvotes:
            comment.comment_upvotes.remove(user)
        comment.comment_downvotes.append(user)
        db.session.commit()
        return comment.to_dict()
