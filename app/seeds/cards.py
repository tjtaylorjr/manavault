from app.models import db, Star_Rating
from sqlalchemy import create_engine
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.types import Integer, String, Float, Boolean, Text
import uuid
import os
import pandas as pd


def seed_cards():

    seed_folder = os.path.dirname(os.path.abspath(__file__))
    cards_csv = os.path.join(seed_folder, 'csv_files/cards.csv')

    db_url = os.environ.get('DATABASE_URL')
    engine = create_engine(db_url, echo=True)
    cards_df = pd.read_csv(cards_csv)

    table_name = 'cards'

    cards_df.to_sql (
        table_name,
        engine,
        if_exists='append',
        index=False,
        # index_label='id',
        chunksize=10000,
        dtype = {
          "uuid": String,
          "arena_id": Integer,
          "name": String(200),
          "set_code": String(10),
          "set_number": String(10),
          "rarity": String(10),
          "type": String(100),
          "power": String(10),
          "toughness": String(10),
          "loyalty": String(10),
          "mana_cost": String(50),
          "conv_mana_cost": Float(precision=1),
          "keywords": String(150),
          "rules_text": Text,
          "flavor_text": Text,
          "is_multifaced": Boolean,
          "avg_rating": Float(precision=1)
        }
    )


def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
    print('unseed cards complete')

def seed_star_ratings():
    rating1 = Star_Rating(
        user_id = 1,
        card_id = 2180,
        stars = 4
    )
    db.session.add(rating1)

    rating2 = Star_Rating(
        user_id = 2,
        card_id = 2180,
        stars = 5
    )
    db.session.add(rating2)

    rating3 = Star_Rating(
        user_id = 3,
        card_id = 2180,
        stars = 3
    )
    db.session.add(rating3)

    rating4 = Star_Rating(
        user_id = 4,
        card_id = 2180,
        stars = 5
    )
    db.session.add(rating4)

    rating5 = Star_Rating(
        user_id = 5,
        card_id = 2180,
        stars = 4
    )
    db.session.add(rating5)

    rating6 = Star_Rating(
        user_id = 8,
        card_id = 2180,
        stars = 5
    )
    db.session.add(rating6)

    rating7 = Star_Rating(
        user_id = 9,
        card_id = 2180,
        stars = 3
    )
    db.session.add(rating7)

    rating8 = Star_Rating(
        user_id = 10,
        card_id = 2180,
        stars = 5
    )
    db.session.add(rating8)

    rating9 = Star_Rating(
        user_id = 11,
        card_id = 2180,
        stars = 4
    )
    db.session.add(rating9)

    rating10 = Star_Rating(
        user_id = 13,
        card_id = 2180,
        stars = 5
    )
    db.session.add(rating10)
    db.session.commit()


def undo_star_ratings():
    db.session.execute('TRUNCATE star_ratings;')
    db.session.commit()
    print('unseed star_ratings complete')
