/** Unique identifier for a block instance. */
export type BlockId = string;

/** A single draggable/editable block on the canvas. */
export type Block = {
  id: BlockId;
  type: string;
  props: Record<string, unknown>;
  children?: Block[];
};

/** A published or draft page built with the page builder. */
export type BuilderPageDoc = {
  pageId: string;
  slug: string;
  title: string;
  status: 'draft' | 'published';
  blocks: Block[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: string;
};

/** A single item in the navigation menu tree. */
export type MenuItem = {
  id: string;
  label: string;
  href?: string;
  pageId?: string;
  description?: string;
  image?: string;
  children?: MenuItem[];
};

/** The navigation menu document. */
export type NavMenuDoc = {
  menuId: 'main-nav';
  items: MenuItem[];
  updatedAt: Date;
};
