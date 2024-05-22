// /api/[location]/movies/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { location } = params;
  const apiKey = 'Yf47509ea3205e216d523ac673aef5dea';
  const baseUrl = 'https://api.themoviedb.org/3/search/movie';
  const query = encodeURIComponent(location);
  const url = `${baseUrl}?query=${query}&api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok && data.results && data.results.length > 0) {
      return NextResponse.json(data.results);
    } else if (data.results && data.results.length === 0) {
      return NextResponse.json({ message: 'No results found' }, { status: 404 });
    } else {
      return NextResponse.json({ message: data.status_message || 'Failed to fetch movies' }, { status: res.status });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch movies' }, { status: 500 });
  }
}
