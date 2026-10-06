'use client';

import { useEffect } from 'react';

/**
 * Toast notification for menu saving actions and status messages.
 */
export function MenuToast(props: {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.onDismiss();
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [props]);

  const isSuccess = props.type === 'success';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-xl transition-all"
    >
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
          isSuccess ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
        }`}
      >
        {isSuccess ? (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        )}
      </div>

      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-gray-900">
          {isSuccess ? 'Success' : 'Notice'}
        </p>
        <p className="font-body text-xs text-gray-600">{props.message}</p>
      </div>

      <button
        type="button"
        onClick={() => {
          props.onDismiss();
        }}
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        aria-label="Close notification"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
