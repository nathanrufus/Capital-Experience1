// /api/[location]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { location } = params;
  const url = 'https://restcountries.com/v3.1/all';

  try {
    const res = await fetch(url);
    const countries = await res.json();

    const country = countries.find(
      (country) => 
        country.name.common.toLowerCase() === location.toLowerCase()
    );

    if (!country) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }

    return NextResponse.json(country);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch country data' }, { status: 500 });
  }
}
