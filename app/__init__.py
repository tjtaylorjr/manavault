import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from sqlalchemy_searchable import make_searchable


from .models import db, User, followers, User_Profile, Set, Card, Alternate_Cardface, Format_List, Illustration, Deck, Deck_Card, CardQuery, DeckQuery, AltCardQuery, Star_Rating, Comment

#  Comment, followers, Star_Rating, likes, upvotes, downvotes
from .api import user_routes, auth_routes, card_routes, deck_routes, illustration_routes, search_routes, comment_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)

make_searchable(db.metadata)

app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(card_routes, url_prefix='/api/cards')
app.register_blueprint(comment_routes, url_prefix='/api/comments')
app.register_blueprint(deck_routes, url_prefix='/api/decks')
app.register_blueprint(illustration_routes, url_prefix='/api/illustrations')
app.register_blueprint(search_routes, url_prefix='/api/search')
app.register_blueprint(user_routes, url_prefix='/api/users')

db.init_app(app)

db.configure_mappers()

Migrate(app, db)

# Application Security
CORS(app)


# Added later and may not actually work
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
