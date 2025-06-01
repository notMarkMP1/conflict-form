'use client';

import { useState } from 'react';
import supabase from '@/app/lib/supabaseClient';

interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [password, setPassword] = useState('');  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.functions.invoke('check-password', {
        body: { password: password }
      });
      
      if (error) {
        console.error('Error checking password:', error);
        alert(`Database error: ${error.message}`);
        return;
      }
      const passed = data?.passed;
      if (passed) {
        console.log('Password is valid, logging in...');
        onLogin();
      } else {
        // Flash the button red
        const button = document.querySelector('button[type="submit"]') as HTMLElement;
        if (button) {
          const originalStyle = button.style.backgroundColor;
          button.style.backgroundColor = '#ff0000';
          button.style.color = '#ffffff';
          setTimeout(() => {
            button.style.backgroundColor = originalStyle;
          }, 500);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(`Login error: ${error}`);
    }
  };  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundColor: '#1a1f3a'}}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl mb-2" style={{color: '#9bb5ff'}}>conflict tracker</h1>
          <p className="text-sm" style={{color: '#6b7db8'}}>login to continue</p>
        </div>

        <div className="rounded-lg p-6 border" style={{backgroundColor: '#2d3561', borderColor: '#6b7db8'}}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded focus:outline-none"
                style={{
                  backgroundColor: '#4a5a8a', 
                  borderColor: '#6b7db8', 
                  color: '#ffffff',
                  border: '1px solid #6b7db8'
                }}
                placeholder="password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 rounded border transition-colors hover:opacity-80 cursor-pointer"
              style={{
                backgroundColor: '#9bb5ff', 
                color: '#1a1f3a', 
                borderColor: '#9bb5ff'
              }}
            >
              enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
