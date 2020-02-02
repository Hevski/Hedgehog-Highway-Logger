from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models.highway import Highway

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

if __name__ == "__main__":
    app.run(debug=True)


# @app.route('/highway/add', methods=["POST"])
# def add_highway():
#     try:
#         Highway().addHighway()
#     except:
#         return "cannot add highway"
