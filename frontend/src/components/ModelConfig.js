import React, { useState } from 'react';

function ModelConfig() {
    const [layers, setLayers] = useState(1);
    const [activationFunction, setActivationFunction] = useState('relu');

    const handleLayerChange = (e) => {
        setLayers(e.target.value);
    };

    const handleActivationChange = (e) => {
        setActivationFunction(e.target.value);
    };

    const handleSubmit = () => {
        const config = {
            layers: parseInt(layers),
            activation: activationFunction
        };
    
        fetch('http://127.0.0.1:5000/configure_model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(config),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    

    return (
        <div>
            <h2>Model Configuration</h2>
            <label>
                Number of Layers:
                <input type="number" value={layers} onChange={handleLayerChange} />
            </label>
            <label>
                Activation Function:
                <select value={activationFunction} onChange={handleActivationChange}>
                    <option value="relu">ReLU</option>
                    <option value="sigmoid">Sigmoid</option>
                    <option value="tanh">Tanh</option>
                </select>
            </label>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default ModelConfig;
