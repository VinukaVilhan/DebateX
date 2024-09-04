// src/pages/page.tsx
import { useAuth } from '@clerk/nextjs';
import { signInWithCustomToken } from 'firebase/auth';
import { auth, db } from '@/lib/firebaseConfig'; // Adjust path as necessary

export default function FirebaseUI() {
  const { getToken, userId } = useAuth();

  if (!userId) {
    return <p>You need to sign in with Clerk to access this page.</p>;
  }

  const signIntoFirebaseWithClerk = async () => {
    try {
      const token = await getToken({ template: 'integration_firebase' });
      if (!token) {
        throw new Error('Failed to get token from Clerk.');
      }
      const userCredentials = await signInWithCustomToken(auth, token);
      console.log('User:', userCredentials.user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <button onClick={signIntoFirebaseWithClerk}>Sign in</button>
    </main>
  );
}
