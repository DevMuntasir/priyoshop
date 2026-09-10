"use client";
import React from "react";
import { motion } from "motion/react";



const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const hasChildren = !!children;

  return (
    <div
      onMouseEnter={() => {
        setActive(item);
      }}
      className="relative"
    >
      <motion.div
        transition={{ duration: 0.3 }}
        className="cursor-pointer  text-ps-black hover:opacity-90 dark:text-ps-white flex items-center gap-1"
      >
        <span>{item}</span>
        {hasChildren && (
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            animate={{ rotate: active === item ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        )}
      </motion.div>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-ps-white !max-w-[900px] w-full dark:bg-ps-black backdrop-blur-sm rounded-xl overflow-hidden border border-ps-black/20 dark:border-ps-white/20 shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => (
  <nav
    onMouseLeave={() => {
      setActive(null);
    }}
    className="relative flex justify-center h-full items-center gap-6 mx-auto font-display font-semibold text-ps-sm"
  >
    {children}
  </nav>
);

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src?: string;
}) => (
  <a href={href} className="flex space-x-2">
    {src && (
      <>
        {/* eslint-disable-next-line next/no-img-element */}
        <img
          src={src}
          width={60}
          height={30}
          alt={title}
          className="shrink-0 mr-3 p-2"
        />
      </>
    )}
    <div>
      <h4 className="text-xl font-bold mb-1 text-ps-black dark:text-ps-white">
        {title}
      </h4>
      <p className="text-ps-ink-500 text-sm max-w-40 dark:text-ps-grey-400">
        {description}
      </p>
    </div>
  </a>
);

export const HoveredLink = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [key: string]: unknown;
}) => (
  <a
    {...rest}
    className="text-ps-ink-600 dark:text-ps-grey-400 hover:text-ps-black dark:hover:text-ps-white"
  >
    {children}
  </a>
);
