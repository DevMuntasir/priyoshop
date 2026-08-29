export function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex flex-col px-4 py-10 sm:px-6 sm:py-14 xl:px-0 xl:py-20">
      {children}
    </div>
  );
}
