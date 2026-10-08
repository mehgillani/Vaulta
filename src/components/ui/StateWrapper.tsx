import React from 'react';
import { AlertCircle, CheckCircle2, Clock, RefreshCw, Inbox, ShieldAlert, XCircle } from 'lucide-react';
import { DataViewState } from '../../types';

interface StateWrapperProps {
  state: DataViewState;
  emptyTitle: string;
  emptyDescription: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  errorTitle?: string;
  errorDescription?: string;
  onRetry?: () => void;
  skeletonRows?: number;
  children: React.ReactNode;
}

export const StateWrapper: React.FC<StateWrapperProps> = ({
  state,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  onEmptyAction,
  errorTitle = 'Unable to synchronize demo data feed',
  errorDescription = 'The simulated backend endpoint did not respond in time. Please retry or switch back to Populated mode.',
  onRetry,
  skeletonRows = 4,
  children,
}) => {
  if (state === 'loading') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4" aria-busy="true" aria-label="Loading content">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="h-5 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-28 bg-slate-100 rounded animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: skeletonRows }).map((_, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 gap-4 items-center py-3 border-b border-slate-100 last:border-0"
            >
              <div className="h-4 bg-slate-200 rounded animate-pulse col-span-1" />
              <div className="h-4 bg-slate-100 rounded animate-pulse col-span-1" />
              <div className="h-4 bg-slate-100 rounded animate-pulse col-span-1" />
              <div className="h-4 bg-slate-200 rounded animate-pulse col-span-1 justify-self-end w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="bg-white border border-red-200 rounded-xl p-8 text-center max-w-xl mx-auto my-4">
        <div className="w-11 h-11 rounded-lg bg-red-50 text-red-700 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-1">{errorTitle}</h3>
        <p className="text-sm text-slate-600 mb-5">{errorDescription}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Connection
          </button>
        )}
      </div>
    );
  }

  if (state === 'empty') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 text-center max-w-xl mx-auto my-4">
        <div className="w-11 h-11 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-4">
          <Inbox className="w-5 h-5" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-1">{emptyTitle}</h3>
        <p className="text-sm text-slate-600 mb-5">{emptyDescription}</p>
        {emptyActionLabel && onEmptyAction && (
          <button
            type="button"
            onClick={onEmptyAction}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
          >
            {emptyActionLabel}
          </button>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

interface DemoStateBarProps {
  currentState: DataViewState;
  onChangeState: (state: DataViewState) => void;
  label?: string;
}

export const DemoStateBar: React.FC<DemoStateBarProps> = ({
  currentState,
  onChangeState,
  label = 'UI State Preview',
}) => {
  const options: { id: DataViewState; name: string }[] = [
    { id: 'populated', name: 'Populated (Demo Data)' },
    { id: 'loading', name: 'Loading Skeleton' },
    { id: 'empty', name: 'Empty State' },
    { id: 'error', name: 'Error State' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100/80 border border-slate-200 rounded-lg px-3 py-2 text-xs">
      <div className="flex items-center gap-2 text-slate-600">
        <span className="font-semibold text-slate-800">{label}</span>
        <span aria-hidden="true">·</span>
        <span>Inspect loading, empty, and error states before backend integration</span>
      </div>
      <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-md">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChangeState(opt.id)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
              currentState === opt.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * Clean unboxed semantic status text with icon for color-blind accessibility
 * Adheres strictly to zero-pill metadata rules.
 */
export const StatusText: React.FC<{ status: string }> = ({ status }) => {
  const normalized = status.toLowerCase();

  if (
    normalized.includes('active') ||
    normalized.includes('completed') ||
    normalized.includes('verified') ||
    normalized.includes('rewarded') ||
    normalized.includes('eligible') ||
    normalized.includes('resolved')
  ) {
    if (normalized === 'ineligible') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-700 whitespace-nowrap">
          <XCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{status}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 whitespace-nowrap">
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
        <span>{status}</span>
      </span>
    );
  }

  if (
    normalized.includes('pending') ||
    normalized.includes('review') ||
    normalized.includes('processing') ||
    normalized.includes('confirming') ||
    normalized.includes('awaiting') ||
    normalized.includes('progress') ||
    normalized.includes('open') ||
    normalized.includes('requested')
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 whitespace-nowrap">
        <Clock className="w-3.5 h-3.5 shrink-0" />
        <span>{status}</span>
      </span>
    );
  }

  if (
    normalized.includes('rejected') ||
    normalized.includes('suspended') ||
    normalized.includes('flagged') ||
    normalized.includes('ineligible')
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-700 whitespace-nowrap">
        <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
        <span>{status}</span>
      </span>
    );
  }

  return <span className="text-xs font-medium text-slate-600 whitespace-nowrap">{status}</span>;
};
