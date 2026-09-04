import type { Beer, Venue } from '@/lib/data'
import type { Locale } from '@/components/LocaleProvider'

export function pickBeerText(beer: Beer, locale: Locale) {
  const bg = locale === 'bg'
  return {
    // Style + name stay English on both locales (brand packaging language)
    name: beer.name,
    style: beer.style,
    tagline: bg ? beer.taglineBg : beer.taglineEn,
    story: bg ? beer.storyBg : beer.storyEn,
    pairing: bg ? beer.pairingBg : beer.pairingEn,
  }
}

export function pickVenueText(venue: Venue, locale: Locale) {
  return locale === 'bg' ? venue.descriptionBg : venue.descriptionEn
}
