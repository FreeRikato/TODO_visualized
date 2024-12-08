// src/components/Signup.tsx
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect or perform any post-signup actions
      navigate('/dashboard'); // Example route
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect or perform any post-signup actions
      navigate('/dashboard'); // Example route
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleEmailSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200"
        >
          {/* Google Icon */}
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.2H42V20H24v8h11.3C34.6 33.6 29.1 36 24 36c-7.8 0-14-6.2-14-14s6.2-14 14-14c3.1 0 5.9 1.1 8.1 3L34 12.6C31.5 10.4 28.4 9 24 9c-9.4 0-17 7.6-17 17s7.6 17 17 17c9.4 0 17-7.6 17-17 0-.9-.1-1.7-.2-2.6z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.9C14.3 15.5 18.3 12 24 12c3.1 0 5.9 1.1 8.1 3l5.8-5.8C34.6 5.4 29.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.2 0 18.7-7.3 20.4-17h-21v-7h35.9C43.6 28.4 43 26.1 42.6 24h-35.9v-7z"
            />
          </svg>
          Sign Up with Google
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
