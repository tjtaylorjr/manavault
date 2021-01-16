from app.models import db
from sqlalchemy import create_engine
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.types import Integer, String
import uuid
import os
import pandas as pd


def seed_illustrations():

    seed_folder = os.path.dirname(os.path.abspath(__file__))
    illustration_csv = os.path.join(seed_folder, 'csv_files/illustrations.csv')

    db_url = os.environ.get('DATABASE_URL')
    engine = create_engine(db_url, echo=True)
    illustrations_df = pd.read_csv(illustration_csv)

    table_name = 'illustrations'

    illustrations_df.to_sql (
        table_name,
        engine,
        if_exists='append',
        index=False,
        # index_label='id',
        chunksize=10000,
        dtype = {
          "card_uuid": UUID,
          "alternate_cardface_uuid": UUID,
          "artist": String,
          "small_image": String,
          "normal_image": String,
          "large_image": String,
          "highres_png": String,
          "art_crop": String,
        }
    )


def undo_illustrations():
    db.session.execute('TRUNCATE illustrations;')
    db.session.commit()
