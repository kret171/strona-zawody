import React, { useState } from 'react'

/* ─────────────────────────────────────────────
   20 PYTAŃ – wszystkie zakodowane na stałe
───────────────────────────────────────────── */
const QUESTIONS = [
  {
    q: 'W słynnym wyścigu Tour de France lider klasyfikacji generalnej nosi żółtą koszulkę (maillot jaune). Kto ją otrzymuje?',
    answers: [
      'Zawodnik, który wygrał najwięcej etapów.',
      'Zawodnik z najkrótszym łącznym czasem przejazdu.',
      'Najlepszy góral wyścigu.',
      'Najszybszy sprinter na lotnych premiach.',
    ],
    correct: 1,
  },
  {
    q: 'Co w kolarstwie górskim oznacza skrót XC?',
    answers: ['Extreme Climbing.', 'Cross-Country.', 'X-Treme Cycle.', 'X-Country Enduro.'],
    correct: 1,
  },
  {
    q: 'Czym charakteryzuje się tzw. „indeksowanie" w nowoczesnych przerzutkach rowerowych?',
    answers: [
      'Możliwością zmiany kilku biegów naraz.',
      'Automatycznym doborem przełożenia przez komputer.',
      'Jedno kliknięcie manetki odpowiada dokładnie jednej zmianie biegu.',
      'Płynną regulacją oporu bez konkretnych stopni.',
    ],
    correct: 2,
  },
  {
    q: 'W kontekście wypraw rowerowych, co jest główną zaletą zestawu „bikepacking" nad tradycyjnymi sakwami na bagażniku?',
    answers: [
      'Znacznie większa pojemność bagażowa.',
      'Lepsze właściwości jezdne w trudnym terenie i mniejszy opór powietrza.',
      'Możliwość przewożenia sztywnych i ciężkich przedmiotów.',
      'Niższy koszt zakupu całego zestawu.',
    ],
    correct: 1,
  },
  {
    q: 'Jak nazywa się pięć najbardziej prestiżowych, jednodniowych wyścigów klasycznych w kolarstwie szosowym?',
    answers: ['Grand Toury.', 'Wielkie Szlemy.', 'Monumenty.', 'Klasyki Narodowe.'],
    correct: 2,
  },
  {
    q: 'System MIPS stosowany w nowoczesnych kaskach rowerowych ma na celu:',
    answers: [
      'Zwiększenie wentylacji głowy podczas upałów.',
      'Redukcję sił rotacyjnych działających na mózg podczas uderzenia.',
      'Automatyczne powiadamianie służb o wypadku.',
      'Zmniejszenie wagi kasku o ponad 10%.',
    ],
    correct: 1,
  },
  {
    q: 'W geometrii ramy rowerowej parametr „Reach" oznacza:',
    answers: [
      'Odległość w poziomie między środkiem suportu a środkiem góry rury sterowej.',
      'Długość rury podsiodłowej.',
      'Całkowitą długość roweru od osi do osi kół.',
      'Prześwit między ramą a kroczem kolarza.',
    ],
    correct: 0,
  },
  {
    q: 'Dlaczego w kolarstwie górskim (MTB) coraz częściej rezygnuje się z przedniej przerzutki na rzecz napędów 1× (np. 1×12)?',
    answers: [
      'Aby zwiększyć liczbę dostępnych przełożeń.',
      'Większa prostota, niższa waga i mniejsze ryzyko spadnięcia łańcucha.',
      'Ze względu na mniejszy koszt łańcuchów do takich napędów.',
      'Ponieważ tylne przerzutki stały się mniejsze.',
    ],
    correct: 1,
  },
  {
    q: 'Co jest główną korzyścią z przejścia na system bezdętkowy (Tubeless) w rowerze?',
    answers: [
      'Brak konieczności pompowania kół przed jazdą.',
      'Możliwość jazdy na niższym ciśnieniu bez ryzyka „dobicia" dętki.',
      'Całkowita odporność opony na rozcięcia boczne.',
      'Zmniejszenie oporu powietrza koła.',
    ],
    correct: 1,
  },
  {
    q: 'Kto uznawany jest za wynalazcę pierwowzoru roweru, tzw. „maszyny biegowej" (drezyny) z 1817 roku?',
    answers: ['Leonardo da Vinci.', 'Karl von Drais.', 'James Starley.', 'Michaux Pierre.'],
    correct: 1,
  },
  {
    q: 'W hamulcach tarczowych hydraulicznych, medium przenoszącym siłę z klamki na klocki jest:',
    answers: [
      'Stalowa linka w pancerzu.',
      'Płyn hamulcowy lub olej mineralny.',
      'Skompresowane powietrze.',
      'Przewód elektryczny wysyłający sygnał do zacisku.',
    ],
    correct: 1,
  },
  {
    q: 'Czym jest tzw. „torba wewnątrz trójkąta ramy" (frame bag) w ekwipunku wyprawowym?',
    answers: [
      'Małą torebką na narzędzia pod siodełkiem.',
      'Torbą montowaną wewnątrz głównego trójkąta ramy, idealną na ciężkie przedmioty.',
      'Plecakiem ze stelażem rowerowym.',
      'Sakwą montowaną na przednim widelcu.',
    ],
    correct: 1,
  },
  {
    q: 'Parametr FTP (Functional Threshold Power), kluczowy dla treningu kolarskiego, oznacza:',
    answers: [
      'Najwyższą moc chwilową (sprint).',
      'Maksymalną średnią moc, jaką kolarz jest w stanie utrzymać przez godzinę.',
      'Najniższe tętno spoczynkowe zawodnika.',
      'Średnią prędkość uzyskaną na dystansie 100 km.',
    ],
    correct: 1,
  },
  {
    q: 'O ile w przybliżeniu zmniejsza się opór powietrza kolarza jadącego bezpośrednio za innym zawodnikiem (tzw. jazda na kole)?',
    answers: [
      'O ok. 5%–10%.',
      'O ok. 30%–40%.',
      'O dokładnie 50%.',
      'Opór się nie zmienia, kolarz oszczędza tylko psychikę.',
    ],
    correct: 1,
  },
  {
    q: 'Do czego służy narzędzie zwane „skuwaczem"?',
    answers: [
      'Do prostowania skrzywionej tarczy hamulcowej.',
      'Do rozpinania i spinania ogniw łańcucha.',
      'Do dokręcania szprych w kole.',
      'Do montażu misek suportu w ramie.',
    ],
    correct: 1,
  },
  {
    q: 'Jaki format pliku jest najpowszechniej używany do wgrywania tras do nawigacji rowerowych (np. Garmin, Wahoo)?',
    answers: ['.PDF', '.GPX', '.MP4', '.JPEG'],
    correct: 1,
  },
  {
    q: 'Czym charakteryzuje się nowoczesny rower typu Gravel?',
    answers: [
      'Brakiem jakiejkolwiek amortyzacji i bardzo wąskimi oponami.',
      'Barankiem (kierownicą szosową) i szerokimi oponami z bieżnikiem.',
      'Prostą kierownicą i kołami o rozmiarze 26 cali.',
      'Jest to rower przeznaczony wyłącznie do jazdy po torze kolarskim.',
    ],
    correct: 1,
  },
  {
    q: 'Pojęcie „Dutch Reach" (holenderski chwyt) odnosi się do bezpieczeństwa i polega na:',
    answers: [
      'Hamowaniu obiema klamkami jednocześnie w sytuacjach awaryjnych.',
      'Otwieraniu drzwi samochodu ręką dalszą od klamki, by spojrzeć przez ramię na nadjeżdżających rowerzystów.',
      'Trzymaniu kierownicy obiema rękami podczas jazdy po kostce brukowej.',
      'Sposobie montażu dzwonka rowerowego po lewej stronie.',
    ],
    correct: 1,
  },
  {
    q: 'W Tour de France najwyższa kategoria trudności podjazdu to:',
    answers: ['Kategoria 1.', 'Kategoria 4.', 'HC (Hors Catégorie).', 'Ultra-Catégorie.'],
    correct: 2,
  },
  {
    q: 'Które komponenty tworzą tzw. „grupę osprzętu" w rowerze?',
    answers: [
      'Rama, widelec i stery.',
      'Przerzutki, manetki, hamulce, korba, kaseta i łańcuch.',
      'Koła, opony i dętki.',
      'Kierownica, mostek i sztyca podsiodłowa.',
    ],
    correct: 1,
  },
]

