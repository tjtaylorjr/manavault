from app.models import db
from sqlalchemy import create_engine
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.types import Integer, String
import uuid
import os
import pandas as pd


def seed_formats():

    seed_folder = os.path.dirname(os.path.abspath(__file__))
    format_csv = os.path.join(seed_folder, 'csv_files/format_legalities.csv')

    db_url = os.environ.get('DATABASE_URL')
    engine = create_engine(db_url, echo=True)
    formats_df = pd.read_csv(format_csv)

    table_name = 'format_legalities'

    formats_df.to_sql (
        table_name,
        engine,
        if_exists='append',
        index=False,
        # index_label='id',
        chunksize=10000,
        dtype = {
          "card_uuid": UUID,
          "standard": String(10),
          "future": String(10),
          "historic": String(10),
          "pioneer": String(10),
          "modern": String(10),
          "legacy": String(10),
          "pauper": String(10),
          "vintage": String(10),
          "penny": String(10),
          "commander": String(10),
          "brawl": String(10),
          "duel": String(10),
          "oldschool": String(10)
        }
    )


def undo_formats():
    db.session.execute('TRUNCATE format_legalities;')
    db.session.commit()
