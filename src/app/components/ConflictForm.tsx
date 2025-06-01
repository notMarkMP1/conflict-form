'use client';

import { useState } from 'react';
import supabase from '@/app/lib/supabaseClient';

interface ConflictFormProps {
  onLogout: () => void;
}

export default function ConflictForm({ onLogout }: ConflictFormProps) {
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [helpDescription, setHelpDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);

    // supabase post
    const { data, error} = await supabase.from('conflicts').insert({
      "issue": description,
      "severity": severity,
      "help": helpDescription
    })
    
    if (error) {
      console.error('Error submitting conflict:', error);
      setIsSubmitting(false);
      return;
    }
    
    console.log('Conflict submitted successfully:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setDescription('');
    setSeverity('');
    setHelpDescription('');

    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };return (
    <div className="min-h-screen p-4" style={{backgroundColor: '#1a1f3a'}}>
      <div className="max-w-lg mx-auto pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl" style={{color: '#9bb5ff'}}>conflict form</h1>
          <button
            onClick={onLogout}
            className="text-sm transition-colors hover:opacity-80 cursor-pointer"
            style={{color: '#6b7db8'}}
          >
            logout
          </button>
        </div>

        {/* Form */}
        <div className="rounded-lg p-6 border" style={{backgroundColor: '#2d3561', borderColor: '#6b7db8'}}>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block mb-2" style={{color: '#9bb5ff'}}>what happened?</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                maxLength={1000}
                className="w-full p-3 rounded resize-none focus:outline-none transition-colors"
                style={{
                  backgroundColor: '#4a5a8a',
                  border: '1px solid #6b7db8',
                  color: '#ffffff'
                }}
                placeholder="describe it here"
                required
              />
            </div>

            <div>
              <label className="block mb-2" style={{color: '#9bb5ff'}}>how bad is it?</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full p-3 rounded focus:outline-none transition-colors"
                style={{
                  backgroundColor: '#4a5a8a',
                  border: '1px solid #6b7db8',
                  color: '#ffffff'
                }}
                required
              >
                <option value="">choose severity</option>
                <option value="none">its nothing</option>
                <option value="low">minor annoyance</option>
                <option value="medium">pretty frustrating</option>
                <option value="high">really upset</option>
                <option value="critical">this is the biggest deal ever</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2" style={{color: '#9bb5ff'}}>how can i help (optional)</label>              
              <textarea
                value={helpDescription}
                onChange={(e) => setHelpDescription(e.target.value)}
                rows={4}
                maxLength={1000}
                className="w-full p-3 rounded resize-none focus:outline-none transition-colors"
                style={{
                  backgroundColor: '#4a5a8a',
                  border: '1px solid #6b7db8',
                  color: '#ffffff'
                }}
                placeholder="describe it here"
              />
            </div>            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full p-3 rounded border transition-colors hover:opacity-80 disabled:opacity-60 ${isSubmitting || isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              style={{
                backgroundColor: isSubmitted ? '#4ade80' : '#9bb5ff',
                color: '#1a1f3a',
                borderColor: isSubmitted ? '#4ade80' : '#9bb5ff'
              }}
            >
              {isSubmitting ? 'submitting...' : isSubmitted ? 'submitted successfully!' : 'submit conflict'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
