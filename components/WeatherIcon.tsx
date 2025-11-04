import React from 'react';

interface WeatherIconProps {
  condition: string;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = '' }) => {
  const getIcon = () => {
    const lowerCaseCondition = condition.toLowerCase();
    
    if (lowerCaseCondition.includes('storm')) {
      return ( // Thunderstorm
        <svg viewBox="0 0 64 64" className={className}><g><path d="M47.5 31.5h-11l5-7c.4-.5.3-1.2-.2-1.6-.5-.4-1.2-.3-1.6.2l-13 17c-.4.5-.3 1.2.2 1.6.2.1.4.2.6.2h11l-5 7c-.4.5-.3 1.2.2 1.6.5.4 1.2.3 1.6-.2l13-17c.4-.5.3-1.2-.2-1.6-.2-.2-.4-.2-.6-.2z" fill="#f59e0b"></path><path d="M30 14.5c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 1.9.7 3.7 1.9 5.1-1.3-.8-2.9-1.1-4.4-.8-4.6 1-8 5.2-8 10.2C1.5 35.3 5.9 40 11 40h9.5" fill="#e2e8f0"></path><path d="M49 20.5c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 .9.1 1.7.4 2.5-1.2-.4-2.5-.4-3.8 0-4.6 1.4-7.6 5.9-7.6 11 0 6.1 4.9 11 11 11h26c4.4 0 8-3.6 8-8s-3.6-8-8-8h-1" fill="#94a3b8"></path></g></svg>
      );
    }
    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle')) {
      return ( // Rain
        <svg viewBox="0 0 64 64" className={className}><g><path d="M49 20.5c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 .9.1 1.7.4 2.5-1.2-.4-2.5-.4-3.8 0-4.6 1.4-7.6 5.9-7.6 11 0 6.1 4.9 11 11 11h26c4.4 0 8-3.6 8-8s-3.6-8-8-8h-1" fill="#94a3b8"></path><path d="M30 14.5c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 1.9.7 3.7 1.9 5.1-1.3-.8-2.9-1.1-4.4-.8-4.6 1-8 5.2-8 10.2C1.5 35.3 5.9 40 11 40h9.5" fill="#e2e8f0"></path><path d="M24.4 43.1s-.6 2.3-1.9 3.2-2.8 1.4-3.2 0 .5-2.2 1.8-3.1 2.8-1.5 3.3 0zM32.4 43.1s-.6 2.3-1.9 3.2-2.8 1.4-3.2 0 .5-2.2 1.8-3.1 2.8-1.5 3.3 0zM40.4 43.1s-.6 2.3-1.9 3.2-2.8 1.4-3.2 0 .5-2.2 1.8-3.1 2.8-1.5 3.3 0z" fill="#0ea5e9"></path></g></svg>
      );
    }
    if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('sleet')) {
        return ( // Snow
            <svg viewBox="0 0 64 64" className={className}><g><path d="M49 20.5c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 .9.1 1.7.4 2.5-1.2-.4-2.5-.4-3.8 0-4.6 1.4-7.6 5.9-7.6 11 0 6.1 4.9 11 11 11h26c4.4 0 8-3.6 8-8s-3.6-8-8-8h-1" fill="#94a3b8"></path><path d="M30 14.5c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 1.9.7 3.7 1.9 5.1-1.3-.8-2.9-1.1-4.4-.8-4.6 1-8 5.2-8 10.2C1.5 35.3 5.9 40 11 40h9.5" fill="#e2e8f0"></path><path d="M29.5 44.5l-3 3-1-1 3-3 1 1zM31.5 42.5v4h-2v-4h2zM33.5 44.5l3 3 1-1-3-3-1 1zM27.5 46.5h4v-2h-4v2z" fill="#0ea5e9"></path><path d="M37.5 44.5l-3 3-1-1 3-3 1 1zM39.5 42.5v4h-2v-4h2zM41.5 44.5l3 3 1-1-3-3-1 1zM35.5 46.5h4v-2h-4v2z" fill="#0ea5e9"></path></g></svg>
        );
    }
    if (lowerCaseCondition.includes('cloud') || lowerCaseCondition.includes('overcast')) {
      return ( // Cloudy
        <svg viewBox="0 0 64 64" className={className}><g><path d="M49 20.5c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 .9.1 1.7.4 2.5-1.2-.4-2.5-.4-3.8 0-4.6 1.4-7.6 5.9-7.6 11 0 6.1 4.9 11 11 11h26c4.4 0 8-3.6 8-8s-3.6-8-8-8h-1" fill="#94a3b8"></path><path d="M30 14.5c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 1.9.7 3.7 1.9 5.1-1.3-.8-2.9-1.1-4.4-.8-4.6 1-8 5.2-8 10.2C1.5 35.3 5.9 40 11 40h9.5" fill="#e2e8f0"></path></g></svg>
      );
    }
    if (lowerCaseCondition.includes('fog') || lowerCaseCondition.includes('mist') || lowerCaseCondition.includes('haze')) {
        return ( // Fog
            <svg viewBox="0 0 64 64" className={className}><g><path d="M49 20.5c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 .9.1 1.7.4 2.5-1.2-.4-2.5-.4-3.8 0-4.6 1.4-7.6 5.9-7.6 11 0 6.1 4.9 11 11 11h26c4.4 0 8-3.6 8-8s-3.6-8-8-8h-1" fill="#e2e8f0"></path><path d="M8.5 45.5h47v4h-47zM8.5 51.5h47v4h-47z" fill="#94a3b8"></path></g></svg>
        );
    }
    if (lowerCaseCondition.includes('partly cloudy') || lowerCaseCondition.includes('partly sunny')) {
        return ( // Partly cloudy
            <svg viewBox="0 0 64 64" className={className}><g><circle cx="32" cy="32" r="9" fill="#f59e0b"></circle><path d="M32 15.5v-4M40.9 23.1l2.8-2.8M46.5 32h4M40.9 40.9l2.8 2.8M32 46.5v4M23.1 40.9l-2.8 2.8M15.5 32h-4M23.1 23.1l-2.8-2.8" fill="none" stroke="#f59e0b" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path><path d="M49 36.5c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 .9.1 1.7.4 2.5-1.2-.4-2.5-.4-3.8 0-4.6 1.4-7.6 5.9-7.6 11 0 6.1 4.9 11 11 11h26c4.4 0 8-3.6 8-8s-3.6-8-8-8h-1" fill="#e2e8f0"></path></g></svg>
        );
    }
    // Default to Sunny/Clear
    return (
      <svg viewBox="0 0 64 64" className={className}><g><circle cx="32" cy="32" r="11" fill="#f59e0b"></circle><path d="M32 15.5v-4M40.9 23.1l2.8-2.8M46.5 32h4M40.9 40.9l2.8 2.8M32 46.5v4M23.1 40.9l-2.8 2.8M15.5 32h-4M23.1 23.1l-2.8-2.8" fill="none" stroke="#f59e0b" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path></g></svg>
    );
  };

  return getIcon();
};

export default WeatherIcon;
