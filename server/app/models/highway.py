from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    highway_id = db.Column(db.Integer, db.ForeignKey('highway.id'))
    highway = db.Relationship('Highway')

class Highway(db.Model):
    __tablename__ = 'highways'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    date = db.Column(db.Date)


