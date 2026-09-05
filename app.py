from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def home(): return render_template('index.html')

@app.route('/api/getRoute', methods=['POST'])
def get_route():
    data = request.json
    # Yaha par TomTom / Google Directions API with traffic=true lagana hai
    # AI logic se clear rasta nikalega
    return jsonify({"fastest_eta": "18 min", "traffic": "Light", "saved_time": "10 min"})

if __name__ == '__main__': app.run(debug=True)