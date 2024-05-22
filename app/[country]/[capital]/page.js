'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import WeatherCard from '@/components/Weathercard';

const CapitalWeather = () => {
  const params = useParams();
  const { country, capital } = params;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (country && capital) {
      const fetchWeather = async () => {
        try {
          // const apiKey = process.env.WEATHER_KEY;
          const apiKey = '8JCD3BEXPXXSN9AYRB6JDS3KG';
          const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${capital},${country}?unitGroup=metric&key=${apiKey}`);
          const data = await res.json();

          if (res.status !== 200 || !data.days) {
            setError(`No match found for ${capital}, ${country}.`);
            return;
          }

          const currentWeather = data.days[0].hours[0];
          setWeather({
            temp: currentWeather.temp,
            main: currentWeather.conditions,
            description: currentWeather.description,
            icon: currentWeather.icon,
          });
        } catch (err) {
          setError('Failed to fetch weather data.');
        }
      };

      fetchWeather();
    }
  }, [country, capital]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-xl mb-8">{error}</p>
        <Link href="/" className="text-blue-500 underline">Go back to Home</Link>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-blue-50">
        <h1 className="text-3xl font-bold mb-8">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-blue-50">
      <h1 className="text-3xl font-bold mb-8">{`Weather in ${capital}, ${country}`}</h1>
      <WeatherCard
        temp={weather.temp}
        main={weather.main}
        description={weather.description}
        icon={weather.icon}
      />
      <div className="mt-8 space-x-4">
        <Link href={`/${country}/${capital}/movies`} className="text-blue-500 underline hover:text-blue-950">Movies</Link>
        <Link href={`/${country}/${capital}/photos`} className="text-blue-500 underline hover:text-blue-950">Photos</Link>
      </div>
    </div>
  );
};

export default CapitalWeather;
