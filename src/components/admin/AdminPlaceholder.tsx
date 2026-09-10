// Empty-state panel shown by admin sections whose editing UI is not built yet.
export const AdminPlaceholder = (props: { message: string }) => (
  <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
    <p className="mx-auto max-w-md text-sm text-gray-500">{props.message}</p>
  </div>
);
