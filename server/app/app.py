from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)

from models.highway import Highway, HighwaySchema

highway_schema = HighwaySchema()
highways_schema = HighwaySchema(many=True)

if __name__ == "__main__":
    app.run(debug=True)

@app.route('/highways/', methods=['GET'])
def index():
        highways = Highway.query.all()
        highway_schema = HighwaySchema(many=True)
        return jsonify({'highway': highway_schema.dump(highways)})

# @app.route('/highway/<int:id>/')
# def get_highway(id):
#     return jsonify({'highway': Highway.query.get(id)})

@app.route('/highway/', methods=['POST'])
def create_highway():
    name = request.json['name']
    date = datetime.now()
    new_highway = Highway(name, date)
    db.session.add(new_highway)
    db.session.commit()
    return jsonify(new_highway), 201

# @app.route('/highway/add', methods=["POST"])
# def add_highway():
#     try:
#         Highway().addHighway()
#     except:
#         return "cannot add highway"
