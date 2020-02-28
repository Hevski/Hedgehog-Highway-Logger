from app import db, ma
from flask_sqlalchemy import SQLAlchemy
from marshmallow import fields
from sqlalchemy.sql import func
from sqlalchemy import DateTime
import datetime as datetime

class Highway(db.Model):
    __tablename__ = 'highways'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    lat = db.Column(db.Float(asdecimal=True))
    lng = db.Column(db.Float(asdecimal=True))
    date = db.Column(DateTime, default=datetime.datetime.utcnow)

    def __init__(self, name, lat, lng, date):
        self.name = name
        self.lat = lat
        self.lng = lng
        self.date = date

    def __repr__(self):
        return '<id {}>'.format(self.id)

class HighwaySchema(ma.Schema):
    class Meta:
        fields = ("name", "lat", "lng", "date")
