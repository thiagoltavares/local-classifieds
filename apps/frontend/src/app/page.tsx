// apps/frontend/src/app/page.tsx
'use client';

import Link from 'next/link';
import { Button } from '../components/ui';

export default function Home() {
  return (
    <div className='min-h-screen bg-neutral-bg-light flex flex-col items-center justify-center gap-8'>
      <h1 className='text-4xl font-bold text-neutral-text-primary'>Home</h1>
      <Link href='/admin'>
        <Button variant='primary'>Acessar Admin</Button>
      </Link>
    </div>
  );
}
