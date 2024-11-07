import React, { useState } from 'react';
import { Github, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {signIn} from "next-auth/react";

type AuthMode = 'login' | 'register';

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`${mode === 'login' ? 'Logged in' : 'Registered'} successfully!`);
    setLoading(false);
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    signIn("github", {
      callbackUrl: `${window.location.origin}`,
    });
    toast.success('GitHub login initiated!');
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <h2 className="relative mt-6 text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {mode === 'login' ? 'Welcome back' : 'Join us today'}
          </h2>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-all duration-200 hover:underline decoration-2 underline-offset-4"
          >
            {mode === 'login' ? 'Register now' : 'Sign in'}
          </button>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div className="group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-indigo-600 transition-colors">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full px-4 py-3 rounded-xl text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all duration-200 bg-white/50 hover:bg-white focus:bg-white"
              placeholder="name@example.com"
            />
          </div>

          <div className="group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-indigo-600 transition-colors">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full px-4 py-3 rounded-xl text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all duration-200 bg-white/50 hover:bg-white focus:bg-white"
              placeholder="••••••••"
            />
          </div>

          {mode === 'register' && (
            <div className="group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-indigo-600 transition-colors">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="block w-full px-4 py-3 rounded-xl text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all duration-200 bg-white/50 hover:bg-white focus:bg-white"
                placeholder="••••••••"
              />
            </div>
          )}
        </div>

        {mode === 'login' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 transition-colors"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors hover:underline decoration-2 underline-offset-4"
            >
              Forgot password?
            </button>
          </div>
        )}

        <div className="space-y-4">
          <button
            type="submit"
            disabled={loading}
            className="relative w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all duration-200 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl hover:from-indigo-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_4px_24px_rgba(79,70,229,0.5)]"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? 'Processing...' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/*github 登录*/}
          <button
            type="button"
            onClick={handleGithubLogin}
            disabled={loading}
            className="relative w-full inline-flex items-center justify-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200 bg-[#24292F] text-white rounded-xl hover:bg-[#24292F]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#24292F] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>
      </form>
    </div>
  );
}