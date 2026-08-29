'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuilderCanvas } from '@/components/admin/builder/BuilderCanvas';
import { ComponentPalette } from '@/components/admin/builder/ComponentPalette';
import { PropertyPanel } from '@/components/admin/builder/PropertyPanel';
import { BlocksTree } from '@/components/admin/builder/BlockTree';
import { useBuilderState } from '@/components/admin/builder/useBuilderState';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { adminFetch } from '@/libs/auth/AdminFetch';
import type { BuilderPageDoc } from '@/libs/builder/Types';

type PageProps = {
  params: Promise<{ pageId: string }>;
};

export default function PageEditorPage(props: PageProps) {
  const router = useRouter();
  const [page, setPage] = useState<BuilderPageDoc | null>(null);
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [draggedComponentType, setDraggedComponentType] = useState<string | null>(null);
  const [params, setParams] = useState<{ pageId: string } | null>(null);

  const builderState = useBuilderState();

  // Load params
  useEffect(() => {
    props.params.then(setParams);
  }, [props.params]);

  // Load page
  useEffect(() => {
    if (!params?.pageId) return;

    const loadPage = async () => {
      try {
        const response = await adminFetch(`/api/admin/builder-pages/${params.pageId}`);
        if (!response.ok) {
          throw new Error('Failed to load page');
        }
        const data = await response.json() as any;
        const loadedPage = data.page as BuilderPageDoc;
        setPage(loadedPage);
        setTitle(loadedPage.title);
        // Initialize builder state with page blocks
        builderState.setBlocks(loadedPage.blocks);
      } catch (error) {
        console.error('Failed to load page:', error);
      }
    };

    void loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.pageId]);


  if (!params || !page) {
    return <div className="p-8">Loading...</div>;
  }

  const selectedBlock = builderState.getBlockById(builderState.selectedBlockId ?? '');

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await adminFetch(`/api/admin/builder-pages/${params.pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          blocks: builderState.blocks,
          seo: page?.seo,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      const data = await response.json() as any;
      setPage(data.page as BuilderPageDoc);
    } catch (error) {
      console.error('Save failed:', error);
      // eslint-disable-next-line no-alert
      alert('Failed to save page');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      const response = await adminFetch(`/api/admin/builder-pages/${params.pageId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publish: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to publish');
      }

      const data = await response.json() as any;
      setPage(data.page as BuilderPageDoc);
      // eslint-disable-next-line no-alert
      alert('Page published successfully!');
    } catch (error) {
      console.error('Publish failed:', error);
      // eslint-disable-next-line no-alert
      alert(error instanceof Error ? error.message : 'Failed to publish page');
    }
  };

  const handleUnpublish = async () => {
    try {
      const response = await adminFetch(`/api/admin/builder-pages/${params.pageId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publish: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to unpublish');
      }

      const data = await response.json() as any;
      setPage(data.page as BuilderPageDoc);
    } catch (error) {
      console.error('Unpublish failed:', error);
      // eslint-disable-next-line no-alert
      alert('Failed to unpublish page');
    }
  };

  const handleDelete = async () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const response = await adminFetch(`/api/admin/builder-pages/${params.pageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      router.push('/admin/page-builder');
    } catch (error) {
      console.error('Delete failed:', error);
      // eslint-disable-next-line no-alert
      alert('Failed to delete page');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-ps-white">
      {/* Header */}
      <div className="border-b border-ps-grey-200 p-4 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page title"
              className="text-ps-h4 font-display font-bold"
            />
            <Text size="sm" className="text-ps-ink-600 mt-1">
              /{page.slug}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              tone="dark"
              onClick={() => {
                void handleSave();
              }}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>

            {page.status === 'published' ? (
              <Button
                variant="outlined"
                tone="dark"
                onClick={() => {
                  void handleUnpublish();
                }}
              >
                Unpublish
              </Button>
            ) : (
              <Button
                tone="brand"
                onClick={() => {
                  void handlePublish();
                }}
              >
                Publish
              </Button>
            )}

            <Button
              variant="ghost"
              tone="dark"
              onClick={() => {
                router.back();
              }}
            >
              Back
            </Button>

            <Button
              variant="outlined"
              tone="dark"
              onClick={() => {
                void handleDelete();
              }}
              className="text-ps-red-500 border-ps-red-500 hover:bg-ps-red-50"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Main editor */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar: Palette */}
        <div className="w-64 border-r border-ps-grey-200 overflow-hidden">
          <ComponentPalette
            onDragStart={(type) => setDraggedComponentType(type)}
          />
        </div>

        {/* Center: Canvas */}
        <BuilderCanvas
          blocks={builderState.blocks}
          selectedBlockId={builderState.selectedBlockId}
          draggedComponentType={draggedComponentType}
          onBlockSelect={builderState.selectBlock}
          onDrop={(type, parentId) => {
            builderState.addBlock(type, parentId);
            setDraggedComponentType(null);
          }}
        />

        {/* Right sidebar: Split between blocks tree and properties */}
        <div className="w-80 border-l border-ps-grey-200 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto border-b border-ps-grey-200">
            <BlocksTree
              blocks={builderState.blocks}
              selectedBlockId={builderState.selectedBlockId}
              onSelect={builderState.selectBlock}
              onDelete={builderState.deleteBlock}
              onDuplicate={builderState.duplicateBlock}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            <PropertyPanel
              block={selectedBlock}
              onPropsChange={(props) => {
                if (builderState.selectedBlockId) {
                  builderState.updateBlock(builderState.selectedBlockId, { props });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
