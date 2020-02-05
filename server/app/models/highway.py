from app import db, ma
from flask_sqlalchemy import SQLAlchemy

class Highway(db.Model):
    __tablename__ = 'highways'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __init__(self, name):
        self.name = name
        # self.date = date

    def __repr__(self):
        return '<id {}>'.format(self.id)
    # date = db.Column(db.Date)

    def insertHighway(self):
        """ Adds a new highway to db """
        db.session.add(self)

class HighwaySchema(ma.ModelSchema):
    class Meta:
        model = Highway
        sqla_session = db.session
