// Consistent header for an admin section page: title, optional blurb and action slot.
export const AdminPageHeader = (props: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex font-display p-6 flex-wrap items-start sticky top-[53px] bg-white justify-between gap-4 border-b border-gray-200 pb-5">
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">{props.title}</h1>
      {props.description ? (
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{props.description}</p>
      ) : null}
    </div>
    {props.action ? <div className="shrink-0">{props.action}</div> : null}
  </div>
);
