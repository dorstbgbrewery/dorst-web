import { Instagram, Facebook } from 'lucide-react'

function UntappdIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h10V5H7zm2 2h6v2H9V7zm0 4h6v2H9v-2zm0 4h4v2H9v-2z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/dorstbeer', Icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/share/1BycoZBoJy/?mibextid=wwXIfr', Icon: Facebook },
  { name: 'Untappd', href: 'https://untappd.com/Dorstco/beer', Icon: UntappdIcon },
] as const

interface SocialLinksProps {
  className?: string
  style?: React.CSSProperties
}

export function SocialLinks({ className, style }: SocialLinksProps) {
  return (
    <div className={className ?? 'social-links'} style={style}>
      {SOCIAL_LINKS.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <span className="social-link-icon">
            <Icon size={18} />
          </span>
          <span className="social-link-label">{name}</span>
        </a>
      ))}
    </div>
  )
}
