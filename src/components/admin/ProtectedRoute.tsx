import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { onAuthStateChanged, signOut } from '../../lib/firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase/config';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user) => {
      if (!user) {
        setIsLoading(false);
        setIsAuthorized(false);
        setLocation('/internal/portal/login');
        return;
      }

      if (user.email) {
        try {
          const allowedAdminsRef = doc(db, "config", "allowedAdmins");
          const allowedAdminsSnap = await getDoc(allowedAdminsRef);
          
          if (allowedAdminsSnap.exists()) {
            const emails = allowedAdminsSnap.data().emails || [];
            if (emails.includes(user.email)) {
              setIsAuthorized(true);
            } else {
              await signOut();
              setIsAuthorized(false);
              setLocation('/internal/portal/login');
            }
          } else {
            await signOut();
            setIsAuthorized(false);
            setLocation('/internal/portal/login');
          }
        } catch (error) {
          console.error("Error checking authorization:", error);
          await signOut();
          setIsAuthorized(false);
          setLocation('/internal/portal/login');
        }
      } else {
        await signOut();
        setIsAuthorized(false);
        setLocation('/internal/portal/login');
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
