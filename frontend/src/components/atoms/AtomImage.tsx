import Image, { ImageProps } from 'next/image'
import React from 'react'

export default function AtomImage(props: ImageProps) {
  return (
    <Image
      className={props?.className || ''}
      src={props.src}
      alt={props?.alt || 'image'}
      width={props?.width || props?.height}
      height={props?.height || props?.width}
    />
  )
}
