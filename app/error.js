'use client'
import Header from '@/components/Header';
import Link from 'next/link';

const ErrorPage = () => {
  return (
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-semibold text-center mt-16">Oops! An Error Occurred</h1>
        <p className="text-lg text-center mt-4">We're sorry, but an unexpected error occurred while processing your request.</p>
        <div className="flex justify-center mt-8">
          <Link href="/" className="text-blue-500 underline">
            Go to Home Page
          </Link>
        </div>
      </div>
  );
};

export default ErrorPage;
