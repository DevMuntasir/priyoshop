import { clsx } from 'clsx';

export const ALIGN_OPTIONS = ['left', 'center'] as const;
export const BG_COLOR_OPTIONS = [
  'default',
  'white',
  'warm-white',
  'cream',
  'cream-yellow',
  'peach',
  'surface-deep',
  'surface-default',
  'surface-light',
  'grey-100',
  'grey-150',
  'grey-200',
  'grey-300',
  'grey-400',
  'mint',
  'purple',
  'lime',
  'periwinkle',
  'cyan',
  'green-tint',
  'gold-500',
  'gold-600',
  'red-50',
  'red-100',
  'red-500',
  'red-600',
  'red-bright',
  'ink-900',
  'ink-800',
  'ink-700',
  'ink-600',
  'black',
  'gradient',
  'hero-gradient',
  'green-gradient',
  'about-gradient',
] as const;
export const TEXT_COLOR_OPTIONS = [
  'default',
  'black',
  'ink-900',
  'ink-800',
  'ink-700',
  'ink-600',
  'ink-500',
  'ink-400',
  'ink-300',
  'white',
  'white-700',
  'white-800',
  'white-900',
  'red',
  'red-500',
  'red-700',
  'red-900',
  'red-bright',
  'gold-ink',
] as const;
export const PADDING_Y_OPTIONS = ['none', 'sm', 'md', 'lg', 'xl'] as const;
export const PADDING_X_OPTIONS = ['none', 'sm', 'md', 'lg', 'xl'] as const;
export const MARGIN_Y_OPTIONS = ['none', 'sm', 'md', 'lg', 'xl'] as const;
// `sm`–`xl` keep the legacy responsive ramp; the rest map 1:1 to the `--text-ps-*` scale.
export const TITLE_SIZE_OPTIONS = [
  'default',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'hero',
  'display',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'lead',
  'body',
] as const;
export const FONT_FAMILY_OPTIONS = ['default', 'display', 'body', 'accent'] as const;
export const FONT_WEIGHT_OPTIONS = ['default', 'normal', 'semibold', 'bold', 'extrabold'] as const;
export const RADIUS_OPTIONS = ['none', 'sm', 'md', 'lg', 'xl', 'hero', 'pill'] as const;
export const SHADOW_OPTIONS = ['none', 'card', 'soft', 'pop'] as const;
export const COLUMNS_OPTIONS = ['1', '2', '3', '4'] as const;
export const GAP_OPTIONS = ['none', 'sm', 'md', 'lg'] as const;
export const VISIBILITY_OPTIONS = ['show', 'hide'] as const;

export type Align = (typeof ALIGN_OPTIONS)[number];
export type BgColor = (typeof BG_COLOR_OPTIONS)[number];
export type TextColor = (typeof TEXT_COLOR_OPTIONS)[number];
export type PaddingY = (typeof PADDING_Y_OPTIONS)[number];
export type PaddingX = (typeof PADDING_X_OPTIONS)[number];
export type MarginY = (typeof MARGIN_Y_OPTIONS)[number];
export type TitleSize = (typeof TITLE_SIZE_OPTIONS)[number];
export type FontFamily = (typeof FONT_FAMILY_OPTIONS)[number];
export type FontWeight = (typeof FONT_WEIGHT_OPTIONS)[number];
export type Radius = (typeof RADIUS_OPTIONS)[number];
export type Shadow = (typeof SHADOW_OPTIONS)[number];
export type Columns = (typeof COLUMNS_OPTIONS)[number];
export type Gap = (typeof GAP_OPTIONS)[number];
export type Visibility = (typeof VISIBILITY_OPTIONS)[number];

export const DEVICES = ['mobile', 'tablet', 'laptop', 'desktop'] as const;
export type Device = (typeof DEVICES)[number];

export type SectionStyle = {
  align: Align;
  bgColor: BgColor;
  textColor: TextColor;
  paddingY: PaddingY;
};

export type SectionStyleTokens = SectionStyle & {
  paddingX: PaddingX;
  marginY: MarginY;
  titleSize: TitleSize;
  fontFamily: FontFamily;
  fontWeight: FontWeight;
  radius: Radius;
  shadow: Shadow;
  columns: Columns;
  gap: Gap;
  visibility: Visibility;
};

