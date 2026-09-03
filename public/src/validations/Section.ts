import * as z from 'zod';
import {
  ALIGN_OPTIONS,
  BG_COLOR_OPTIONS,
  COLUMNS_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  GAP_OPTIONS,
  MARGIN_Y_OPTIONS,
  PADDING_X_OPTIONS,
  PADDING_Y_OPTIONS,
  RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  TEXT_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
  VISIBILITY_OPTIONS,
} from '@/libs/cms/StyleTokens';

export const sectionStyleTokensSchema = z.object({
  align: z.enum(ALIGN_OPTIONS),
  bgColor: z.enum(BG_COLOR_OPTIONS),
  textColor: z.enum(TEXT_COLOR_OPTIONS),
  paddingY: z.enum(PADDING_Y_OPTIONS),
  paddingX: z.enum(PADDING_X_OPTIONS),
  marginY: z.enum(MARGIN_Y_OPTIONS),
  titleSize: z.enum(TITLE_SIZE_OPTIONS),
  fontFamily: z.enum(FONT_FAMILY_OPTIONS),
  fontWeight: z.enum(FONT_WEIGHT_OPTIONS),
  radius: z.enum(RADIUS_OPTIONS),
  shadow: z.enum(SHADOW_OPTIONS),
  columns: z.enum(COLUMNS_OPTIONS),
  gap: z.enum(GAP_OPTIONS),
  visibility: z.enum(VISIBILITY_OPTIONS),
});

export const responsiveSectionStyleSchema = z.object({
  base: sectionStyleTokensSchema,
  tablet: sectionStyleTokensSchema.partial().optional(),
  laptop: sectionStyleTokensSchema.partial().optional(),
  desktop: sectionStyleTokensSchema.partial().optional(),
});

const cardStyleTokensSchema = sectionStyleTokensSchema.extend({
  bodySize: z.enum(TITLE_SIZE_OPTIONS),
  bodyWeight: z.enum(FONT_WEIGHT_OPTIONS),
});

const responsiveCardStyleSchema = z.object({
  base: cardStyleTokensSchema,
  tablet: cardStyleTokensSchema.partial().optional(),
  laptop: cardStyleTokensSchema.partial().optional(),
  desktop: cardStyleTokensSchema.partial().optional(),
});

const headingSchema = z.object({
  eyebrow: z.string().max(80).optional(),
  title: z.string().min(1).max(160),
  titleTrail: z.string().max(80).optional(),
  description: z.string().max(400).optional(),
  ctaLabel: z.string().max(80).optional(),
  ctaHref: z.string().max(300).optional(),
  ctaSecondaryLabel: z.string().max(80).optional(),
  ctaSecondaryHref: z.string().max(300).optional(),
  backgroundImage: z.string().max(300).optional(),
  rotatingWords: z.array(z.string().max(80)).max(8).optional(),
  videoId: z.string().max(60).optional(),
  videoPath: z.string().max(300).optional(),
  textColor: z.string().max(60).optional(),
  textSize: z.string().max(60).optional(),
  slideAlign: z.enum(['left', 'center']).optional(),
});

const itemSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  logo: z.string().min(1).max(300).optional(),
  caption: z.string().max(200).optional(),
  title: z.string().max(160).optional(),
  body: z.string().max(600).optional(),
  image: z.string().max(300).optional(),
  imageAlt: z.string().max(160).optional(),
  ctaLabel: z.string().max(80).optional(),
  href: z.string().max(300).optional(),
  ctaSecondaryLabel: z.string().max(80).optional(),
  ctaSecondaryHref: z.string().max(300).optional(),
  ctaTone: z.enum(['auto', 'light', 'dark']).optional(),
  reverse: z.boolean().optional(),
  description: z.string().max(600).optional(),
  value: z.string().max(60).optional(),
  tag: z.string().max(60).optional(),
  date: z.string().max(60).optional(),
  year: z.string().max(20).optional(),
  size: z.enum(['short', 'tall']).optional(),
  column: z.enum(['a', 'b']).optional(),
  textColor: z.string().max(60).optional(),
  descriptionColor: z.string().max(60).optional(),
  textSize: z.string().max(60).optional(),
  descriptionSize: z.string().max(60).optional(),
  contentWidth: z.string().max(60).optional(),
  accentWords: z.string().max(160).optional(),
  accentColor: z.string().max(200).optional(),
  accentGradientFrom: z.string().max(60).optional(),
  accentGradientTo: z.string().max(60).optional(),
  slideBackgroundImage: z.string().max(300).optional(),
  slideBackgroundColor: z.string().max(60).optional(),
  slideAlign: z.enum(['left', 'center']).optional(),
  style: responsiveCardStyleSchema.optional(),
});

const contentSchema = z.object({
  heading: headingSchema,
  items: z.array(itemSchema).max(50),
  format: z.literal('hero-slides-v2').optional(),
});

export const sectionReorderSchema = z.object({
  page: z.string().min(2).max(40),
  keys: z.array(z.string().min(1).max(60)).min(1).max(50),
});

export type SectionReorderInput = z.infer<typeof sectionReorderSchema>;

export const sectionUpdateSchema = z.object({
  enabled: z.boolean(),
  order: z.number().int().min(0).max(1000),
  style: responsiveSectionStyleSchema,
  locale: z.string().min(2).max(5),
  content: contentSchema,
});

export type SectionUpdateInput = z.infer<typeof sectionUpdateSchema>;
