# Weather Report & Prediction Analysis 🌦️

A weather-report web application with a Python machine-learning pipeline for historical weather analysis and next-day temperature prediction.

## Project components
- Web dashboard built with React + TypeScript + Vite
- Python weather-data analysis and ML prediction pipeline
- Random Forest Regression for next-day temperature
- Time-series chronological train/test evaluation
- MAE, RMSE and R² metrics
- Actual-vs-predicted chart and feature-importance output

## Python ML pipeline
Install dependencies:

    pip install -r python/requirements.txt

Create demonstration data:

    python python/create_sample_data.py

Run prediction analysis:

    python python/weather_prediction.py --data data/weather.csv

The CSV format is: date, temp, humidity, pressure, wind_speed, precipitation.

Outputs are written to the outputs/ directory:
- actual_vs_predicted.csv
- actual_vs_predicted.png
- feature_importance.csv

## Machine-learning methodology
The target is the next day's temperature. Features include current weather variables plus 3-day and 7-day rolling statistics. Data is split chronologically rather than randomly to respect the time-series nature of weather observations.

## Portfolio value
This project demonstrates Python, pandas, data preprocessing, feature engineering, exploratory analysis, machine learning, model evaluation and visualization, alongside a working web interface.

## Important note
The ML module is an educational forecasting demonstration, not an operational weather-forecasting service. Replace the generated sample data with real historical observations for meaningful analysis.

## Author
Ganapathi Rao Mamidi