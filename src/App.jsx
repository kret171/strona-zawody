import React, { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-gpx'
import { Analytics } from "@vercel/analytics/react"

const BLIK_PHONE = '733 493 275'
const TRIP_CONTACT = '+48 530 006 130'
const COMPANY_CONTACT = '+48 733 493 275'
const COMPANY_EMAIL = 'k.migryt@mega-event.pl'

const MAX_BY_MODEL = {
  aspect: 15,
  strike: 1,
  patron: 4,
  subsport: 7,
  subsportMen: 7,
}

const MODELS = [
  {
    id: 'aspect',
    title: 'Scott Aspect eRide 900',
    desc: 'Hardtail e-MTB. Bateria 800Wh, silnik Bosch Performance CX, skok 120mm. Pewny wybór na dłuższą wycieczkę z bardzo dobrą trakcją i stabilnością.',
    special: false,
    img: '/aspect.jpg',
  },
  {
    id: 'patron',
    title: 'Scott Patron eRide 930',
    desc: 'Full Suspension e-MTB. Bateria 800Wh/625Wh, silnik Bosch CX, skok 160mm. Potężna maszyna na cięższy teren, z dużą pewnością prowadzenia.',
    special: true,
    img: '/patron.jpg',
  },
  {
    id: 'strike',
    title: 'Scott Strike eRide 930',
    desc: 'Full Suspension e-MTB. Silnik Bosch CX, bateria 625Wh, skok 140-150mm. Model z ceną stałą, bez zniżek pakietowych.',
    special: true, // fixed price per unit
    img: '/stripe.jpg',
  },
  {
    id: 'subsport',
    title: 'Scott Sub Sport eRIDE 20',
    desc: 'Rower trekkingowy damski / unisex. Bateria 625Wh, wygodna geometria, dobry na ubite ścieżki i spokojniejsze tempo wycieczki.',
    special: false,
    img: '/subsport%20damski.webp',
  },
  {
    id: 'subsportMen',
    title: 'Scott Sub Sport eRIDE 20 Men',
    desc: 'Męska wersja komfortowego roweru trekkingowego. Stabilna pozycja, wygoda na trasie i naturalny wybór na rekreacyjny przejazd.',
    special: false,
    img: '/subsport%20meski.webp',
  },
]

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/megaevent_roweryelektryczne/',
    short: 'IG',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/megaeventpl/?ref=PROFILE_EDIT_xav_ig_profile_page_web',
    short: 'FB',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@ebikeeventpolska?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnjsahO7HyEE6QrtDt0O4Q-gXv56ZAHbU0tNzB4RHWGEa58PBKQaMmbyH6BzM_aem_YWdncwDiJ_B7FsWxIegq7v1pLk5p&brid=YWdncwFt5G-z2neTKIMSUpmQGnvN',
    short: 'TT',
  },
]

function SocialIcon({ short }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-white text-sm font-black tracking-widest text-black">
      {short}
    </span>
  )
}

function loadGpxToMap(map, url) {
  if (!map) return
  try {
    const gpx = new L.GPX(url, {
      async: true,
      polyline_options: { color: '#ff8800', weight: 5, opacity: 0.95 },
      marker_options: {
        startIconUrl: '',
        endIconUrl: '',
        shadowUrl: '',
      },
    })
    .on('loaded', function(e) {
      map.fitBounds(e.target.getBounds())
    })
    .addTo(map)
  } catch (err) {
    console.error('GPX load error', err)
  }
}

function GpxLayer({ url }) {
  const map = useMap()
  useEffect(() => {
    loadGpxToMap(map, url)
  }, [map, url])
  return null
}

function tieredPrice(count) {
  const n = Math.max(0, Math.floor(count))
  if (n === 0) return 0
  if (n === 1) return 250
  if (n === 2) return 450
  if (n === 3) return 600
  return 600 + (n - 3) * 150
}

