import os
from flask import Flask, render_template
from flask import request
from flask.json import jsonify
import json

app = Flask(__name__)

app.config['DEBUG'] = True
app.config['HOST'] = 'localhost'

changes = []
moves = {}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/Agar/", methods=['GET', 'POST'])
def Agar():
    if request.method == 'POST':
            print(request.form)
            moves[request.form["name"]] = {"x":request.form["x"],"y":request.form["y"],"health":request.form["health"],"name":request.form["name"]}
            return jsonify(moves)
    else:
        return render_template("Agar.html")

@app.route("/Spot/", methods=['GET', 'POST'])
def Spot():
    if request.method == 'POST':
        print("post received")
        if request.form["v"] == "one":
            print("one received")
            return jsonify(changes)
        else:
            print(request.form)
            changes.append(request.form)
            print(changes)
            return ""
    else:
        print("Returning render canavs")
        return render_template('Spot.html')

@app.route("/GOL/")
def GOL():
    return render_template("GOL.html")

@app.route("/Cam/")
def Cam():
    return(render_template("Cam.html"))
    
if __name__ == "__main__":
    port=os.environ.get('PORT') or 5000
    app.run(host='0.0.0.0', port=int(port))