export type ResponsiveSectionStyle = {
  base: SectionStyleTokens;
  tablet?: Partial<SectionStyleTokens>;
  laptop?: Partial<SectionStyleTokens>;
  desktop?: Partial<SectionStyleTokens>;
};

export type CardStyleTokens = SectionStyleTokens & {
  bodySize: TitleSize;
  bodyWeight: FontWeight;
};

export type ResponsiveCardStyle = {
  base: CardStyleTokens;
  tablet?: Partial<CardStyleTokens>;
  laptop?: Partial<CardStyleTokens>;
  desktop?: Partial<CardStyleTokens>;
};

export const DEFAULT_SECTION_STYLE_TOKENS: SectionStyleTokens = {
  align: 'left',
  bgColor: 'default',
  textColor: 'default',
  paddingY: 'none',
  paddingX: 'none',
  marginY: 'none',
  titleSize: 'default',
  fontFamily: 'default',
  fontWeight: 'default',
  radius: 'none',
  shadow: 'none',
  columns: '1',
  gap: 'none',
  visibility: 'show',
};
export const DEFAULT_RESPONSIVE_SECTION_STYLE: ResponsiveSectionStyle = {
  base: DEFAULT_SECTION_STYLE_TOKENS,
};

export const DEFAULT_RESPONSIVE_CARD_STYLE: ResponsiveCardStyle = {
  base: {
    ...DEFAULT_SECTION_STYLE_TOKENS,
    bgColor: 'green-tint',
    textColor: 'ink-700',
    paddingY: 'sm',
    paddingX: 'sm',
    titleSize: 'h6',
    bodySize: 'xs',
    fontFamily: 'body',
    fontWeight: 'bold',
    bodyWeight: 'normal',
    radius: 'xl',
  },
  tablet: {
    paddingY: 'md',
    paddingX: 'md',
    titleSize: 'h4',
    bodySize: 'body',
  },
};

type CardStyleInput = {
  base: Partial<CardStyleTokens>;
  tablet?: Partial<CardStyleTokens>;
  laptop?: Partial<CardStyleTokens>;
  desktop?: Partial<CardStyleTokens>;
};

/**
 * Normalizes legacy card styles with the current responsive token defaults.
 * @param input Optional complete or legacy card style.
 * @returns Responsive card style with a complete base and default responsive typography.
 */
export const normalizeCardStyle = (input?: CardStyleInput): ResponsiveCardStyle => {
  if (!input) {
    return DEFAULT_RESPONSIVE_CARD_STYLE;
  }

  const usesLegacyTypography =
    input.base.bodySize === undefined || input.base.bodyWeight === undefined;
  const tablet = usesLegacyTypography
    ? { ...DEFAULT_RESPONSIVE_CARD_STYLE.tablet, ...input.tablet }
    : input.tablet;

  return {
    base: {
      ...DEFAULT_RESPONSIVE_CARD_STYLE.base,
      ...input.base,
      bodySize: input.base.bodySize ?? DEFAULT_RESPONSIVE_CARD_STYLE.base.bodySize,
      bodyWeight: input.base.bodyWeight ?? DEFAULT_RESPONSIVE_CARD_STYLE.base.bodyWeight,
    },
    ...(tablet ? { tablet } : {}),
    ...(input.laptop ? { laptop: input.laptop } : {}),
    ...(input.desktop ? { desktop: input.desktop } : {}),
  };
};

/**
 * Creates a responsive section style with default tokens merged with provided overrides.
 * @param base Optional style token overrides.
 * @returns Responsive section style with defaults applied.
 */
export const makeDefaultStyle = (
  base: Partial<SectionStyleTokens> = {},
): ResponsiveSectionStyle => ({
  base: { ...DEFAULT_SECTION_STYLE_TOKENS, ...base },
});

// One class per device, in DEVICES order (mobile, tablet, laptop, desktop).
// Every class is a full literal so Tailwind's source scan picks it up.
type DeviceClasses = readonly [string, string, string, string];

// Literal indexes keep tuple access `string` under noUncheckedIndexedAccess.
const DEVICE_INDEX = { mobile: 0, tablet: 1, laptop: 2, desktop: 3 } as const;

