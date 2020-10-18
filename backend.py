from flask import Flask, render_template, jsonify, request
import json
from difflib import get_close_matches

data = json.load(open("data.json"))

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/v1/words", methods=['GET'])
def searchWord():
    if "word" in request.args:
        word = str(request.args["word"]).lower()
        if word in data:
            return jsonify({ "word": data[word] })
        elif len(get_close_matches(word, data.keys())) > 0:
            return jsonify({ "diff": get_close_matches(word, data.keys())[0] })
        else:
            return jsonify({ "error": "Sorry " + word + " doesn't exist :(" })
    else:
        return {"error": "No word field was provided"}

if __name__ == "__main__":
    app.run(debug=True)

