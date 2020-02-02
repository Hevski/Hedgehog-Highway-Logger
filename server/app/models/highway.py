from app import db 
from flask_sqlalchemy import SQLAlchemy

class Highway(db.Model):
    __tablename__ = 'highways'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    date = db.Column(db.Date)

    def __init__(self, name, date):
        self.name = name
        self.date = date

    def __repr__(self):
        return '<id {}>'.format(self.id)
        
