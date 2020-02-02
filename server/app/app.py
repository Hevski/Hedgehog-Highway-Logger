
from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

from models.highway import Highway, HighwaySchema

@app.route('/highways/', methods=['GET'])
def index():
        highways = Highway.query.all()
        highway_schema = HighwaySchema(many=True)
        return jsonify({'highway': highway_schema.dump(highways)})


# @app.route('/highway/<int:id>/')
# def get_highway(id):
#     return jsonify({'highway': Highway.query.get(id)})


# @app.route('/highway/', methods=['POST'])
# def create_highway():
#     if not request.json or not 'name' in request.json:
#         abort(400)
#     highway = Highway(request.json.name)
#     db.session.add(highway)
#     db.session.commit()
#     return jsonify({'highway': highway}), 201

if __name__ == "__main__":
    app.run(debug=True)

# @app.route('/highway/add', methods=["POST"])
# def add_highway():
#     try:
#         Highway().addHighway()
#     except:
#         return "cannot add highway"
