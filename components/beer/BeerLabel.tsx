import Image from 'next/image'
import type { Beer } from '@/lib/data'
import { assetPath } from '@/lib/asset-path'

interface BeerLabelProps {
  beer: Pick<Beer, 'name' | 'accentHex' | 'contrastHex' | 'labelSrc' | 'labelCardSrc' | 'labelType' | 'hasLabel'>
  size?: 'sm' | 'md' | 'lg' | 'hero'
  /** panel = fill parent (grid cards); overlay/card = fixed can-sized thumb */
  variant?: 'overlay' | 'card' | 'panel'
  /** Prefer card crop when available (grid / compact thumbs) */
  preferCard?: boolean
  /** panel object-fit; default cover. Use contain to inset art in the panel. */
  panelFit?: 'cover' | 'contain'
  /** Inset (px) when panelFit is contain */
  panelInset?: number
  nameOverride?: string
  style?: React.CSSProperties
}

const SIZES = {
  sm: { width: 60, height: 108, fontSize: 8 },
  md: { width: 72, height: 128, fontSize: 9 },
  lg: { width: 120, height: 220, fontSize: 11 },
  hero: { width: 280, height: 420, fontSize: 12 },
} as const

function resolveSrc(
  beer: BeerLabelProps['beer'],
  preferCard: boolean,
): { src: string; fit: 'cover' | 'contain' } | null {
  if (!beer.hasLabel && !beer.labelSrc && !beer.labelCardSrc) return null
  if (preferCard && beer.labelCardSrc) {
    return { src: beer.labelCardSrc, fit: 'cover' }
  }
  if (beer.labelSrc && beer.labelType === 'image') {
    return { src: beer.labelSrc, fit: preferCard ? 'cover' : 'contain' }
  }
  if (beer.labelCardSrc) {
    return { src: beer.labelCardSrc, fit: 'cover' }
  }
  return null
}

export function BeerLabel({
  beer,
  size = 'md',
  variant = 'overlay',
  preferCard = false,
  panelFit,
  panelInset = 0,
  nameOverride,
  style,
}: BeerLabelProps) {
  const dims = SIZES[size]
  const displayName = nameOverride ?? beer.name
  const isCard = variant === 'card'
  const isPanel = variant === 'panel'
  const resolved = resolveSrc(beer, preferCard || isPanel)

  if (isPanel && resolved) {
    const fit = panelFit ?? resolved.fit
    return (
      <div
        style={{
          position: 'absolute',
          inset: panelInset,
          ...style,
        }}
      >
        <Image
          src={assetPath(resolved.src)}
          alt={`${displayName} label`}
          fill
          style={{ objectFit: fit, objectPosition: 'center' }}
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
    )
  }

  if (resolved) {
    return (
      <div
        style={{
          width: dims.width,
          height: dims.height,
          position: 'relative',
          flexShrink: 0,
          background: isCard || size === 'hero' ? beer.accentHex : undefined,
          borderRadius: isCard ? 4 : size === 'hero' ? 8 : undefined,
          overflow: 'hidden',
          boxShadow: size === 'hero' ? '0 24px 48px rgba(0,0,0,0.18)' : undefined,
          border: size === 'hero' ? '4px solid var(--ink)' : undefined,
          ...style,
        }}
      >
        <Image
          src={assetPath(resolved.src)}
          alt={`${displayName} label`}
          fill
          style={{ objectFit: size === 'hero' ? 'contain' : resolved.fit, objectPosition: 'center' }}
          sizes={`${dims.width}px`}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        width: dims.width,
        height: dims.height,
        borderRadius: size === 'hero' ? 12 : size === 'lg' ? 12 : 8,
        background: isCard ? beer.accentHex : 'rgba(255,255,255,0.15)',
        border: isCard ? '4px solid var(--ink)' : '1px solid rgba(255,255,255,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: size === 'hero' ? '0 24px 48px rgba(0,0,0,0.15)' : undefined,
        ...style,
      }}
    >
      <span
        style={{
          fontSize: dims.fontSize,
          fontWeight: 700,
          color: isCard ? 'rgba(255,255,255,0.9)' : (beer.contrastHex ?? 'white'),
          textAlign: 'center',
          padding: 4,
          letterSpacing: '0.05em',
          opacity: 0.85,
          fontStyle: size === 'lg' || size === 'hero' ? 'italic' : undefined,
        }}
      >
        {displayName.toUpperCase()}
      </span>
    </div>
  )
}
