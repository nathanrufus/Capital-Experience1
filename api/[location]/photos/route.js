// /api/[location]/photos/route.js

import fetch from 'isomorphic-fetch';

export default async function handler(req, res) {
  const { location } = req.query;

  try {
    const apiKey = '40590852-8fd7cc81472d8a734c501cab5'; // Ensure this API key is correct
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(location)}&image_type=photo`);

    const text = await response.text();
    console.log('Raw response:', text); // Log the raw response

    if (!response.ok) {
      throw new Error('Failed to fetch photos from Pixabay');
    }

    const data = JSON.parse(text);

    if (data.total === 0) {
      throw new Error('No photos found for the specified location');
    }

    const photos = data.hits.map(hit => ({
      id: hit.id,
      imageUrl: hit.webformatURL,
      photographer: hit.user,
      pageUrl: hit.pageURL
    }));

    res.status(200).json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error.message);
    res.status(500).json({ message: error.message });
  }
}
