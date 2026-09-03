'use client';

import { useState } from 'react';
import type { Editor } from '@tiptap/react';
import { MediaPickerModal } from '@/components/admin/assets/MediaPickerModal';

function ToolbarButton(props: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={props.label}
      aria-label={props.label}
      aria-pressed={props.active}
      onClick={props.onClick}
      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-ps-sm border-none px-2 font-body text-ps-xs font-semibold transition-colors ${
        props.active ? 'bg-ps-black text-white' : 'bg-transparent text-ps-ink-700 hover:bg-ps-grey-100'
      }`}
    >
      {props.children}
    </button>
  );
}

/* Formatting controls matching the sanitizer allowlist. */
export function RichTextToolbar(props: { editor: Editor }) {
  const { editor } = props;
  const [pickerOpen, setPickerOpen] = useState(false);

  const addLink = () => {
    // eslint-disable-next-line no-alert
    const url = window.prompt('Link URL');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    } else if (url === '') {
      editor.chain().focus().unsetLink().run();
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-1 border-b border-ps-grey-200 px-2 py-1.5">
        <ToolbarButton
          label="Heading 2"
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ps-grey-200" />
        <ToolbarButton
          label="Bold"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <s>S</s>
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ps-grey-200" />
        <ToolbarButton
          label="Bullet list"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          label="Blockquote"
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          ❝
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ps-grey-200" />
        <ToolbarButton label="Link" active={editor.isActive('link')} onClick={addLink}>
          Link
        </ToolbarButton>
        <ToolbarButton label="Image from Library" onClick={() => setPickerOpen(true)}>
          🖼 Image
        </ToolbarButton>
      </div>

      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(media) => {
          editor.chain().focus().setImage({ src: media.url, alt: media.alt || media.title }).run();
        }}
        title="Insert Image into Content"
        defaultFolder="Blogs"
      />
    </>
  );
}
