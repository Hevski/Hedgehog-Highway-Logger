from app import db, ma
from flask_sqlalchemy import SQLAlchemy
from marshmallow import fields
from sqlalchemy.sql import func
from sqlalchemy import DateTime
import datetime as datetime

class Highway(db.Model):
    __tablename__ = 'highways'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    date = db.Column(DateTime, default=datetime.datetime.utcnow)

    def __init__(self, name, date):
        self.name = name
        self.date = date

    def __repr__(self):
        return '<id {}>'.format(self.id)

class HighwaySchema(ma.Schema):
    class Meta:
        fields = ("name", "date")

        # id = fields.Integer(dump_only=True)
        # name = fields.String(required=True)
        # date = fields.String(required=True)