export default function App() {
  const [counts, setCounts] = useState(() => {
    const initial = {}
    MODELS.forEach(m => (initial[m.id] = 0))
    return initial
  })

  const [selectedDate, setSelectedDate] = useState('2026-06-27T11:00')

  const regularIds = useMemo(() => MODELS.filter(m => !m.special).map(m => m.id), [])

  const regularCount = regularIds.reduce((s, id) => s + (counts[id] || 0), 0)
  const specialCount = MODELS.filter(m => m.special).reduce((s, m) => s + (counts[m.id] || 0), 0)

  const totalRegular = tieredPrice(regularCount)
  const totalSpecial = specialCount * 250
  const total = totalRegular + totalSpecial

  function inc(id) {
    setCounts(c => {
      const current = c[id] || 0
      const max = MAX_BY_MODEL[id] ?? 99
      if (current >= max) return c
      return { ...c, [id]: current + 1 }
    })
  }
  function dec(id) {
    setCounts(c => ({ ...c, [id]: Math.max(0, (c[id] || 0) - 1) }))
  }

  return (
    <div className="min-h-screen bg-[#efefef] text-black font-sans">
      <header className="w-full bg-white text-black py-3 px-6 flex items-center justify-center border-b-4 border-black">
        <div className="max-w-6xl w-full flex items-center justify-between gap-4">
          <img src="/logo.jpg" alt="Mega Event" className="h-12 sm:h-14 object-contain" />
          <a
            href="#/quiz"
            className="inline-flex items-center border-2 border-black px-4 py-2 text-[11px] font-black tracking-[.2em] uppercase hover:bg-black hover:text-white transition-colors whitespace-nowrap"
          >
            🚴 Quiz rowerowy
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8 sm:space-y-10">
        <section className="relative border-4 border-black bg-white overflow-hidden min-h-[420px] sm:min-h-[520px] md:min-h-[640px]">
          <div className="absolute inset-0">
            <img src="/Mega-Event-eventy-na-rowerach-elektrycznych-8.webp" alt="Mega Event Hero" className="h-full w-full object-cover" />
          </div>
          <div className="absolute top-0 left-0 right-0 bg-black text-white px-4 sm:px-6 py-3 text-center uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[10px] sm:text-sm font-bold">
            Mega Event 2026
          </div>
          <div className="absolute top-16 sm:top-20 right-3 sm:right-6 md:right-10 max-w-[240px] sm:max-w-[300px] bg-black text-white p-4 sm:p-5 md:p-6 border-4 border-black shadow-[10px_10px_0_0_#000]">
            <p className="text-[8px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-2">Trasa / start</p>
            <h2 className="text-sm sm:text-2xl font-black leading-tight">Wycieczka rowerowa z wyraźnym, surowym charakterem.</h2>
            <p className="mt-2 sm:mt-3 text-[10px] sm:text-sm leading-4 sm:leading-6"></p>
          </div>
          <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 max-w-[220px] sm:max-w-[280px] bg-black text-white p-4 sm:p-5 border-4 border-black shadow-[10px_10px_0_0_#000]">
            <p className="text-[8px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-2">Czas trwania</p>
            <p className="text-lg sm:text-3xl font-black">ok. 3h</p>
            <p className="mt-2 text-[10px] sm:text-sm leading-4 sm:leading-6"></p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 sm:gap-8 items-start">
          <div className="space-y-6">
            <div className="bg-black text-white p-5 sm:p-6 border-4 border-black shadow-[10px_10px_0_0_#000]">
              <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-3">Opis wycieczki</h3>
              <p className="leading-7">Nasze wycieczki to nie tylko przejażdżki, ale także doświadczenia, które pozwalają na poznanie nowych miejsc i aktywnego spędzenia czasu.</p>
            </div>

            <div className="bg-black text-white p-5 sm:p-6 border-4 border-black shadow-[10px_10px_0_0_#000]">
              <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-3">Strava</h3>
              <a className="inline-flex w-full sm:w-auto items-center justify-center bg-white text-black px-5 py-3 border-4 border-white font-black tracking-wide hover:bg-[#ff8800] hover:text-black transition-colors" href="https://www.strava.com/routes/3492627478217008160" target="_blank" rel="noreferrer">Otwórz trasę w Strava</a>
            </div>

            <div className="bg-black text-white p-5 sm:p-6 border-4 border-black shadow-[10px_10px_0_0_#000]">
              <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-3">Dlaczego ten wyjazd</h3>
              <p className="leading-7">To nie jest zwykła wypożyczalnia. To wydarzenie z konkretną estetyką, dopracowanym wyborem rowerów i prostym procesem rezerwacji.</p>
            </div>

            <div className="bg-[#ff8800] text-black p-5 sm:p-6 border-4 border-black shadow-[10px_10px_0_0_#000]">
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-[0.14em] mb-2">Ważne</h3>
              <p className="font-black text-base sm:text-lg">Dokonanie rezerwacji następuje w biurze pod namiotem.</p>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-2 shadow-[10px_10px_0_0_#000]">
            <div className="relative overflow-hidden rounded-none" style={{height:280}}>
              <MapContainer center={[52.43, 21.16]} zoom={12} style={{height:'100%', width:'100%'}}>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GpxLayer url="/trasa.gpx" />
              </MapContainer>
            </div>
          </div>
        </section>

        {/* Fleet */}
        <section>
          <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-6">Nasza Flota</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODELS.map(m => (
              <div key={m.id} className="bg-white border-4 border-black p-4 relative shadow-[8px_8px_0_0_#000] h-full flex flex-col">
                {m.special && (
                  <div className="absolute -top-3 right-2 bg-red-600 text-white px-3 py-1 text-xs sm:text-sm font-bold z-10">Cena stała: 250 zł/szt. - bez zniżek pakietowych!</div>
                )}
                <div className="w-full h-44 sm:h-44 bg-gray-200 mb-4 flex items-center justify-center overflow-hidden border-2 border-black">
                  <img src={m.img} alt={m.title} className="h-full w-full object-cover" />
                </div>
                <h3 className="font-black text-lg">{m.title}</h3>
                <p className="text-sm text-gray-800 leading-6 mb-3 flex-1">{m.desc}</p>
                <p className="text-xs font-semibold mb-2">Maksymalnie: {MAX_BY_MODEL[m.id]} szt.</p>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 border-2 touch-manipulation" onClick={() => dec(m.id)}>-</button>
                  <div className="font-bold min-w-[2rem] text-center">{counts[m.id] || 0}</div>
                  <button
                    className="px-4 py-2 border-2 touch-manipulation disabled:opacity-40"
                    onClick={() => inc(m.id)}
                    disabled={(counts[m.id] || 0) >= (MAX_BY_MODEL[m.id] ?? 99)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reservation & Payment */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">Rezerwacja</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedDate('2026-06-27T11:00')}
                className={`p-5 sm:p-6 border-4 ${selectedDate==='2026-06-27T11:00'? 'bg-black text-white':'bg-white'} font-black uppercase tracking-[0.14em] shadow-[8px_8px_0_0_#000]`}
              >
                27.06 - godz. 11:00
              </button>
              <button
                onClick={() => setSelectedDate('2026-07-04T11:00')}
                className={`p-5 sm:p-6 border-4 ${selectedDate==='2026-07-04T11:00'? 'bg-black text-white':'bg-white'} font-black uppercase tracking-[0.14em] shadow-[8px_8px_0_0_#000]`}
              >
                04.07 - godz. 11:00
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">Podsumowanie i Płatność</h2>

            <div className="bg-white border-4 border-black p-5 sm:p-6 shadow-[10px_10px_0_0_#000]">
              <p className="font-black uppercase tracking-[0.16em] mb-3">Wybrane modele i ilości</p>
              <ul className="mb-4">
                {MODELS.map(m => (
                  <li key={m.id} className="text-sm leading-6">{m.title}: <strong>{counts[m.id] || 0}</strong></li>
                ))}
              </ul>

              <p className="font-semibold mb-2">Suma za rowery zwykłe: <span className="text-xl">{totalRegular} zł</span></p>
              <p className="font-semibold mb-2">Suma za modele w cenie stałej (Strike + Patron): <span className="text-xl">{totalSpecial} zł</span></p>
              <p className="text-2xl font-black mb-4">Całkowita kwota do zapłaty: {total} zł</p>

              <p className="text-lg font-black text-red-600">Wymagana zaliczka celem rezerwacji: 50 zł (niezależnie od ilości rowerów)</p>
              <p className="mt-2 text-base font-black">Rezerwacja tej wycieczki: biuro pod namiotem</p>
              <p className="mt-2 text-sm">Kontakt 1 : {TRIP_CONTACT}</p>
              <p className="text-sm">Kontakt 2 : {COMPANY_CONTACT}</p>

              <div className="mt-6 space-y-3">
                <div className="p-4 border-2 border-black">
                  <strong>BLIK</strong>
                  <div className="text-sm">Numer telefonu: {BLIK_PHONE}</div>
                  <button className="mt-3 inline-flex items-center justify-center border-2 border-black px-4 py-2 text-sm font-black" onClick={() => navigator.clipboard.writeText(BLIK_PHONE)}>Kopiuj numer telefonu</button>
                </div>

                <div className="p-4 border-2 border-black">
                  <strong>Gotówka na miejscu</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black text-white border-4 border-black p-6 shadow-[10px_10px_0_0_#000]">
          <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-4">Sociale</h2>
          <div className="grid grid-cols-3 gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
                className="inline-flex h-16 w-full items-center justify-center border-4 border-white bg-black p-3 hover:bg-[#ff8800] hover:text-black transition-colors"
              >
                <SocialIcon short={social.short} />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full bg-black text-white py-5">
        <div className="max-w-6xl mx-auto text-center px-4">
          <div className="font-bold">Mega Event 2026</div>
          <div className="mt-2">Numery kontaktowe: {TRIP_CONTACT} | {COMPANY_CONTACT}</div>
          <div>Email: <strong>{COMPANY_EMAIL}</strong></div>
        </div>
      </footer>
    </div>
  )
}
