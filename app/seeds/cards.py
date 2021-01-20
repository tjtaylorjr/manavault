from app.models import db
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
