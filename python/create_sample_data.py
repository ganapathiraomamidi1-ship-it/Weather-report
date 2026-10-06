from pathlib import Path
import numpy as np
import pandas as pd
rng=np.random.default_rng(42)
dates=pd.date_range('2019-01-01',periods=1200,freq='D')
season=8*np.sin(2*np.pi*dates.dayofyear/365.25)
temp=27+season+np.linspace(0,0.8,len(dates))+rng.normal(0,2,len(dates))
humidity=np.clip(72-0.45*season+rng.normal(0,6,len(dates)),25,98)
pressure=1013+rng.normal(0,7,len(dates))
wind=np.clip(3+rng.normal(0,1.2,len(dates)),0,None)
rain=np.clip(rng.gamma(1.2,2,len(dates))-1.5,0,None)
df=pd.DataFrame({'date':dates,'temp':temp,'humidity':humidity,'pressure':pressure,'wind_speed':wind,'precipitation':rain})
Path('data').mkdir(exist_ok=True); df.to_csv('data/weather.csv',index=False); print('Created data/weather.csv')