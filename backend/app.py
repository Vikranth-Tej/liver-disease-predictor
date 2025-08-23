from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Load the model and scaler
model = tf.keras.models.load_model("liver_model.keras")
with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        features = np.array([
            data["Age"],
            1 if data["Gender"] == "Male" else 0,
            data["Total_Bilirubin"],
            data["Direct_Bilirubin"],
            data["Alkphos"],
            data["Sgpt"],
            data["Sgot"],
            data["Total_Proteins"],
            data["Albumin"],
            data["AG_Ratio"]
        ]).reshape(1, -1)

        features_scaled = scaler.transform(features)
        probability = model.predict(features_scaled)[0][0]
        prediction = "Liver Disease Detected" if probability > 0.5 else "No Liver Disease"

        return jsonify({
            "result": prediction,
            "probability": round(float(probability) * 100, 2)  # percent format
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)  # or just port=5000 if not using a custom port