const BG_CLASS: Record<BgColor, DeviceClasses> = {
  default: ['', '', '', ''],
  white: ['bg-ps-white-600', 'md:bg-ps-white-600', 'lg:bg-ps-white-600', 'xl:bg-ps-white-600'],
  'warm-white': [
    'bg-ps-warm-white',
    'md:bg-ps-warm-white',
    'lg:bg-ps-warm-white',
    'xl:bg-ps-warm-white',
  ],
  cream: ['bg-ps-cream', 'md:bg-ps-cream', 'lg:bg-ps-cream', 'xl:bg-ps-cream'],
  'cream-yellow': [
    'bg-ps-cream-yellow',
    'md:bg-ps-cream-yellow',
    'lg:bg-ps-cream-yellow',
    'xl:bg-ps-cream-yellow',
  ],
  peach: ['bg-ps-peach', 'md:bg-ps-peach', 'lg:bg-ps-peach', 'xl:bg-ps-peach'],
  'surface-deep': [
    'bg-ps-surface-deep',
    'md:bg-ps-surface-deep',
    'lg:bg-ps-surface-deep',
    'xl:bg-ps-surface-deep',
  ],
  'surface-default': [
    'bg-ps-surface-default',
    'md:bg-ps-surface-default',
    'lg:bg-ps-surface-default',
    'xl:bg-ps-surface-default',
  ],
  'surface-light': [
    'bg-ps-surface-light',
    'md:bg-ps-surface-light',
    'lg:bg-ps-surface-light',
    'xl:bg-ps-surface-light',
  ],
  'grey-100': ['bg-ps-grey-100', 'md:bg-ps-grey-100', 'lg:bg-ps-grey-100', 'xl:bg-ps-grey-100'],
  'grey-150': ['bg-ps-grey-150', 'md:bg-ps-grey-150', 'lg:bg-ps-grey-150', 'xl:bg-ps-grey-150'],
  'grey-200': ['bg-ps-grey-200', 'md:bg-ps-grey-200', 'lg:bg-ps-grey-200', 'xl:bg-ps-grey-200'],
  'grey-300': ['bg-ps-grey-300', 'md:bg-ps-grey-300', 'lg:bg-ps-grey-300', 'xl:bg-ps-grey-300'],
  'grey-400': ['bg-ps-grey-400', 'md:bg-ps-grey-400', 'lg:bg-ps-grey-400', 'xl:bg-ps-grey-400'],
  mint: ['bg-ps-mint', 'md:bg-ps-mint', 'lg:bg-ps-mint', 'xl:bg-ps-mint'],
  purple: ['bg-ps-purple', 'md:bg-ps-purple', 'lg:bg-ps-purple', 'xl:bg-ps-purple'],
  lime: ['bg-ps-lime', 'md:bg-ps-lime', 'lg:bg-ps-lime', 'xl:bg-ps-lime'],
  periwinkle: [
    'bg-ps-periwinkle',
    'md:bg-ps-periwinkle',
    'lg:bg-ps-periwinkle',
    'xl:bg-ps-periwinkle',
  ],
  cyan: ['bg-ps-cyan', 'md:bg-ps-cyan', 'lg:bg-ps-cyan', 'xl:bg-ps-cyan'],
  'green-tint': [
    'bg-ps-green-tint',
    'md:bg-ps-green-tint',
    'lg:bg-ps-green-tint',
    'xl:bg-ps-green-tint',
  ],
  'gold-500': ['bg-ps-gold-500', 'md:bg-ps-gold-500', 'lg:bg-ps-gold-500', 'xl:bg-ps-gold-500'],
  'gold-600': ['bg-ps-gold-600', 'md:bg-ps-gold-600', 'lg:bg-ps-gold-600', 'xl:bg-ps-gold-600'],
  'red-50': ['bg-ps-red-50', 'md:bg-ps-red-50', 'lg:bg-ps-red-50', 'xl:bg-ps-red-50'],
  'red-100': ['bg-ps-red-100', 'md:bg-ps-red-100', 'lg:bg-ps-red-100', 'xl:bg-ps-red-100'],
  'red-500': ['bg-ps-red-500', 'md:bg-ps-red-500', 'lg:bg-ps-red-500', 'xl:bg-ps-red-500'],
  'red-600': ['bg-ps-red-600', 'md:bg-ps-red-600', 'lg:bg-ps-red-600', 'xl:bg-ps-red-600'],
  'red-bright': [
    'bg-ps-red-bright',
    'md:bg-ps-red-bright',
    'lg:bg-ps-red-bright',
    'xl:bg-ps-red-bright',
  ],
  'ink-900': ['bg-ps-ink-900', 'md:bg-ps-ink-900', 'lg:bg-ps-ink-900', 'xl:bg-ps-ink-900'],
  'ink-800': ['bg-ps-ink-800', 'md:bg-ps-ink-800', 'lg:bg-ps-ink-800', 'xl:bg-ps-ink-800'],
  'ink-700': ['bg-ps-ink-700', 'md:bg-ps-ink-700', 'lg:bg-ps-ink-700', 'xl:bg-ps-ink-700'],
  'ink-600': ['bg-ps-ink-600', 'md:bg-ps-ink-600', 'lg:bg-ps-ink-600', 'xl:bg-ps-ink-600'],
  black: ['bg-ps-black', 'md:bg-ps-black', 'lg:bg-ps-black', 'xl:bg-ps-black'],
  gradient: [
    'bg-section-gradient',
    'md:bg-section-gradient',
    'lg:bg-section-gradient',
    'xl:bg-section-gradient',
  ],
  'hero-gradient': [
    'bg-hero-gradient',
    'md:bg-hero-gradient',
    'lg:bg-hero-gradient',
    'xl:bg-hero-gradient',
  ],
  'green-gradient': ['bg-green', 'md:bg-green', 'lg:bg-green', 'xl:bg-green'],
  'about-gradient': [
    'bg-about-gradient',
    'md:bg-about-gradient',
    'lg:bg-about-gradient',
    'xl:bg-about-gradient',
  ],
};

