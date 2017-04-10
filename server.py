import os
from flask import Flask, render_template
from flask import request
from flask.json import jsonify

app = Flask(__name__)

app.config['DEBUG'] = True
app.config['HOST'] = 'localhost'

changes = []

@app.route("/", methods=['GET', 'POST'])
def index():
    return "index.html"

@app.route("/Agar", methods=['GET', 'POST'])
def index():
    return "Agar.html"

if __name__ == "__main__":
    port=os.environ.get('PORT') or 5000
    app.run(host='0.0.0.0', port=int(port))
