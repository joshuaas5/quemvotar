'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

function ToastIcon({ type }: { type: ToastType }) {
  switch (type) {
    case 'success':
      return <span className="material-symbols-outlined">check_circle</span>;
    case 'error':
      return <span className="material-symbols-outlined">error</span>;
    case 'info':
      return <span className="material-symbols-outlined">info</span>;
  }
}

function ToastBg({ type }: { type: ToastType }) {
  switch (type) {
    case 'success': return 'bg-[#06d6a0]';
    case 'error': return 'bg-[#ff6b6b]';
    case 'info': return 'bg-[#a2d2ff]';
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto border-4 border-black px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 min-w-[280px] max-w-[400px] animate-fade-in-up ${ToastBg({ type: toast.type })}`}
          >
            <span className="text-black font-bold">{ToastIcon({ type: toast.type })}</span>
            <span className="font-headline font-bold text-sm uppercase text-black">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
