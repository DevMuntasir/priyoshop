import Image from 'next/image';
import { cn } from '@/lib/utils';

export type HubModelCardProps = {
  icon: string;
  title: string;
  description: string;
  className?: string;
};

export function HubModelCard(props: HubModelCardProps) {
  return (
    <div
      className={cn(
        'flex h-full min-h-70 flex-col items-start rounded-ps-lg border border-ps-black/10 bg-white p-8 text-left sm:min-h-75 sm:p-10',
        props.className,
      )}
    >
      {props.icon && <Image src={props.icon} alt="" width={100} height={100} />}
      <h3 className="m-0 mt-6 font-display text-ps-h5 font-bold leading-tight text-ps-black">
        {props.title}
      </h3>
      <p className="m-0 mt-4 max-w-100 font-body text-ps-xs leading-relaxed font-semibold text-ps-black-200">
        {props.description}
      </p>
    </div>
  );
}
