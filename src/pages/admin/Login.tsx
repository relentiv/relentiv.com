import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { verifyFrontendPassword } from '../../lib/firebase/config-gate';
import { signInWithGoogle, onAuthStateChanged } from '../../lib/firebase/auth';

export default function Login() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setLocation('/internal/portal/leads');
      }
    });
    return () => unsubscribe();
  }, [setLocation]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const isVerified = await verifyFrontendPassword(password);
      if (isVerified) {
        setIsPasswordVerified(true);
      } else {
        setError("Incorrect access code");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signInWithGoogle();
      setLocation('/internal/portal/leads');
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-[#050505] to-[#050505] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 relative z-10 backdrop-blur-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Relentiv Portal</h1>
          <p className="text-gray-400 text-sm mt-2">Authorized personnel only</p>
        </div>

        {!isPasswordVerified ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Access Code</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                placeholder="Enter access code"
                required
              />
            </div>
            
            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            
            <button 
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all"
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm text-center">
              Access code verified. Please sign in with your authorized Google account.
            </div>
            
            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
