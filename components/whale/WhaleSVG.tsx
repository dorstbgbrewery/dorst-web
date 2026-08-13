import type { CSSProperties } from 'react'

interface WhaleSVGProps {
  size?: 'nav' | 'hero' | 'gate'
  fill?: string
  className?: string
  style?: CSSProperties
}

// Extracted from index.html lines 762–850
export function WhaleSVG({ size = 'hero', fill = '#0E0E10', className, style }: WhaleSVGProps) {
  if (size === 'nav') {
    return (
      <svg
        width="40"
        height="28"
        viewBox="0 0 80 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        aria-hidden="true"
      >
        <path d="M 8 30 Q 8 14 28 12 Q 52 10 62 24 Q 70 34 64 42 Q 56 52 36 50 Q 16 48 8 36 Z" fill={fill} />
        <path d="M 62 28 Q 72 14 78 8 Q 74 22 72 30 Z" fill={fill} />
        <path d="M 62 36 Q 74 36 78 48 Q 72 38 68 38 Z" fill={fill} />
        <path d="M 34 12 Q 40 2 48 10 Z" fill={fill} />
        <path d="M 24 38 Q 18 50 28 48 Z" fill={fill} />
        <circle cx="24" cy="26" r="3" fill="white" />
        <circle cx="23" cy="25" r="1" fill={fill} />
        <path d="M 14 35 Q 30 44 52 40" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="10" cy="8" r="2" fill={fill} opacity="0.4" />
        <circle cx="14" cy="4" r="1.5" fill={fill} opacity="0.3" />
        <circle cx="6" cy="5" r="1" fill={fill} opacity="0.2" />
      </svg>
    )
  }

  if (size === 'gate') {
    return (
      <svg
        width="320"
        height="234"
        viewBox="0 0 520 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path d="M 40 200 Q 40 110 130 90 Q 260 65 340 130 Q 410 185 390 255 Q 365 320 240 318 Q 100 315 40 230 Z" fill={fill} />
        <path d="M 370 148 Q 430 80 470 48 Q 452 130 448 178 Z" fill={fill} />
        <path d="M 368 248 Q 448 250 478 318 Q 452 260 430 252 Z" fill={fill} />
        <path d="M 200 92 Q 230 30 278 78 Z" fill={fill} />
        <path d="M 130 248 Q 100 318 162 305 Z" fill={fill} />
        <circle cx="128" cy="174" r="18" fill="white" />
        <circle cx="122" cy="170" r="7" fill={fill} />
        <circle cx="118" cy="167" r="2.5" fill="white" />
        <path d="M 70 230 Q 180 286 340 265" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M 68 204 Q 90 224 116 210" stroke="rgba(255,255,255,0.25)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="52" cy="50" r="10" fill={fill} opacity="0.15" />
        <circle cx="72" cy="24" r="7" fill={fill} opacity="0.12" />
        <circle cx="32" cy="30" r="5" fill={fill} opacity="0.08" />
        <circle cx="88" cy="10" r="4" fill={fill} opacity="0.08" />
      </svg>
    )
  }

  // hero size — full 520×380
  return (
    <svg
      width="520"
      height="380"
      viewBox="0 0 520 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M 40 200 Q 40 110 130 90 Q 260 65 340 130 Q 410 185 390 255 Q 365 320 240 318 Q 100 315 40 230 Z" fill={fill} />
      <path d="M 370 148 Q 430 80 470 48 Q 452 130 448 178 Z" fill={fill} />
      <path d="M 368 248 Q 448 250 478 318 Q 452 260 430 252 Z" fill={fill} />
      <path d="M 200 92 Q 230 30 278 78 Z" fill={fill} />
      <path d="M 130 248 Q 100 318 162 305 Z" fill={fill} />
      <circle cx="128" cy="174" r="18" fill="white" />
      <circle cx="122" cy="170" r="7" fill={fill} />
      <circle cx="118" cy="167" r="2.5" fill="white" />
      <path d="M 70 230 Q 180 286 340 265" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M 68 204 Q 90 224 116 210" stroke="rgba(255,255,255,0.25)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="52" cy="50" r="10" fill={fill} opacity="0.15" />
      <circle cx="72" cy="24" r="7" fill={fill} opacity="0.12" />
      <circle cx="32" cy="30" r="5" fill={fill} opacity="0.08" />
      <circle cx="88" cy="10" r="4" fill={fill} opacity="0.08" />
      <path d="M 180 130 Q 190 125 200 130" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
      <path d="M 210 118 Q 220 113 230 118" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
      <path d="M 240 112 Q 250 107 260 112" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
      <path d="M 160 148 Q 172 143 184 148" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
      <path d="M 148 168 Q 160 163 170 168" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
    </svg>
  )
}
