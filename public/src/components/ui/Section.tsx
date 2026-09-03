export function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex min-w-0 flex-col px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20 xl:px-8">
      {children}
    </div>
  );
}
