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

@app.route('/highways', methods=['GET'])
def index():
        highways = Highway.query.all()
        highway_schema = HighwaySchema(many=True)
        return jsonify({'highway': highway_schema.dump(highways)})

@app.route('/highway/<id>')
def get_highway(id):
    highway = Highway.query.get(id)
    return highway_schema.dump(highway)#jsonify({'highway': Highway.query.get(id)})

@app.route('/highway', methods=['POST'])
def create_highway():
    try:
        name = request.json['name']
        date = datetime.now()
        lat = request.json['lat']
        lng = request.json['lng']
        new_highway = Highway(name, lat, lng, date)
        db.session.add(new_highway)
        db.session.commit()
        return jsonify(highway_schema.dump(new_highway)), 201
    except:
        return jsonify('error saving highway'), 404

@app.route('/highway/<id>', methods=['DELETE'])
def delete_highway(id):
    try:
        Highway.query.filter_by(id).delete()
        db.session.commit()
    except:
        return jsonify('error deleting highway'), 404
