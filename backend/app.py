from flask import Flask, request, jsonify
import tensorflow as tf

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the AI Model Training App"})

@app.route('/configure_model', methods=['POST'])
def configure_model():
    data = request.json
    layers = data['layers']
    activation = data['activation']

    # Create a sequential model based on user input
    model = tf.keras.Sequential()
    
    for i in range(layers):
        model.add(tf.keras.layers.Dense(units=64, activation=activation))
    
    model.add(tf.keras.layers.Dense(units=1, activation='linear'))

    # Here you would store the model, for now we'll just return a message
    return jsonify({"message": "Model configured successfully", "layers": layers, "activation": activation})

if __name__ == '__main__':
    app.run(debug=True)
