'use client';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type Card = {
  id: number;
  content?: React.ReactNode;
  className: string;
  thumbnail: string;
};

const ImageComponent = (props: { card: Card }) => (
  <motion.img
    layoutId={`image-${props.card.id}-image`}
    src={props.card.thumbnail}
    height="500"
    width="500"
    className="absolute inset-0 size-full object-cover object-top transition duration-200"
    alt="thumbnail"
  />
);

const SelectedCard = (props: { selected: Card | null }) => (
  <div className="relative z-60 flex size-full flex-col justify-end rounded-sm bg-transparent shadow-2xl">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      className="absolute inset-0 z-10 size-full bg-black opacity-60"
    />
    <motion.div
      layoutId={`content-${props.selected?.id}`}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative z-70 px-8 pb-4"
    >
      {props.selected?.content}
    </motion.div>
  </div>
);

export const LayoutGrid = (props: { cards: Card[]; className?: string }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  const cardStateClasses = (card: Card) => {
    if (selected?.id === card.id) {
      return 'absolute inset-0 z-50 m-auto flex h-1/2 w-full cursor-pointer flex-col flex-wrap items-center justify-center rounded-sm md:w-1/2';
    }
    if (lastSelected?.id === card.id) {
      return 'z-40 size-full rounded-sm bg-white';
    }
    return 'size-full rounded-2xl bg-white';
  };

  return (
    <div
      className={cn('relative grid size-full grid-cols-1 gap-2 md:grid-cols-3', props.className)}
    >
      {props.cards.map((card) => (
        <div key={card.id} className={card.className}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(card.className, 'relative overflow-hidden', cardStateClasses(card))}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          'absolute top-0 left-0 z-10 size-full bg-black opacity-0',
          selected?.id ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};
