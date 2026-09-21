import type * as React from 'react';
import { AdminBackButton } from '@/components/admin/AdminBackButton';

/**
 * Consistent header for an admin section page: title, back navigation, description, and action slot.
 */
export const AdminPageHeader = (props: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  showBackButton?: boolean;
  backHref?: string;
  backLabel?: string;
}) => {
  const showBack = props.showBackButton ?? true;

  return (
    <div className="sticky top-[53px] z-[999] flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 bg-white p-6 font-display pb-5">
      <div className="flex items-start gap-3">
        {showBack ? (
          <div className="mt-1 shrink-0">
            <AdminBackButton href={props.backHref} label={props.backLabel} />
          </div>
        ) : null}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{props.title}</h1>
          {props.description ? (
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{props.description}</p>
          ) : null}
        </div>
      </div>
      {props.action ? <div className="shrink-0">{props.action}</div> : null}
    </div>
  );
};

