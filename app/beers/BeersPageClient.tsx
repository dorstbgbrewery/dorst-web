'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { beers, type Beer } from '@/lib/data'
import { useLocale } from '@/components/LocaleProvider'
import { pickBeerText } from '@/lib/locale-content'
import { BeerLabel } from '@/components/beer/BeerLabel'

const TAG_PILL: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '5px 10px',
  border: '1.5px solid var(--ink)',
  borderRadius: 'var(--radius-pill)',
  color: 'var(--ink)',
  background: 'var(--foam)',
}

export function BeersPageClient() {
  const t = useTranslations('Beers')
  const { locale } = useLocale()
  const activeCans = beers.filter(b => b.active && (b.format === 'can' || b.format === 'both'))

  return (
    <div style={{ paddingTop: 72 }}>
      <section className="page-pad" style={{ padding: '60px 48px 0' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>
          {t('eyebrow')}
        </p>
        <h1 style={{ fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 24 }}>
          {t('heading')}
        </h1>
        <p style={{ fontSize: 18, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 560, marginBottom: 48 }}>
          {t('sub')}
        </p>
      </section>

      <section className="page-pad" style={{ padding: '0 48px 80px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
          {t('cannedSection')}
          <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {activeCans.map(beer => (
            <BeerCard key={beer.id} beer={beer} locale={locale} t={t} />
          ))}
        </div>
      </section>

      <div className="page-pad" style={{ padding: '24px 48px 80px', borderTop: '1px solid var(--line)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
        {t('legalStrip')}
      </div>

      <style>{`
        .beer-card { transition: transform 0.2s, box-shadow 0.2s; }
        .beer-card:hover { transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(0,0,0,0.14) !important; }
      `}</style>
    </div>
  )
}

function BeerCard({ beer, locale, t }: { beer: Beer; locale: 'bg' | 'en'; t: ReturnType<typeof useTranslations<'Beers'>> }) {
  const text = pickBeerText(beer, locale)
  const hasArt = Boolean(beer.labelCardSrc || (beer.labelSrc && beer.labelType === 'image'))

  return (
    <Link
      href={`/beers/${beer.slug}`}
      style={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--paper)',
        border: '4px solid var(--ink)',
        borderRadius: 2,
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'var(--ink)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
      className="beer-card"
    >
      <div
        style={{
          background: beer.accentHex,
          aspectRatio: '3/4',
          padding: 16,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            border: '3px solid var(--ink)',
            borderRadius: 2,
            overflow: 'hidden',
            background: beer.accentHex,
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          }}
        >
          {hasArt ? (
            <BeerLabel beer={beer} variant="panel" preferCard panelFit="cover" nameOverride={text.name} />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BeerLabel beer={beer} size="lg" nameOverride={text.name} />
            </div>
          )}
        </div>
        {beer.seasonal && (
          <span style={{
            position: 'absolute', top: 20, right: 20, zIndex: 2,
            background: 'var(--foam)', color: 'var(--ink)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
            padding: '5px 12px', borderRadius: 100, border: '1.5px solid var(--ink)',
          }}>
            {t('seasonal')}
          </span>
        )}
      </div>
      <div style={{ padding: '20px 20px 24px', background: 'var(--paper)' }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>
          {text.style}
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, lineHeight: 1.1 }}>{text.name}</h3>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16, lineHeight: 1.5 }}>{text.tagline}</p>
        <div style={{ fontSize: 12, letterSpacing: '0.05em', color: 'var(--ink-soft)', paddingTop: 12, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontWeight: 900, fontSize: 15 }}>{beer.abv}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>%</span>
          <span style={{ margin: '0 6px', opacity: 0.4 }}> · </span>
          <span style={{ fontWeight: 900, fontSize: 15 }}>{beer.plato}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>°</span>
          {beer.ibu && (
            <>
              <span style={{ margin: '0 6px', opacity: 0.4 }}> · </span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>IBU {beer.ibu}</span>
            </>
          )}
        </div>
        {beer.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
            {beer.tags.map(tag => (
              <span key={tag} style={TAG_PILL}>
                {t(`tags.${tag}`)}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
