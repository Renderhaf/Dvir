import os
from flask import Flask, render_template
from flask import request
from flask.json import jsonify
import json
from flask_socketio import SocketIO, send
import smtplib

app = Flask(__name__)

app.config['DEBUG'] = True
app.config['HOST'] = 'localhost'
# app.config['SECRET_KEY'] = 'akerman'
# socketio = SocketIO(app)

changes = []
moves = {}
messages = []

def Send(To,Content):
    print("Sending...")
    mail = smtplib.SMTP("smtp.gmail.com",587)
    mail.ehlo()
    # mail.starttls()
    mail.login("smtptestspm@gmail.com", "Testone123")
    mail.sendmail("Mail",To,Content)
    mail.close()

# @socketio.on("message")
# def HandleMesssage(msg):
#     print(msg)
#     messages.append(msg)
#     send(msg,broadcast=True)
#
# @socketio.on("connect")
# def connection():
#     print("Client Connected")
#     send(messages)

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

@app.route("/SMP/")
def SocketMessagePing():
    return(render_template("SMP.html"))

@app.route("/MailSender/", methods=['GET', 'POST'])
def MailSender():
    if request.method == 'POST':
        to = request.form["To"]
        title = request.form["Title"]
        print(to,title)
        if str(to)[0] == "*":
            to = to[1:]
            for i in range(10):
                Send(to,title)
            return "Got *"
        elif str(to)[0] == "#":
            to = to[1:]
            for i in range(50):
                Send(to,title)
            return "Got #"
        elif str(to)[0] == "^":
            to = to[1:]
            for i in range(100):
                Send(to,title)
            return "Got ^"
        else:
            Send(to,title)
        return "Got Message"
    else:
        return(render_template("MS.html"))


@app.route("/PianoThing/")
def Piano():
    return(render_template("Piano.html"))

@app.route("/Donate/")
def donate():
    return(render_template("donate.html"))

if __name__ == "__main__":
    port=os.environ.get('PORT') or 5000
    app.run(host='0.0.0.0', port=int(port))
    # socketio.run(app)
