type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
type SpinnerTone = 'brand' | 'dark' | 'muted' | 'white';

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-10',
  xl: 'size-14',
};

const TONE_CLASSES: Record<SpinnerTone, { stroke: string; track: string }> = {
  brand: {
    stroke: 'text-ps-red-500',
    track: 'text-ps-red-100',
  },
  dark: {
    stroke: 'text-gray-900',
    track: 'text-gray-200',
  },
  muted: {
    stroke: 'text-gray-500',
    track: 'text-gray-200',
  },
  white: {
    stroke: 'text-white',
    track: 'text-white/20',
  },
};

/**
 * Polished loading spinner for admin panels, route transitions, and async actions.
 */
export const AdminSpinner = (props: {
  size?: SpinnerSize;
  tone?: SpinnerTone;
  label?: string;
  fullHeight?: boolean;
  className?: string;
}) => {
  const size = props.size ?? 'md';
  const tone = props.tone ?? 'brand';
  const sizeClass = SIZE_CLASSES[size];
  const toneConfig = TONE_CLASSES[tone];

  const spinner = (
    <svg
      className={`animate-spin ${sizeClass} ${toneConfig.stroke} ${props.className ?? ''}`}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={props.label || 'Loading'}
    >
      <circle
        className={toneConfig.track}
        cx="12"
        cy="12"
        r="9.5"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="36 60"
        d="M12 2.5a9.5 9.5 0 1 1-9.5 9.5"
      />
      <span className="sr-only">{props.label || 'Loading…'}</span>
    </svg>
  );

  if (props.fullHeight || props.label) {
    return (
      <div
        className={`flex w-full flex-col items-center justify-center gap-3 p-8 ${
          props.fullHeight ? 'min-h-[320px]' : ''
        }`}
      >
        {spinner}
        {props.label ? (
          <p className="animate-pulse text-sm font-medium text-gray-500">{props.label}</p>
        ) : null}
      </div>
    );
  }

  return spinner;
};
