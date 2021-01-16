from .db import db


class Set(db.Model):
    __tablename__ = 'sets'

    set_code = db.Column(db.String(10), primary_key=True, autoincrement=False)
    set_name = db.Column(db.String, nullable = False)
    release_date = db.Column(db.Date, nullable = True)
    cards = db.relationship('Card', back_populates='set')

    def __repr__(self):
        return f'Set({self.set_code}, {self.set_name}, {self.release_date})'

    @property
    def to_dict(self):
        return {
            "set_code": self.set_code,
            "set_name": self.set_name,
            "release_date": self.release_date,
            "cards": self.cards.to_dict()
        }
