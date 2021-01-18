from app.models import db
from sqlalchemy import create_engine
from sqlalchemy.types import String, Date
import os
import pandas as pd


def seed_sets():

    seed_folder = os.path.dirname(os.path.abspath(__file__))
    set_csv = os.path.join(seed_folder, 'csv_files/sets.csv')

    db_url = os.environ.get('DATABASE_URL')
    engine = create_engine(db_url, echo=True)
    sets_df = pd.read_csv(set_csv)

    table_name = 'sets'

    sets_df.to_sql (
        table_name,
        engine,
        if_exists='append',
        index=False,
        # index_label='id',
        chunksize=10000,
        dtype = {
          "set_code": String(10),
          "set_name": String,
          "release_date": Date
        }
    )


def undo_sets():
    db.session.execute('TRUNCATE sets CASCADE;')
    db.session.commit()
    print('unseed sets complete')
