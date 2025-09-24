'use client';

import { useSearchParams } from 'next/navigation';

export default function SignInContent() {
  const params = useSearchParams();
  const next = params.get('next') ?? '/';

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="mt-2 text-sm opacity-70">
        After login you’ll be redirected to: {next}
      </p>
      {/* TODO: your actual sign-in form/component */}
    </main>
  );
}
