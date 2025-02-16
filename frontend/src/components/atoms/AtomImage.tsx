import React from 'react'

interface AtomImage {
  src: string

  alt?: string
  className?: string
  height?: number
  width?: number
}

export default function AtomImage(props: AtomImage) {
  return (
    <img
      className={props?.className || ''}
      src={props.src}
      alt={props?.alt || ''}
      width={props?.width || props?.height}
      height={props?.height || props?.width}
    />
  )
}
