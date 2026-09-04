'use client'

import { useTranslations } from 'next-intl'
import { venues, type Venue } from '@/lib/data'
import { useLocale } from '@/components/LocaleProvider'
import { pickVenueText } from '@/lib/locale-content'

export function LocationsPageClient() {
  const t = useTranslations('Locations')
  const { locale } = useLocale()
  const activeVenues = venues.filter(v => v.active)
  const bars = activeVenues.filter(v => v.type === 'bar')
  const shops = activeVenues.filter(v => v.type === 'bottle_shop')

  return (
    <div style={{ paddingTop: 72 }}>
      <section className="page-pad" style={{ padding: '60px 48px 40px', borderBottom: '1px solid var(--line)' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>{t('heading')}</p>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 20 }}>
          {t('title', { count: activeVenues.length })}
        </h1>
        <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 480 }}>{t('intro')}</p>
      </section>

      <section className="page-pad" style={{ padding: '60px 48px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          {t('barsSection')}
          <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {bars.map(venue => (
            <VenueRow key={venue.id} venue={venue} locale={locale} t={t} />
          ))}
        </div>
      </section>

      {shops.length > 0 && (
        <section className="page-pad" style={{ padding: '48px 48px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            {t('shopsSection')}
            <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {shops.map(venue => (
              <VenueRow key={venue.id} venue={venue} locale={locale} t={t} />
            ))}
          </div>
        </section>
      )}

      <div className="page-pad" style={{ padding: '60px 48px 80px' }}>
        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 2, padding: '24px 28px', maxWidth: 560, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.65 }}>
          <strong style={{ color: 'var(--ink)', fontWeight: 700 }}>{t('stockPrompt')}</strong>{' '}
          {t.rich('stockBody', {
            emailLink: (chunks) => (
              <a href="mailto:sales@dorst.bg" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'underline' }}>{chunks}</a>
            ),
            portalLink: (chunks) => (
              <a href="/partners" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'underline' }}>{chunks}</a>
            ),
          })}
        </div>
      </div>

      <style>{`
        .venue-row { transition: padding-left 0.2s; }
        .venue-row:hover { padding-left: 8px !important; }
      `}</style>
    </div>
  )
}

function VenueRow({ venue, locale, t }: { venue: Venue; locale: 'bg' | 'en'; t: ReturnType<typeof useTranslations<'Locations'>> }) {
  const typeLabel = t(`types.${venue.type}`)

  return (
    <a
      href={venue.googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'var(--ink)', gap: 16 }}
      className="venue-row"
    >
      <div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{venue.name}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{pickVenueText(venue, locale)}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)', background: 'rgba(14,14,16,0.06)', padding: '4px 10px', borderRadius: 100 }}>{typeLabel}</span>
        <span style={{ opacity: 0.3, fontSize: 16 }}>→</span>
      </div>
    </a>
  )
}
