import json
import os
import smtplib
import time

import requests
from flask import Flask, render_template, request, flash, make_response
from flask.json import jsonify
import hashlib

app = Flask(__name__)

app.config['DEBUG'] = True
app.config['HOST'] = 'localhost'

changes = []
moves = {}
messages = {}


def Send(To, Content):
    print("Sending...")
    mail = smtplib.SMTP("smtp.gmail.com", 587)
    mail.ehlo()
    # mail.starttls()
    mail.login("smtptestspm@gmail.com", "Testone123")
    mail.sendmail("Mail", To, Content)
    mail.close()


@app.route("/")
def index():
    return render_template("newindex.html")


@app.route("/Agar/", methods=['GET', 'POST'])
def Agar():
    if request.method == 'POST':
        print(request.form)
        moves[request.form["name"]] = {"x": request.form["x"], "y": request.form["y"],
                                       "health": request.form["health"], "name": request.form["name"]}
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
            # print(changes)
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


@app.route("/PianoThing/")
def Piano():
    return(render_template("Piano.html"))


@app.route("/Donate/")
def donate():
    return(render_template("donate.html"))


@app.route("/Cap/")
def Cap():
    return(render_template("CAP.html"))


@app.route("/ChatRoom/", methods=['GET', 'POST'])
def CHRM():
    global messages
    if request.method == 'POST':
        # print(messages)
        if request.form["Send"] == "True":
            if request.form["Group"] in messages:
                messages[request.form["Group"]].append(request.form["Text"])  # Main Send
            else:  # Prevent empty chat bug
                messages[request.form["Group"]] = []
                messages[request.form["Group"]].append(request.form["Text"])

            return request.form["Text"]

        elif request.form["Send"] == "False":
            if request.form["JC"] == "J":  # Join Chat
                if request.form["Group"] in messages:
                    return request.form["Group"]
                else:
                    return jsonify("-1")
            elif request.form["JC"] == "C":  # Create Chat
                if request.form["Group"] in messages:
                    return jsonify("-1")
                else:
                    messages[request.form["Group"]] = []
                    return request.form["Group"]
            else:  # Update messages
                if request.form["Group"] in messages:
                    return jsonify(messages[request.form["Group"]])
                else:
                    return jsonify([""])
    else:
        return(render_template("ChatHTTP.html"))


@app.route("/WhiteNoise/")
def WN():
    return(render_template("WhiteNoise.html"))


@app.route("/GA/")
def GA():
    return(render_template("GoogleAds.html"))


@app.route("/Graph/")
def Graph():
    return(render_template("Graph.html"))


@app.route("/NPS/")
def Docs():
    return(render_template("NPS.html"))


@app.route("/Crypto/", methods=['GET', 'POST'])
def Crypto():
    if request.method == 'POST':
        print(request.form)

        r = requests.get(request.form["url"])
        data = json.loads(r.text)

        print(data)

        return jsonify(data)
    else:
        return(render_template("Crypto.html"))


@app.route("/PicTxt/")
def PicTxt():
    return(render_template("PictureText.html"))


@app.route("/CryptoCount/")
def CryptoC():
    return(render_template("CryptoCounter.html"))


@app.route("/TABS/")
def TABS():
    return(render_template("TabOpener.html"))


@app.route("/Mine/")
def Mine():
    return(render_template("MoneroMine.html"))


@app.route("/jsSandbox/")
def JsBox():
    return(render_template("jsSandBox.html"))


@app.route("/PaintX")
def PaintX():
    return(render_template("PaintX.html"))


@app.route("/Seek")
def Seek():
    return(render_template("Seek.html"))


@app.route("/Pend")
def Pend():
    return(render_template("pend.html"))


@app.route("/PartAtt")
def PartAtt():
    return(render_template("particals.html"))


@app.route("/DragNDrop")
def DragNDrop():
    return(render_template("DragNDrop.html"))


@app.route("/PIDRect")
def PIDRect():
    return(render_template("PIDmouseseek.html"))


@app.route("/Admin", methods=['GET', 'POST'])
def AdminPage():
    if request.method == 'POST':
        server_passhash = os.getenv(
            'PASS_HASH') 
        if server_passhash is None:
            server_passhash = ""
        if "pass" in request.form:
            time.sleep(0.25)
            passhash = hashlib.sha256(
                request.form["pass"].encode()).hexdigest()
            if server_passhash == passhash:
                resp = make_response(render_template("adminpage.html"))
                resp.set_cookie("secret", os.getenv(
                    "SPECIAL_KEY"))
                return resp
            else:
                return render_template("Login.html", badpass="Wrong Password!")
    else:
        return render_template("Login.html")

@app.route("/AdminActions/<CMD>", methods=['POST'])
def AdminCMD(CMD):
    global messages
    if "secret" not in request.cookies or request.cookies.get("secret") != os.getenv("SPECIAL_KEY"):
        return jsonify("BAD COOKIE!")
    if CMD == "RESET_MSGS":
        messages = {}
        return render_template("adminpage.html", msg="MSG RESET")


if __name__ == "__main__":
    port = os.environ.get('PORT') or 5000
    app.run(host='0.0.0.0', port=int(port))