const WRAPPER_TEXT_CLASS: Record<TextColor, DeviceClasses> = {
  default: ['', '', '', ''],
  black: ['text-ps-black', 'md:text-ps-black', 'lg:text-ps-black', 'xl:text-ps-black'],
  'ink-900': ['text-ps-ink-900', 'md:text-ps-ink-900', 'lg:text-ps-ink-900', 'xl:text-ps-ink-900'],
  'ink-800': ['text-ps-ink-800', 'md:text-ps-ink-800', 'lg:text-ps-ink-800', 'xl:text-ps-ink-800'],
  'ink-700': ['text-ps-ink-700', 'md:text-ps-ink-700', 'lg:text-ps-ink-700', 'xl:text-ps-ink-700'],
  'ink-600': ['text-ps-ink-600', 'md:text-ps-ink-600', 'lg:text-ps-ink-600', 'xl:text-ps-ink-600'],
  'ink-500': ['text-ps-ink-500', 'md:text-ps-ink-500', 'lg:text-ps-ink-500', 'xl:text-ps-ink-500'],
  'ink-400': ['text-ps-ink-400', 'md:text-ps-ink-400', 'lg:text-ps-ink-400', 'xl:text-ps-ink-400'],
  'ink-300': ['text-ps-ink-300', 'md:text-ps-ink-300', 'lg:text-ps-ink-300', 'xl:text-ps-ink-300'],
  white: ['text-ps-white', 'md:text-ps-white', 'lg:text-ps-white', 'xl:text-ps-white'],
  'white-700': [
    'text-ps-white-700',
    'md:text-ps-white-700',
    'lg:text-ps-white-700',
    'xl:text-ps-white-700',
  ],
  'white-800': [
    'text-ps-white-800',
    'md:text-ps-white-800',
    'lg:text-ps-white-800',
    'xl:text-ps-white-800',
  ],
  'white-900': [
    'text-ps-white-900',
    'md:text-ps-white-900',
    'lg:text-ps-white-900',
    'xl:text-ps-white-900',
  ],
  red: ['text-ps-red-600', 'md:text-ps-red-600', 'lg:text-ps-red-600', 'xl:text-ps-red-600'],
  'red-500': ['text-ps-red-500', 'md:text-ps-red-500', 'lg:text-ps-red-500', 'xl:text-ps-red-500'],
  'red-700': ['text-ps-red-700', 'md:text-ps-red-700', 'lg:text-ps-red-700', 'xl:text-ps-red-700'],
  'red-900': ['text-ps-red-900', 'md:text-ps-red-900', 'lg:text-ps-red-900', 'xl:text-ps-red-900'],
  'red-bright': [
    'text-ps-red-bright',
    'md:text-ps-red-bright',
    'lg:text-ps-red-bright',
    'xl:text-ps-red-bright',
  ],
  'gold-ink': [
    'text-ps-gold-ink',
    'md:text-ps-gold-ink',
    'lg:text-ps-gold-ink',
    'xl:text-ps-gold-ink',
  ],
};

