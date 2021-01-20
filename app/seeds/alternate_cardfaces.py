from app.models import db
from sqlalchemy import create_engine
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.types import Integer, String, Text
import uuid
import os
import pandas as pd


def seed_alt_cardfaces():

    seed_folder = os.path.dirname(os.path.abspath(__file__))
    alt_cardfaces_csv = os.path.join(seed_folder, 'csv_files/alternate_cardfaces.csv')

    db_url = os.environ.get('DATABASE_URL')
    engine = create_engine(db_url, echo=True)
    alt_cardfaces_df = pd.read_csv(alt_cardfaces_csv)

    table_name = 'alternate_cardfaces'

    alt_cardfaces_df.to_sql (
        table_name,
        engine,
        if_exists='append',
        index=False,
        # index_label='id',
        chunksize=10000,
        dtype = {
          "base_card_uuid": String,
          "face_change": String(50),
          "name": String(200),
          "type": String(100),
          "power": String(10),
          "toughness": String(10),
          "loyalty": String(10),
          "keywords": String(150),
          "rules_text": Text,
          "flavor_text": Text,
        }
    )


def undo_alt_cardfaces():
    db.session.execute('TRUNCATE alternate_cardfaces RESTART IDENTITY CASCADE;')
    db.session.commit()
    print('unseed alternate cardfaces complete')
