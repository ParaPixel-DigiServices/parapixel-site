'use client'; // <--- This marks it as a Client Component
import dynamic from 'next/dynamic';

// Now we can safely disable SSR here because we are in "Client Land"
const Scene = dynamic(() => import('./Scene'), { 
  ssr: false,
});

export default function SceneContainer() {
  return <Scene />;
}