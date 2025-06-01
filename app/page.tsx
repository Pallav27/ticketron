'use client';

import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ArrowRight, Component, LayoutGrid } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-[#0F1923] text-gray-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-700 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            TICKE<span className="text-[#E0E722]">TRON</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-white flex items-center">
            </a>
          </nav>
          
          <div>
            <SignedOut>
              <SignInButton>
                <Button variant="secondary" className='bg-[#0CAC64] hover:bg-blue-600 transition-transform hover:-translate-y-0.5'>Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-4">
                <UserButton afterSignOutUrl="/"/>
              </div>
            </SignedIn>
          </div>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        
        <h1 className="text-4xl md:text-5xl font-bold text-center max-w-3xl bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
          Effortless Query Management with TickeTron
        </h1>
        
        <p className="text-gray-300 text-center max-w-2xl mt-6 mb-10">
          Experience the future of support with AI-powered ticket sorting.
          TickeTron intelligently categorizes, assigns, and summarizes user queries, streamlining your support process like never before.
          Say goodbye to manual sorting and hello to efficient, automated support management.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
            <SignInButton>
              <Button className="bg-[#0CAC64] hover:bg-blue-600 transition-transform hover:-translate-y-0.5">Sign In</Button>
            </SignInButton>
          <Button 
            variant="secondary" 
            className="bg-[#0CAC64] hover:bg-blue-600 transition-transform hover:-translate-y-0.5"
            onClick={() => router.push('/dashboard')}
          >
            Dashboard
          </Button>
        </div>
      </section>

      <section className="bg-[#1A2C38] border-t border-b border-gray-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose TickeTron</h2>
            <p className="text-gray-400">
              AI Powered Ticket Sorting for Efficient Support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Component className="h-6 w-6 text-blue-400" />,
                title: "Query Categorization",
                description: "Automatically classify support requests into predefined categories for faster resolution."
              },
              {
                icon: <LayoutGrid className="h-6 w-6 text-blue-400" />,
                title: "Auto Assignment",
                description: "Assign tickets to the right team members based on category and workload, ensuring no request is overlooked."
              },
              {
                icon: <ArrowRight className="h-6 w-6 text-blue-400" />,
                title: "Request Summarisation",
                description: "Generate concise summaries of user queries to help support agents quickly understand the issue at hand."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all"
              >
                <div className="bg-blue-900/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4">
          © 2025 TickeTron. All rights reserved
        </div>
      </footer>
    </div>
  );
}