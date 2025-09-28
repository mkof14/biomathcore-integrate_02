'use client';

import React from 'react';

type Props = {
  title?: string;
};

export default function ReferClient({ title = "Refer a friend" }: Props) {
  const handleClick = () => {
    // TODO: your interactive logic (copy link, open modal, router.push, etc.)
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <button className="mt-4 rounded px-4 py-2 border" onClick={handleClick}>
        Copy referral link
      </button>
    </div>
  );
}