const PADDING_Y_CLASS: Record<PaddingY, DeviceClasses> = {
  none: ['', 'md:py-0', 'lg:py-0', 'xl:py-0'],
  sm: ['py-6 sm:py-8', 'md:py-8', 'lg:py-8', 'xl:py-8'],
  md: ['py-10 sm:py-14', 'md:py-14', 'lg:py-14', 'xl:py-14'],
  lg: ['py-14 sm:py-20', 'md:py-20', 'lg:py-20', 'xl:py-20'],
  xl: ['py-20 sm:py-28', 'md:py-28', 'lg:py-28', 'xl:py-28'],
};

const PADDING_X_CLASS: Record<PaddingX, DeviceClasses> = {
  none: ['', 'md:px-0', 'lg:px-0', 'xl:px-0'],
  sm: ['px-4 sm:px-6', 'md:px-6', 'lg:px-6', 'xl:px-6'],
  md: ['px-6 sm:px-10', 'md:px-10', 'lg:px-10', 'xl:px-10'],
  lg: ['px-10 sm:px-14', 'md:px-14', 'lg:px-14', 'xl:px-14'],
  xl: ['px-14 sm:px-20', 'md:px-20', 'lg:px-20', 'xl:px-20'],
};

const MARGIN_Y_CLASS: Record<MarginY, DeviceClasses> = {
  none: ['', 'md:my-0', 'lg:my-0', 'xl:my-0'],
  sm: ['my-6 sm:my-8', 'md:my-8', 'lg:my-8', 'xl:my-8'],
  md: ['my-10 sm:my-14', 'md:my-14', 'lg:my-14', 'xl:my-14'],
  lg: ['my-14 sm:my-20', 'md:my-20', 'lg:my-20', 'xl:my-20'],
  xl: ['my-20 sm:my-28', 'md:my-28', 'lg:my-28', 'xl:my-28'],
};

// `default` emits nothing so the section keeps its own responsive type ramp.
// `sm`–`xl` step the ramp up per breakpoint; the token names map 1:1 to `--text-ps-*`.
const TITLE_SIZE_CLASS: Record<TitleSize, DeviceClasses> = {
  default: ['', '', '', ''],
  xs: ['text-ps-xs', 'md:text-ps-xs', 'lg:text-ps-xs', 'xl:text-ps-xs'],
  sm: ['text-ps-h5', 'md:text-ps-h4', 'lg:text-ps-h4', 'xl:text-ps-h4'],
  md: ['text-ps-h4', 'md:text-ps-h3', 'lg:text-ps-h3', 'xl:text-ps-h3'],
  lg: ['text-ps-h3', 'md:text-ps-h2', 'lg:text-ps-h2', 'xl:text-ps-h2'],
  xl: ['text-ps-h2', 'md:text-ps-h1', 'lg:text-ps-h1', 'xl:text-ps-h1'],
  hero: ['text-ps-hero', 'md:text-ps-hero', 'lg:text-ps-hero', 'xl:text-ps-hero'],
  display: ['text-ps-display', 'md:text-ps-display', 'lg:text-ps-display', 'xl:text-ps-display'],
  h1: ['text-ps-h1', 'md:text-ps-h1', 'lg:text-ps-h1', 'xl:text-ps-h1'],
  h2: ['text-ps-h2', 'md:text-ps-h2', 'lg:text-ps-h2', 'xl:text-ps-h2'],
  h3: ['text-ps-h3', 'md:text-ps-h3', 'lg:text-ps-h3', 'xl:text-ps-h3'],
  h4: ['text-ps-h4', 'md:text-ps-h4', 'lg:text-ps-h4', 'xl:text-ps-h4'],
  h5: ['text-ps-h5', 'md:text-ps-h5', 'lg:text-ps-h5', 'xl:text-ps-h5'],
  h6: ['text-ps-h6', 'md:text-ps-h6', 'lg:text-ps-h6', 'xl:text-ps-h6'],
  lead: ['text-ps-lead', 'md:text-ps-lead', 'lg:text-ps-lead', 'xl:text-ps-lead'],
  body: ['text-ps-body', 'md:text-ps-body', 'lg:text-ps-body', 'xl:text-ps-body'],
};

