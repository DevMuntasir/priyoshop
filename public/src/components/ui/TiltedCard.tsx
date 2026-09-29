'use client';

import type * as React from 'react';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './TiltedCard.css';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export type TiltedCardProps = {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  innerStyle?: React.CSSProperties;
  borderRadius?: string | number;
};

/**
 * 3D tilted card component with cursor tracking, spring physics, and optional floating overlay.
 */
export function TiltedCard(props: TiltedCardProps) {
  const ref = useRef<HTMLElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  const altText = props.altText ?? 'Tilted card image';
  const captionText = props.captionText ?? '';
  const containerHeight = props.containerHeight ?? '300px';
  const containerWidth = props.containerWidth ?? '100%';
  const imageHeight = props.imageHeight ?? '300px';
  const imageWidth = props.imageWidth ?? '300px';
  const scaleOnHover = props.scaleOnHover ?? 1.1;
  const rotateAmplitude = props.rotateAmplitude ?? 14;
  const showMobileWarning = props.showMobileWarning ?? false;
  const showTooltip = props.showTooltip ?? true;
  const displayOverlayContent = props.displayOverlayContent ?? false;

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`tilted-card-figure ${props.className ?? ''}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        maxWidth: '100%',
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <motion.div
        className={`tilted-card-inner ${props.innerClassName ?? ''}`}
        style={{
          width: imageWidth,
          height: imageHeight,
          maxWidth: '100%',
          rotateX,
          rotateY,
          scale,
          ...props.innerStyle,
        }}
      >
        {props.imageSrc && (
          <motion.img
            src={props.imageSrc}
            alt={altText}
            className="tilted-card-img"
            style={{
              width: imageWidth,
              height: imageHeight,
              maxWidth: '100%',
              borderRadius: props.borderRadius ?? '15px',
            }}
          />
        )}

        {displayOverlayContent && props.overlayContent && (
          <motion.div className="tilted-card-overlay">{props.overlayContent}</motion.div>
        )}

        {props.children}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
