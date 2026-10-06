# Python Weather Prediction & Analysis

This module adds a reproducible Python machine-learning workflow to the existing weather-report application.

Workflow:
1. Load historical weather observations from CSV.
2. Clean and sort observations by date.
3. Create rolling temperature and humidity features.
4. Predict next-day temperature with Random Forest Regression.
5. Evaluate with MAE, RMSE and R2.
6. Save predictions, feature importance and a chart to outputs/.

Dataset columns: date, temp, humidity, pressure, wind_speed, precipitation.

Run:
    pip install -r python/requirements.txt
    python python/create_sample_data.py
    python python/weather_prediction.py --data data/weather.csv

The sample generator is for demonstrating the ML pipeline. Replace it with a real historical weather dataset for portfolio analysis.

Important: this demonstrates machine-learning methodology; it is not an operational weather forecasting system. Real forecasting benefits from numerical weather prediction models, satellite/radar observations, geographic context and much larger datasets.