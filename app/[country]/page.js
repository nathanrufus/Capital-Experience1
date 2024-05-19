// pages/[country].js
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function CountryPage() {
  const router = useRouter();
  const { country } = router.query;

  useEffect(() => {
    async function redirect() {
      if (country) {
        try {
          const res = await fetch('https://restcountries.com/v3.1/all');
          const countries = await res.json();

          // Find the matching country in the list
          const matchingCountry = countries.find(c => c.name.common.toLowerCase() === country.toLowerCase());
          if (matchingCountry) {
            // Redirect to /[country]/[capital] if match found
            const capital = matchingCountry.capital ? matchingCountry.capital[0] : null;
            router.replace(`/${encodeURIComponent(country)}/${encodeURIComponent(capital)}`);
          } else {
            // Redirect to home page if no match found
            router.replace('/');
          }
        } catch (error) {
          console.error('Error fetching countries:', error);
          // Redirect to home page in case of error
          router.replace('/');
        }
      }
    }
    
    redirect();
  }, [country, router]);

  return null;
}

export default CountryPage;
