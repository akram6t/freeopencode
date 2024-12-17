import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">QuickSync</h1>
          <img 
            src="/api/placeholder/80/80" 
            alt="QuickSync Logo" 
            className="mx-auto mb-4 rounded-full"
          />
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;