'use client'
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const PhotosPage = () => {
  const params = useParams();
  const { country, capital } = params;
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = '40590852-8fd7cc81472d8a734c501cab5'; // Your Pixabay API key

  useEffect(() => {
    const fetchPhotos = async () => {
      const query = encodeURIComponent(capital);
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch photos');
        }

        if (data.total === 0) {
          setError('No photos found for the specified location');
        } else {
          setPhotos(data.hits);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch photo data');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [capital]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-xl mb-8">{error}</p>
        <Link href={`/app/${country}/${capital}`} className="text-blue-500 underline">Go back</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">{`Photos related to ${capital}`}</h1>
      <Link href={`/${country}/${capital}`} className="text-blue-500 underline mb-4">Back to Previous Page</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={photo.webformatURL}
              alt={photo.tags}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="mt-4">
              <p className="text-xl font-bold">{photo.user}</p>
              <p className="text-gray-600">Photographer</p>
            </div>
            <div className="mt-4">
              <a
                href={photo.pageURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View on Pixabay
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 space-x-4">
        <Link href={`/app/${country}/${capital}`} className="text-blue-500 underline">Back to Weather</Link>
        <Link href={`/app/${country}/${capital}/movies`} className="text-blue-500 underline">Movies</Link>
      </div>
    </div>
  );
};

export default PhotosPage;
