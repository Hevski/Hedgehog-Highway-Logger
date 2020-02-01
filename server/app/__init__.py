from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import Flask

app = Flask(__name__)
db = SQLAlchemy(app)

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

if __name__ == "__main__":
    app.run(debug=True)
