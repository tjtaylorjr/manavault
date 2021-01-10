from .db import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Format_Legality(db.Model):
    __tablename__ = 'format_legalities'

    id = db.Column(db.Integer, primary_key=True)
    card_uuid = db.Column(UUID(as_uuid=True), default=uuid.uuid4, nullable = False, unique = True)
