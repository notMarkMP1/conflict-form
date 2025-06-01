'use client';

import { useState } from 'react';
import LoginForm from '@/app/components/LoginForm'
import ConflictForm from '@/app/components/ConflictForm';
import TwoStepVerification from '@/app/components/TwoStepVerification';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTwoStepVerified, setIsTwoStepVerified] = useState(false);
  return (
    <div className="min-h-screen">
      {!isLoggedIn ? (
      <LoginForm onLogin={() => setIsLoggedIn(true)} />
      ) : (
        !isTwoStepVerified ? (
          <TwoStepVerification onVerify={() => setIsTwoStepVerified(true)} />
        ) : (
          <ConflictForm onLogout={() => {setIsLoggedIn(false); setIsTwoStepVerified(false);}} />
        )
      )}
    </div>
  );
}
