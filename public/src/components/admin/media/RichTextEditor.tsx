'use client';

import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { RichTextToolbar } from './RichTextToolbar';

export type RichTextEditorProps = {
  /** Initial/controlled HTML. Changing it replaces the editor content (e.g. locale switch). */
  value: string;
  onChange: (html: string) => void;
};

/* Tiptap article editor for blog posts. Emits HTML; the API sanitizes it on
   write with a matching allowlist (headings 2-3, marks, lists, blockquote,
   links, images by URL). */
export function RichTextEditor(props: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false }),
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: props.value,
    // Required under Next.js SSR to avoid hydration mismatches.
    immediatelyRender: false,
    onUpdate: ({ editor: current }) => props.onChange(current.getHTML()),
  });

  // Replace content when the controlled value changes externally (locale switch),
  // without re-emitting onUpdate.
  useEffect(() => {
    if (editor && props.value !== editor.getHTML()) {
      editor.commands.setContent(props.value, { emitUpdate: false });
    }
  }, [editor, props.value]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-ps-sm border border-ps-grey-200 bg-white">
      <RichTextToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="[&_.ProseMirror]:min-h-72 [&_.ProseMirror]:px-4 [&_.ProseMirror]:py-3 [&_.ProseMirror]:outline-none [&_.ProseMirror]:font-body [&_.ProseMirror]:text-ps-sm [&_.ProseMirror_h2]:mt-6 [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h2]:font-display [&_.ProseMirror_h2]:text-ps-h6 [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_h3]:font-display [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_p]:my-2 [&_.ProseMirror_ul]:my-2 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:my-2 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_blockquote]:my-3 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-ps-red-500 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_a]:text-ps-red-600 [&_.ProseMirror_a]:underline [&_.ProseMirror_img]:my-3 [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-ps-sm"
      />
    </div>
  );
}
