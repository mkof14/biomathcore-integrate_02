import { Suspense } from 'react';
import SignInContent from './SignInContent';

export const dynamic = 'force-dynamic';

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInContent />
    </Suspense>
  );
}
