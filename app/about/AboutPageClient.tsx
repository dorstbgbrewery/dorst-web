'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function AboutPageClient() {
  const t = useTranslations('About')

  return (
    <div style={{ paddingTop: 72 }}>
      <section className="about-grid page-pad" style={{ padding: '80px 48px', display: 'grid', gridTemplateColumns: '5fr 4fr', gap: 80, alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 24 }}>{t('heading')}</p>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>{t('title')}</h1>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 24 }}>{t('p1')}</p>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 24 }}>{t('p2')}</p>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 40 }}>{t('p3')}</p>

          <div style={{ paddingTop: 32, borderTop: '1px solid var(--line)' }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 20 }}>{t('foundersHeading')}</p>
            <div className="founders-row" style={{ display: 'flex', gap: 40 }}>
              {[
                { name: 'Dean', role: t('deanRole'), flag: '🇧🇬' },
                { name: 'Erwin', role: t('erwinRole'), flag: '🇳🇱' },
              ].map(person => (
                <div key={person.name} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--paper)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{person.flag}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{person.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{person.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderRadius: 8, aspectRatio: '4/5', background: 'var(--paper)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: 0.3 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
              <circle cx="17" cy="21" r="5" stroke="currentColor" strokeWidth="2" />
              <path d="M 4 36 L 16 26 L 24 33 L 32 24 L 44 36" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t('founderPhoto')}</span>
          </div>
        </div>
      </section>

      <section className="brewery-grid page-pad" style={{ padding: '80px 48px', background: 'var(--aubergine-deep)', color: 'white', display: 'grid', gridTemplateColumns: '4fr 5fr', gap: 80, alignItems: 'center' }}>
        <div style={{ borderRadius: 8, aspectRatio: '4/3', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: 0.2 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="8" width="40" height="32" rx="4" stroke="white" strokeWidth="2" />
              <circle cx="17" cy="21" r="5" stroke="white" strokeWidth="2" />
              <path d="M 4 36 L 16 26 L 24 33 L 32 24 L 44 36" stroke="white" strokeWidth="2" fill="none" />
            </svg>
            <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white' }}>{t('breweryHeading')}</span>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>{t('breweryHeading')}</p>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 24, color: 'white' }}>{t('breweryTitle')}</h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 20 }}>{t('breweryP1')}</p>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 32 }}>{t('breweryP2')}</p>
          <div className="brewery-stats" style={{ display: 'flex', gap: 32 }}>
            {[
              { num: '4,000', unit: 'L/month', label: t('statCapacity') },
              { num: '20+', unit: '', label: t('statEverBrewed') },
              { num: '10', unit: '', label: t('statRotation') },
            ].map(({ num, unit, label }) => (
              <div key={label}>
                <div style={{ fontSize: 32, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {num}{unit && <span style={{ fontSize: 14, fontWeight: 300, opacity: 0.5, marginLeft: 4 }}>{unit}</span>}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-pad" style={{ padding: '80px 48px' }}>
        <div style={{ maxWidth: 680 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 24 }}>{t('mascotHeading')}</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>{t('mascotTitle')}</h2>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 20 }}>{t('mascotP1')}</p>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75 }}>{t('mascotP2')}</p>
        </div>
      </section>

      <div style={{ margin: '0 48px 80px', background: 'rgba(14,14,16,0.06)', border: '1px solid var(--line)', borderRadius: 2, padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }} className="b2b-strip">
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 8 }}>{t('tradeEyebrow')}</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>{t('tradeTitle')}</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', fontWeight: 300 }}>{t('tradeBody')}</p>
        </div>
        <Link href="/partners" style={{ flexShrink: 0, display: 'inline-block', background: 'var(--ink)', color: 'var(--foam)', border: '2px solid var(--ink)', padding: '12px 24px', fontSize: 14, fontWeight: 700, borderRadius: 'var(--radius-pill)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          {t('tradeCta')}
        </Link>
      </div>

    </div>
  )
}
