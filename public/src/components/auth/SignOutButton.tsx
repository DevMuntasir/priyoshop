'use client';

import { signOut } from '@/libs/auth/AuthClient';

export const SignOutButton = (props: { className?: string; children: React.ReactNode }) => {
  return (
    <button
      type="button"
      className={props.className}
      onClick={async () => {
        await signOut();
        window.location.href = '/';
      }}
    >
      {props.children}
    </button>
  );
};