const FONT_FAMILY_CLASS: Record<FontFamily, DeviceClasses> = {
  default: ['', '', '', ''],
  display: ['font-display', 'md:font-display', 'lg:font-display', 'xl:font-display'],
  body: ['font-body', 'md:font-body', 'lg:font-body', 'xl:font-body'],
  accent: ['font-accent', 'md:font-accent', 'lg:font-accent', 'xl:font-accent'],
};

const FONT_WEIGHT_CLASS: Record<FontWeight, DeviceClasses> = {
  default: ['', '', '', ''],
  normal: ['font-normal', 'md:font-normal', 'lg:font-normal', 'xl:font-normal'],
  semibold: ['font-semibold', 'md:font-semibold', 'lg:font-semibold', 'xl:font-semibold'],
  bold: ['font-bold', 'md:font-bold', 'lg:font-bold', 'xl:font-bold'],
  extrabold: ['font-extrabold', 'md:font-extrabold', 'lg:font-extrabold', 'xl:font-extrabold'],
};

const RADIUS_CLASS: Record<Radius, DeviceClasses> = {
  none: ['', 'md:rounded-none', 'lg:rounded-none', 'xl:rounded-none'],
  sm: ['rounded-ps-sm', 'md:rounded-ps-sm', 'lg:rounded-ps-sm', 'xl:rounded-ps-sm'],
  md: ['rounded-ps-md', 'md:rounded-ps-md', 'lg:rounded-ps-md', 'xl:rounded-ps-md'],
  lg: ['rounded-ps-lg', 'md:rounded-ps-lg', 'lg:rounded-ps-lg', 'xl:rounded-ps-lg'],
  xl: ['rounded-ps-xl', 'md:rounded-ps-xl', 'lg:rounded-ps-xl', 'xl:rounded-ps-xl'],
  hero: ['rounded-ps-hero', 'md:rounded-ps-hero', 'lg:rounded-ps-hero', 'xl:rounded-ps-hero'],
  pill: ['rounded-ps-pill', 'md:rounded-ps-pill', 'lg:rounded-ps-pill', 'xl:rounded-ps-pill'],
};

const SHADOW_CLASS: Record<Shadow, DeviceClasses> = {
  none: ['', 'md:shadow-none', 'lg:shadow-none', 'xl:shadow-none'],
  card: ['shadow-ps-card', 'md:shadow-ps-card', 'lg:shadow-ps-card', 'xl:shadow-ps-card'],
  soft: ['shadow-ps-soft', 'md:shadow-ps-soft', 'lg:shadow-ps-soft', 'xl:shadow-ps-soft'],
  pop: ['shadow-ps-pop', 'md:shadow-ps-pop', 'lg:shadow-ps-pop', 'xl:shadow-ps-pop'],
};

const ALIGN_TEXT_CLASS: Record<Align, DeviceClasses> = {
  left: ['text-left', 'md:text-left', 'lg:text-left', 'xl:text-left'],
  center: ['text-center', 'md:text-center', 'lg:text-center', 'xl:text-center'],
};

const COLUMNS_CLASS: Record<Columns, DeviceClasses> = {
  '1': ['grid-cols-1', 'md:grid-cols-1', 'lg:grid-cols-1', 'xl:grid-cols-1'],
  '2': ['grid-cols-2', 'md:grid-cols-2', 'lg:grid-cols-2', 'xl:grid-cols-2'],
  '3': ['grid-cols-3', 'md:grid-cols-3', 'lg:grid-cols-3', 'xl:grid-cols-3'],
  '4': ['grid-cols-4', 'md:grid-cols-4', 'lg:grid-cols-4', 'xl:grid-cols-4'],
};

