from .db import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Format_List(db.Model):
    __tablename__ = 'format_lists'

    id = db.Column(db.Integer, primary_key=True)
    # card_uuid = db.Column(UUID(as_uuid=True), db.ForeignKey('cards.uuid'), default=uuid.uuid4, nullable = False, unique = True)
    card_uuid = db.Column(db.String, db.ForeignKey('cards.uuid'), nullable = False, unique = True)
    standard = db.Column(db.String(10), nullable = True)
    future = db.Column(db.String(10), nullable = True)
    historic = db.Column(db.String(10), nullable = True)
    pioneer = db.Column(db.String(10), nullable = True)
    modern = db.Column(db.String(10), nullable = True)
    legacy = db.Column(db.String(10), nullable = True)
    pauper = db.Column(db.String(10), nullable = True)
    vintage = db.Column(db.String(10), nullable = True)
    penny = db.Column(db.String(10), nullable = True)
    commander = db.Column(db.String(10), nullable = True)
    brawl = db.Column(db.String(10), nullable = True)
    duel = db.Column(db.String(10), nullable = True)
    oldschool = db.Column(db.String(10), nullable = True)
    card = db.relationship('Card', back_populates='format_list')


    def __repr__(self):
        return f'Format Legality({self.id}, {self.card_uuid}, {self.standard}, {self.future}, {self.historic}, {self.pioneer}, {self.modern}, {self.legacy}, {self.pauper}, {self.vintage}, {self.penny}, {self.commander}, {self.brawl}, {self.duel}, {self.oldschool})'

    # def __str__(self):
    #     list = [self.standard, self.future, self.historic, self.pioneer, self.modern, self.legacy, self.pauper, self.vintage, self.penny, self.commander, self.brawl, self.duel, self.oldschool]
    #     legal = [ruling for ruling in list if ruling = 'legal']
    #     not_legal = [ruling for ruling in list if not ruling in legal]
    #     return f'The card with id {self.card_uuid} is legal in the following formats: '
    # still need to finish this __str__

    def to_dict(self):
        return {
            "id": self.id,
            "card_uuid": self.card_uuid,
            "standard": self.standard,
            "future": self.future,
            "historic": self.historic,
            "pioneer": self.pioneer,
            "modern": self.modern,
            "legacy": self.legacy,
            "pauper": self.pauper,
            "vintage": self.vintage,
            "penny": self.penny,
            "commander": self.commander,
            "brawl": self.brawl,
            "duel": self.duel,
            "oldschool": self.oldschool
        }
