from __future__ import annotations
import argparse
from pathlib import Path
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

FEATURES = ['temp','humidity','pressure','wind_speed','precipitation','temp_rolling_3','temp_rolling_7','humidity_rolling_3']

def load_and_prepare(path):
    df = pd.read_csv(path)
    required = {'date','temp','humidity','pressure','wind_speed','precipitation'}
    missing = required - set(df.columns)
    if missing: raise ValueError(f'Missing columns: {sorted(missing)}')
    df['date'] = pd.to_datetime(df['date'], errors='coerce')
    df = df.sort_values('date').dropna(subset=['date']).copy()
    numeric = ['temp','humidity','pressure','wind_speed','precipitation']
    for col in numeric: df[col] = pd.to_numeric(df[col], errors='coerce')
    df = df.dropna(subset=numeric)
    df['temp_rolling_3'] = df['temp'].rolling(3).mean()
    df['temp_rolling_7'] = df['temp'].rolling(7).mean()
    df['humidity_rolling_3'] = df['humidity'].rolling(3).mean()
    df['target_next_temp'] = df['temp'].shift(-1)
    return df.dropna().reset_index(drop=True)

def main():
    parser = argparse.ArgumentParser(description='Predict next-day temperature.')
    parser.add_argument('--data', required=True)
    parser.add_argument('--test-size', type=float, default=0.2)
    args = parser.parse_args()
    df = load_and_prepare(args.data)
    split = int(len(df) * (1 - args.test_size))
    if split < 10 or len(df)-split < 2: raise ValueError('Not enough observations.')
    train, test = df.iloc[:split], df.iloc[split:]
    model = RandomForestRegressor(n_estimators=300,max_depth=12,random_state=42,n_jobs=-1)
    model.fit(train[FEATURES], train['target_next_temp'])
    pred = model.predict(test[FEATURES])
    mae = mean_absolute_error(test['target_next_temp'], pred)
    rmse = mean_squared_error(test['target_next_temp'], pred) ** 0.5
    r2 = r2_score(test['target_next_temp'], pred)
    print('\nWeather Prediction Analysis')
    print(f'Rows: {len(df)} | Train: {len(train)} | Test: {len(test)}')
    print(f'MAE: {mae:.2f} °C | RMSE: {rmse:.2f} °C | R2: {r2:.3f}')
    latest = df.iloc[[-1]]
    next_temp = model.predict(latest[FEATURES])[0]
    print(f'Latest temperature: {latest.temp.iloc[0]:.2f} °C')
    print(f'Estimated next-day temperature: {next_temp:.2f} °C')
    out = Path('outputs'); out.mkdir(exist_ok=True)
    comparison = pd.DataFrame({'date':test.date.values,'actual_temp':test.target_next_temp.values,'predicted_temp':pred})
    comparison.to_csv(out/'actual_vs_predicted.csv', index=False)
    plt.figure(figsize=(12,6)); plt.plot(comparison.date,comparison.actual_temp,label='Actual'); plt.plot(comparison.date,comparison.predicted_temp,label='Predicted')
    plt.title('Actual vs Predicted Next-Day Temperature'); plt.xlabel('Date'); plt.ylabel('Temperature (°C)'); plt.legend(); plt.tight_layout(); plt.savefig(out/'actual_vs_predicted.png',dpi=150); plt.close()
    pd.Series(model.feature_importances_,index=FEATURES).sort_values(ascending=False).to_csv(out/'feature_importance.csv')

if __name__ == '__main__': main()