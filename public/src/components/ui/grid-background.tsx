import { cn } from '@/lib/utils';

export default function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="-z-50 flex h-full w-full bg-hero-gradient">
      <div
        className={cn(
          'absolute inset-0 ',
          '[background-size:90px_90px]',
          ' opacity-30 [background-image:linear-gradient(to_right,#edcdca_1px,transparent_1px),linear-gradient(to_bottom,#edcdca_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div> */}
      <div className="z-50 container mx-auto flex flex-col justify-center px-4 sm:px-6 lg:px-0">
        <div>{children}</div>
      </div>
    </div>
  );
}
