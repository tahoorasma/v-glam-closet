from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Virtual Beauty Studio"})

@app.route('/api/run-script', methods=['POST'])
def run_script():
    return jsonify({"message": "Python script executed successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