const LETTERS = ['A', 'B', 'C', 'D']

function endInfo(score) {
  const pct = score / QUESTIONS.length
  if (pct === 1)   return { emoji: '🏆', msg: 'Niesamowite! Perfekcyjny wynik! Jesteś prawdziwym ekspertem rowerowym!' }
  if (pct >= 0.8)  return { emoji: '🥇', msg: 'Rewelacyjny wynik! Twoja wiedza kolarska jest na bardzo wysokim poziomie!' }
  if (pct >= 0.6)  return { emoji: '🚴', msg: 'Dobry wynik! Znasz się na kolarstwie – warto jednak doczytać kilka szczegółów!' }
  if (pct >= 0.4)  return { emoji: '⚙️', msg: 'Solidna podstawa! Trochę więcej czasu na szlaku i quizy pójdą znacznie lepiej!' }
  return           { emoji: '🔧', msg: 'Czas na trening! Każdy zaczyna od zera – wróć i spróbuj jeszcze raz!' }
}

/* ─── Przycisk odpowiedzi ─── */
function AnswerBtn({ letter, text, state, onClick }) {
  // state: 'idle' | 'correct' | 'wrong' | 'selected-wrong'
  const base =
    'quiz-answer-btn w-full text-left border-[3px] border-black px-4 py-3 text-[15px] font-bold leading-snug transition-colors duration-150 relative'

  const styles = {
    idle:           `${base} bg-white hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] cursor-pointer`,
    correct:        `${base} bg-black text-white shadow-[6px_6px_0_0_#ff8800] quiz-correct cursor-default`,
    wrong:          `${base} bg-[#efefef] text-[#999] border-[#999] shadow-[4px_4px_0_0_#ccc] line-through cursor-default`,
    'selected-wrong': `${base} bg-[#ff4444] text-white border-[#cc0000] shadow-[4px_4px_0_0_#cc0000] quiz-wrong cursor-default`,
  }

  const icon = state === 'correct' ? '✓' : state === 'selected-wrong' ? '✗' : null

  return (
    <button
      className={styles[state]}
      onClick={state === 'idle' ? onClick : undefined}
      disabled={state !== 'idle'}
      aria-pressed={state !== 'idle'}
    >
      <strong>{letter})</strong> {text}
      {icon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl quiz-icon-pop">
          {icon}
        </span>
      )}
    </button>
  )
}

