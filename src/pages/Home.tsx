import React from 'react';
import { useLocation } from 'wouter';

export default function Home({ setIsBookingModalOpen }: { setIsBookingModalOpen: (v: boolean) => void }) {
  const [, setLocation] = useLocation();

  return (
    <>
      <main>
        {/* We will copy the main content here */}
      </main>
      <footer>
        {/* We will copy the footer content here */}
      </footer>
    </>
  );
}
