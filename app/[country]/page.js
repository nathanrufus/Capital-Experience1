// app/[country]/page.js
'use client'
import { useEffect } from 'react';

function CountryRedirectPage() {
  useEffect(() => {
    async function fetchDataAndRedirect() {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const countries = await res.json();

        // Extract country from the pathname
        const pathSegments = window.location.pathname.split('/');
        const country = pathSegments[1];

        if (country) {
          const matchingCountry = countries.find(
            (c) => c.name.common.toLowerCase() === country.toLowerCase()
          );
          if (matchingCountry) {
            const capital = matchingCountry.capital ? matchingCountry.capital[0] : null;
            if (capital) {
              window.location.replace(`/${encodeURIComponent(country)}/${encodeURIComponent(capital)}`);
            } else {
              window.location.replace('/');
            }
          } else {
            window.location.replace('/');
          }
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
        window.location.replace('/');
      }
    }

    // Fetch data and redirect
    fetchDataAndRedirect();
  }, []);

  return null;
}

export default CountryRedirectPage;
