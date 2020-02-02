from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models.highway import Highway

@app.route('/highway/', methods=['GET'])
def index():
    return jsonify({'highways': Highway.query.all()})

if __name__ == "__main__":
    app.run(debug=True)

# @app.route('/highway/add', methods=["POST"])
# def add_highway():
#     try:
#         Highway().addHighway()
#     except:
#         return "cannot add highway"
