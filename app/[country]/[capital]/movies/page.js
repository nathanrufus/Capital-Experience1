'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MoviesPage = ({ params }) => {
  const { country, capital } = params;
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = 'f47509ea3205e216d523ac673aef5dea';

  useEffect(() => {
    if (capital) {
      const fetchMovies = async () => {
        const query = encodeURIComponent(capital);
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;

        try {
          const res = await fetch(url);
          const data = await res.json();
          console.log(data);
          if (res.ok) {
            setMovies(data.results || []);
          } else {
            setError(data.status_message || 'Failed to fetch movies');
          }
        } catch (err) {
          setError('Failed to fetch movies');
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }
  }, [capital]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Welcome to the Movie Page for {country}'s capital city of {capital}</h1>
      <Link href={`/${country}/${capital}`} className="text-blue-500 underline mb-4">Back to Previous Page</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map(movie => (
            <div key={movie.id} className="bg-white shadow-md rounded-lg p-2">
              <Image
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : '/placeholder.webp'}
                alt={movie.title}
                width={342}
                height={513}
                className="w-full h-56 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
              <p className="text-gray-600 text-sm">{movie.release_date}</p>
              <p className="text-gray-800 mt-2 text-sm">{movie.overview}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
