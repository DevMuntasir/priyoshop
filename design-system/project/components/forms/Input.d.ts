import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

/**
 * Rounded text field with label, hint/error and a red focus ring —
 * matches the Figma input states (default / focused / disabled).
 * @startingPoint section="Forms" subtitle="Text field with label & states" viewport="700x180"
 */
export function Input(props: InputProps): JSX.Element;
export default Input;
