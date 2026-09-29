import { AdminSpinner } from '@/components/admin/AdminSpinner';

/**
 * Route-level loading state for the admin console.
 */
export default function AdminLoadingPage() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center p-8">
      <AdminSpinner size="xl" tone="brand" label="Loading admin console…" />
    </div>
  );
}
