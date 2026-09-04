'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { venues } from '@/lib/data'
import { useLocale } from '@/components/LocaleProvider'
import { pickVenueText } from '@/lib/locale-content'
import { fetchPublicLocations, type PublicLocation } from '@/lib/public-api'

type DisplayVenue = {
  id: string
  name: string
  googleMapsUrl: string
  subtitle: string
  badge: string
}

type Source = 'loading' | 'erp' | 'erp-empty' | 'static-fallback'

function fallbackVenues(locale: 'bg' | 'en', t: ReturnType<typeof useTranslations<'Locations'>>): DisplayVenue[] {
  return venues
    .filter((v) => v.active)
    .map((v) => ({
      id: v.id,
      name: v.name,
      googleMapsUrl: v.googleMapsUrl,
      subtitle: pickVenueText(v, locale),
      badge: t(`types.${v.type}`),
    }))
}

function fromErp(loc: PublicLocation, t: ReturnType<typeof useTranslations<'Locations'>>): DisplayVenue {
  const badge =
    loc.lifecycle_stage === 'regular_customer' ? t('tiers.regular') : t('tiers.repeat')
  return {
    id: loc.id,
    name: loc.name,
    googleMapsUrl: loc.maps_url,
    subtitle: loc.city ?? t('cityFallback'),
    badge,
  }
}

export function LocationsPageClient() {
  const t = useTranslations('Locations')
  const { locale } = useLocale()
  const [list, setList] = useState<DisplayVenue[]>([])
  const [source, setSource] = useState<Source>('loading')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setSource('loading')
    setErrorMsg(null)
    fetchPublicLocations()
      .then((locations) => {
        if (cancelled) return
        if (locations.length === 0) {
          setList([])
          setSource('erp-empty')
          return
        }
        setList(locations.map((l) => fromErp(l, t)))
        setSource('erp')
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setList(fallbackVenues(locale, t))
        setSource('static-fallback')
        setErrorMsg(err instanceof Error ? err.message : 'ERP unavailable')
      })
    return () => {
      cancelled = true
    }
  }, [locale, t])

  const display = source === 'loading' ? [] : list
  const count = source === 'loading' ? '…' : source === 'erp-empty' ? 0 : display.length

  return (
    <div style={{ paddingTop: 72 }}>
      <section className="page-pad" style={{ padding: '60px 48px 40px', borderBottom: '1px solid var(--line)' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>{t('heading')}</p>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 20 }}>
          {t('title', { count })}
        </h1>
        <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 480 }}>{t('intro')}</p>
        {source === 'static-fallback' && (
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-soft)' }}>
            {t('erpFallbackNote')}{errorMsg ? ` (${errorMsg})` : ''}
          </p>
        )}
        {source === 'erp-empty' && (
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-soft)' }}>{t('erpEmptyNote')}</p>
        )}
      </section>

      <section className="page-pad" style={{ padding: '60px 48px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          {source === 'erp' || source === 'erp-empty' || source === 'loading' ? t('stockistsSection') : t('barsSection')}
          <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {display.map((venue) => (
            <VenueRow key={venue.id} venue={venue} />
          ))}
        </div>
      </section>

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

function VenueRow({ venue }: { venue: DisplayVenue }) {
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
        <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{venue.subtitle}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)', background: 'rgba(14,14,16,0.06)', padding: '4px 10px', borderRadius: 100 }}>{venue.badge}</span>
        <span style={{ opacity: 0.3, fontSize: 16 }}>→</span>
      </div>
    </a>
  )
}
