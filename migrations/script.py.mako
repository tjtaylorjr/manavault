"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
import os
from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils
from sqlalchemy_searchable import sync_trigger
from sqlalchemy.orm import sessionmaker

Session = sessionmaker()
${imports if imports else ""}

# revision identifiers, used by Alembic.

revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}

def run_sqlalchemy_searchable_sql():
    migrations_folder = os.path.dirname(os.path.abspath(__file__))
    raw_sql = os.path.join(migrations_folder, 'expressions_script/expressions.sql')
    file = open(raw_sql)
    sql_expressions = sa.text(file.read())
    bind = op.get_bind()
    session = Session(bind=bind)
    session.execute(sql_expressions)

def upgrade():
    run_sqlalchemy_searchable_sql()
    ${upgrades if upgrades else "pass"}


def downgrade():

    ${downgrades if downgrades else "pass"}
