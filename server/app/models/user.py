# class User(db.Model):
#     __tablename__ = 'users'
#     id = db.Column(db.Integer, primary_key=True)
#     highway_id = db.Column(db.Integer, db.ForeignKey('highway.id'))
#     highway = db.Relationship('Highway')
