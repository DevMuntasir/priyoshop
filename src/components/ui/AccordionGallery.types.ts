export type AccordionGalleryItem = {
  id?: string;
  image?: string;
  video?: string;
  videoPath?: string;
  videoPoster?: string;
  videoAutoplay?: boolean;
  label?: string;
  description?: string;
  link?: string;
  alt?: string;
};

export type AccordionGalleryProps = {
  items?: AccordionGalleryItem[];
  defaultIndex?: number;
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: 'horizontal' | 'vertical';
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
  showQuoteIcon?: boolean;
  videoAutoplay?: boolean;
};