/* ─── Główny komponent ─── */
export default function Quiz() {
  const [currentQ,   setCurrentQ]   = useState(0)
  const [score,      setScore]       = useState(0)
  const [phase,      setPhase]       = useState('answering') // 'answering' | 'revealed' | 'end'
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [slideKey,   setSlideKey]    = useState(0) // wymusza re-mount karty → animacja

  const data    = QUESTIONS[currentQ]
  const total   = QUESTIONS.length
  const pctBar  = phase === 'end' ? 100 : (currentQ / total) * 100
  const isLast  = currentQ === total - 1

  function handleAnswer(idx) {
    if (phase !== 'answering') return
    const correct = data.correct
    const newScore = idx === correct ? score + 1 : score
    if (idx === correct) setScore(newScore)
    setSelectedIdx(idx)
    setPhase('revealed')
  }

  function handleNext() {
    if (isLast) {
      setPhase('end')
    } else {
      setCurrentQ(q => q + 1)
      setSelectedIdx(null)
      setPhase('answering')
      setSlideKey(k => k + 1)
    }
  }

  function restart() {
    setCurrentQ(0)
    setScore(0)
    setPhase('answering')
    setSelectedIdx(null)
    setSlideKey(k => k + 1)
  }

  /* ── stan wizualny każdego przycisku ── */
  function btnState(i) {
    if (phase !== 'revealed') return 'idle'
    if (i === data.correct)   return 'correct'
    if (i === selectedIdx)    return 'selected-wrong'
    return 'wrong'
  }

  /* ── feedback ── */
  const wasCorrect = phase === 'revealed' && selectedIdx === data.correct
  const { emoji, msg } = endInfo(score)

  return (
    <div className="min-h-screen bg-[#efefef] text-black font-sans">

      {/* ── Header ── */}
      <header className="w-full bg-white text-black py-3 px-6 flex items-center justify-center border-b-4 border-black">
        <div className="max-w-4xl w-full flex items-center justify-between gap-4">
          <img src="/logo.jpg" alt="Mega Event" className="h-12 sm:h-14 object-contain"
               onError={e => { e.target.style.display = 'none' }} />
          <a
            href="#/"
            className="inline-flex items-center border-2 border-black px-4 py-2 text-[11px] font-black tracking-[.2em] uppercase hover:bg-black hover:text-white transition-colors"
          >
            ← Strona główna
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-6">

        {/* ── Pasek postępu ── */}
        {phase !== 'end' && (
          <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-4 sm:p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] sm:text-xs font-black tracking-[.2em] uppercase">
                Pytanie {currentQ + 1} / {total}
              </span>
              <span className="bg-black text-white text-[11px] sm:text-xs font-black tracking-[.1em] px-3 py-1">
                Punkty: {score}
              </span>
            </div>
            <div className="bg-[#efefef] border-2 border-black h-4 overflow-hidden">
              <div
                className="h-full bg-[#ff8800] quiz-bar-fill"
                style={{ width: `${pctBar}%` }}
              />
            </div>
          </div>
        )}

        {/* ── Ekran pytania ── */}
        {phase !== 'end' && (
          <div key={slideKey} className="quiz-slide-in">
            <div className="bg-white border-4 border-black shadow-[10px_10px_0_0_#000] p-5 sm:p-8">

              {/* numer pytania */}
              <p className="text-[11px] font-black tracking-[.3em] uppercase text-[#ff8800] mb-2">
                Pytanie {currentQ + 1}
              </p>

              {/* treść pytania */}
              <h2 className="text-lg sm:text-xl md:text-2xl font-black leading-snug mb-6">
                {data.q}
              </h2>

              {/* odpowiedzi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-0">
                {data.answers.map((ans, i) => (
                  <AnswerBtn
                    key={i}
                    letter={LETTERS[i]}
                    text={ans}
                    state={btnState(i)}
                    onClick={() => handleAnswer(i)}
                  />
                ))}
              </div>

              {/* feedback */}
              {phase === 'revealed' && (
                <div
                  className={`mt-5 px-4 py-3 border-[3px] border-black font-black text-[15px] tracking-[.04em] quiz-fade-up
                    ${wasCorrect ? 'bg-black text-white' : 'bg-[#ff8800] text-black'}`}
                >
                  {wasCorrect ? '✔ Świetnie! Poprawna odpowiedź!' : '✘ Niestety, to nie ta odpowiedź.'}
                </div>
              )}

              {/* przycisk dalej */}
              {phase === 'revealed' && (
                <button
                  onClick={handleNext}
                  className="mt-4 w-full py-4 bg-[#ff8800] text-black border-4 border-black font-black text-[13px] sm:text-[15px] tracking-[.2em] uppercase shadow-[8px_8px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[4px_4px_0_0_#000] transition-all quiz-fade-up"
                >
                  {isLast ? 'Zobacz wyniki 🏁' : 'Następne pytanie →'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Ekran końcowy ── */}
        {phase === 'end' && (
          <div className="quiz-slide-in text-center space-y-6">

            {/* wynik */}
            <div className="bg-black text-white border-4 border-black shadow-[12px_12px_0_0_#ff8800] p-8 sm:p-12">
              <span className="block text-6xl sm:text-8xl mb-5 quiz-pop">{emoji}</span>
              <p className="text-xs font-black tracking-[.3em] uppercase text-[#ff8800] mb-3">
                Koniec quizu!
              </p>
              <div className="text-[72px] sm:text-[96px] font-black text-[#ff8800] leading-none">
                {score}
              </div>
              <div className="text-base font-bold tracking-[.1em] opacity-60 mb-5">
                / {total} punktów
              </div>
              <p className="text-base sm:text-lg font-bold leading-relaxed max-w-md mx-auto opacity-85">
                {msg}
              </p>
            </div>

            {/* pasek końcowy */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-4 sm:p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] sm:text-xs font-black tracking-[.2em] uppercase">
                  Wynik końcowy
                </span>
                <span className="bg-black text-white text-[11px] sm:text-xs font-black tracking-[.1em] px-3 py-1">
                  {score} / {total}
                </span>
              </div>
              <div className="bg-[#efefef] border-2 border-black h-4 overflow-hidden">
                <div className="h-full bg-[#ff8800] quiz-bar-fill" style={{ width: '100%' }} />
              </div>
            </div>

            {/* restart */}
            <button
              onClick={restart}
              className="inline-block px-10 py-5 bg-[#ff8800] text-black border-4 border-black font-black text-[13px] sm:text-[15px] tracking-[.2em] uppercase shadow-[8px_8px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[4px_4px_0_0_#000] transition-all"
            >
              🔄 Zacznij od nowa
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
