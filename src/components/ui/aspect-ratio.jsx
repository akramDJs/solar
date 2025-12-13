'use client';

//import * as React from 'react';
import * as _AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

function AspectRatio({ ...props }) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };