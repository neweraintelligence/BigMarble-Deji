'use client'

import Image from 'next/image'
import { useState } from 'react'
import { LucideIcon, AlertTriangle } from 'lucide-react'

interface NavIconProps {
  icon: LucideIcon | string
  alt: string
}

export function NavIcon({ icon, alt }: NavIconProps) {
  const [errored, setErrored] = useState(false)

  if (typeof icon === 'string') {
    if (errored) {
      return <AlertTriangle className="h-5 w-5 text-red-600" />
    }

    return (
      <Image
        src={`/${icon}.png`}
        alt={alt}
        width={20}
        height={20}
        onError={() => setErrored(true)}
        className="h-5 w-5"
      />
    )
  }

  // Otherwise, assume it's a Lucide icon component
  const IconComponent = icon as LucideIcon
  return <IconComponent className="h-5 w-5" />
} 