const GAP_CLASS: Record<Gap, DeviceClasses> = {
  none: ['gap-0', 'md:gap-0', 'lg:gap-0', 'xl:gap-0'],
  sm: ['gap-4', 'md:gap-4', 'lg:gap-4', 'xl:gap-4'],
  md: ['gap-6', 'md:gap-6', 'lg:gap-6', 'xl:gap-6'],
  lg: ['gap-8', 'md:gap-8', 'lg:gap-8', 'xl:gap-8'],
};

const VISIBILITY_CLASS: Record<Visibility, DeviceClasses> = {
  show: ['', 'md:block', 'lg:block', 'xl:block'],
  hide: ['hidden', 'md:hidden', 'lg:hidden', 'xl:hidden'],
};

const TITLE_COLOR_CLASS: Record<TextColor, string> = {
  default: 'text-ps-black',
  black: 'text-ps-black',
  'ink-900': 'text-ps-ink-900',
  'ink-800': 'text-ps-ink-800',
  'ink-700': 'text-ps-ink-700',
  'ink-600': 'text-ps-ink-600',
  'ink-500': 'text-ps-ink-500',
  'ink-400': 'text-ps-ink-400',
  'ink-300': 'text-ps-ink-300',
  white: 'text-ps-white',
  'white-700': 'text-ps-white-700',
  'white-800': 'text-ps-white-800',
  'white-900': 'text-ps-white-900',
  red: 'text-ps-red-600',
  'red-500': 'text-ps-red-500',
  'red-700': 'text-ps-red-700',
  'red-900': 'text-ps-red-900',
  'red-bright': 'text-ps-red-bright',
  'gold-ink': 'text-ps-gold-ink',
};

/**
 * Normalizes input styles to a responsive section style format.
 * @param input Optional style input (responsive or flat).
 * @returns Normalized responsive section style with defaults applied.
 */
export const normalizeStyle = (
  input: ResponsiveSectionStyle | SectionStyle | undefined,
): ResponsiveSectionStyle => {
  if (!input) {
    return DEFAULT_RESPONSIVE_SECTION_STYLE;
  }
  if ('base' in input) {
    return { ...input, base: { ...DEFAULT_SECTION_STYLE_TOKENS, ...input.base } };
  }
  return { base: { ...DEFAULT_SECTION_STYLE_TOKENS, ...input } };
};

const layerFor = (style: ResponsiveSectionStyle, device: Device): Partial<SectionStyleTokens> =>
  device === 'mobile' ? style.base : (style[device] ?? {});

const cardLayerFor = (style: ResponsiveCardStyle, device: Device): Partial<CardStyleTokens> =>
  device === 'mobile' ? style.base : (style[device] ?? {});

export type ResolvedSectionStyle = {
  wrapperClass: string;
  align: Align;
  alignClass: string;
  titleColorClass: string;
  /** Per-device title size classes; empty when every layer is `default`. */
  titleSizeClass: string;
  gridClass: string;
};

export type ResolvedCardStyle = {
  cardClass: string;
  panelClass: string;
  titleClass: string;
  bodyClass: string;
};

/**
 * Resolves responsive tokens into classes for a split content card.
 * @param style Responsive card style configuration.
 * @returns Classes separated by card, content panel, and title responsibilities.
 */
