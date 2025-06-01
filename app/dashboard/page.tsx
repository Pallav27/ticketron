'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';
import { Textarea } from '@/components/ui/textarea';

interface Ticket {
  _id: string;
  heading: string;
  description: string;
  category: string;
  createdAt: string;
}

const categoryColorMap: Record<string, string> = {
  Technical: 'bg-red-100 text-red-800',
  Billing: 'bg-yellow-100 text-yellow-800',
  General: 'bg-blue-100 text-blue-800',
  Other: 'bg-gray-100 text-gray-800',
  'Account Access': 'bg-emerald-100 text-emerald-800',
  'Login Issues': 'bg-orange-100 text-orange-800',
  'Password Reset': 'bg-indigo-100 text-indigo-800',
  'Payment Failure': 'bg-pink-100 text-pink-800',
  'Refund Request': 'bg-lime-100 text-lime-800',
  'Subscription Changes': 'bg-teal-100 text-teal-800',
  'Feature Request': 'bg-cyan-100 text-cyan-800',
  'Bug Report': 'bg-rose-100 text-rose-800',
  Feedback: 'bg-purple-100 text-purple-800',
  'Cancellation Request': 'bg-fuchsia-100 text-fuchsia-800',
  'Service Downtime': 'bg-sky-100 text-sky-800',
  'API Support': 'bg-green-100 text-green-800',
  'Data Privacy': 'bg-slate-100 text-slate-800',
  'Integration Help': 'bg-yellow-200 text-yellow-900',
  'Upgrade Plan': 'bg-blue-200 text-blue-900',
  'Mobile App Issue': 'bg-red-200 text-red-900',
};

export default function DashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newQuery, setNewQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/request');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Expected an array of tickets');
        }
        
        setTickets(data);
        setFetchError(null);
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
        setFetchError(err instanceof Error ? err.message : 'Failed to load tickets');
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/request/${id}`, { 
        method: 'DELETE' 
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete ticket');
      }
      
      setTickets(tickets.filter(t => t._id !== id));
    } catch (err) {
      console.error('Failed to delete ticket:', err);
      alert('Failed to delete ticket. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!newQuery.trim()) {
      setSubmitError('Please describe your issue');
      return;
    }

    try {
      setLoading(true);
      setSubmitError(null);
      
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: newQuery })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const ticket = await res.json();
      setTickets([ticket, ...tickets]);
      setNewQuery('');
    } catch (err) {
      console.error('Failed to submit ticket:', err);
      setSubmitError('Failed to submit ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1923] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-5xl font-bold text-white">TICKE<span className="text-[#E0E722]">TRON</span></h2>
          <SignOutButton>
            <Button variant="destructive">Logout</Button>
          </SignOutButton>
        </div>

        <div className="space-y-4 mb-8">
          <Textarea
            value={newQuery}
            onChange={e => {
              setNewQuery(e.target.value);
              setSubmitError(null);
            }}
            placeholder="Describe your issue or query..."
            className="bg-[#1A2C38] border-[#1A2C38] text-white placeholder-gray-400"
          />
          
          {submitError && (
            <p className="text-red-400 text-sm">{submitError}</p>
          )}
          
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="w-full md:w-auto bg-[#00FF66] hover:bg-[#00E55C] text-black"
          >
            {loading ? 'Submitting...' : 'Submit Ticket'}
          </Button>
        </div>

        {fetchError && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-200">
            Error loading tickets: {fetchError}
          </div>
        )}

        {loading && tickets.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-400">Loading tickets...</div>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No tickets found. Create your first ticket above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map(ticket => (
              <Card key={ticket._id} className="bg-[#1A2C38] border-[#1A2C38] hover:border-[#00FF66]/30 transition-colors">
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{ticket.heading}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${categoryColorMap[ticket.category] || 'bg-gray-100 text-gray-800'}`}>
                      {ticket.category}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(ticket._id)}
                    className="text-gray-400 hover:text-white hover:bg-[#0F1923]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-gray-300">
                    {ticket.description
                      .split(/\n?[-\u2022\*] /)
                      .filter(point => point.trim())
                      .slice(0, 2)
                      .map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    Created: {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}