export const resolveCardStyle = (style: ResponsiveCardStyle): ResolvedCardStyle => {
  const card: string[] = [];
  const panel: string[] = [];
  const title: string[] = [];
  const body: string[] = [];

  for (const device of DEVICES) {
    const index = DEVICE_INDEX[device];
    const layer = cardLayerFor(style, device);

    if (layer.bgColor !== undefined) {
      panel.push(BG_CLASS[layer.bgColor][index]);
    }
    if (layer.textColor !== undefined) {
      panel.push(WRAPPER_TEXT_CLASS[layer.textColor][index]);
    }
    if (layer.fontFamily !== undefined) {
      panel.push(FONT_FAMILY_CLASS[layer.fontFamily][index]);
    }
    if (layer.paddingY !== undefined) {
      panel.push(PADDING_Y_CLASS[layer.paddingY][index]);
    }
    if (layer.paddingX !== undefined) {
      panel.push(PADDING_X_CLASS[layer.paddingX][index]);
    }
    if (layer.align !== undefined) {
      panel.push(ALIGN_TEXT_CLASS[layer.align][index]);
    }
    if (layer.marginY !== undefined) {
      card.push(MARGIN_Y_CLASS[layer.marginY][index]);
    }
    if (layer.radius !== undefined) {
      card.push(RADIUS_CLASS[layer.radius][index]);
    }
    if (layer.shadow !== undefined) {
      card.push(SHADOW_CLASS[layer.shadow][index]);
    }
    if (layer.titleSize !== undefined) {
      title.push(TITLE_SIZE_CLASS[layer.titleSize][index]);
    }
    if (layer.fontWeight !== undefined) {
      title.push(FONT_WEIGHT_CLASS[layer.fontWeight][index]);
    }
    if (layer.bodySize !== undefined) {
      body.push(TITLE_SIZE_CLASS[layer.bodySize][index]);
    }
    if (layer.bodyWeight !== undefined) {
      body.push(FONT_WEIGHT_CLASS[layer.bodyWeight][index]);
    }
  }

  return {
    cardClass: clsx(card),
    panelClass: clsx(panel),
    titleClass: clsx(title),
    bodyClass: clsx(body),
  };
};

/**
 * Resolves a section style to Tailwind class strings for responsive rendering.
 * @param input Style configuration (responsive or flat).
 * @returns Resolved style with wrapper classes, alignment, and grid classes.
 */
export const resolveSectionStyle = (
  input: ResponsiveSectionStyle | SectionStyle,
): ResolvedSectionStyle => {
  const style = normalizeStyle(input);
  const wrapper: string[] = [];
  const alignClass: string[] = [];
  const grid: string[] = [];
  const titleSize: string[] = [];

  for (const device of DEVICES) {
    const index = DEVICE_INDEX[device];
    const layer = layerFor(style, device);
    if (layer.bgColor !== undefined) {
      wrapper.push(BG_CLASS[layer.bgColor][index]);
    }
    if (layer.textColor !== undefined) {
      wrapper.push(WRAPPER_TEXT_CLASS[layer.textColor][index]);
    }
    if (layer.fontFamily !== undefined) {
      wrapper.push(FONT_FAMILY_CLASS[layer.fontFamily][index]);
    }
    if (layer.fontWeight !== undefined) {
      wrapper.push(FONT_WEIGHT_CLASS[layer.fontWeight][index]);
    }
    if (layer.paddingY !== undefined) {
      wrapper.push(PADDING_Y_CLASS[layer.paddingY][index]);
    }
    if (layer.paddingX !== undefined) {
      wrapper.push(PADDING_X_CLASS[layer.paddingX][index]);
    }
    if (layer.marginY !== undefined) {
      wrapper.push(MARGIN_Y_CLASS[layer.marginY][index]);
    }
    if (layer.radius !== undefined) {
      wrapper.push(RADIUS_CLASS[layer.radius][index]);
    }
    if (layer.shadow !== undefined) {
      wrapper.push(SHADOW_CLASS[layer.shadow][index]);
    }
    if (layer.align !== undefined) {
      alignClass.push(ALIGN_TEXT_CLASS[layer.align][index]);
      if (device !== 'mobile') {
        wrapper.push(ALIGN_TEXT_CLASS[layer.align][index]);
      }
    }
    if (layer.visibility !== undefined) {
      wrapper.push(VISIBILITY_CLASS[layer.visibility][index]);
    }
    if (layer.titleSize !== undefined) {
      titleSize.push(TITLE_SIZE_CLASS[layer.titleSize][index]);
    }
    if (layer.columns !== undefined) {
      grid.push(COLUMNS_CLASS[layer.columns][index]);
    }
    if (layer.gap !== undefined) {
      grid.push(GAP_CLASS[layer.gap][index]);
    }
  }

  return {
    wrapperClass: clsx(wrapper),
    align: style.base.align,
    alignClass: clsx(alignClass),
    titleColorClass: TITLE_COLOR_CLASS[style.base.textColor],
    titleSizeClass: clsx(titleSize),
    gridClass: clsx('grid', grid),
  };
};

export const resolveResponsiveSectionStyle = resolveSectionStyle;
