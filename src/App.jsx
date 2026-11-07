import { useEffect, useState } from 'react'
import Fireworks from './Fireworks'

const THEMES = { gold: 'Royal Gold', sunset: 'Sunset Glow', night: 'Midnight Sky' }
const params = new URLSearchParams(location.search)
const TEXT = {
  en: {
    themes: { gold: 'Royal Gold', sunset: 'Sunset Glow', night: 'Midnight Sky' },
    title: 'Diwali Wishes',
    subtitle: 'Create a magical Diwali wish with your name and share it with everyone.',
    name: 'Your name (e.g. Jasmat)',
    recipient: "Friend's name (optional)",
    create: '✨ Create my wish link',
    from: 'From',
    happy: 'You and your family, Happy Diwali!',
    openWish: 'Open your special wish 👇',
    copied: 'Copied ✓',
    copy: 'Copy',
    share: 'Share',
    preview: '👀 Preview my wish',
    hey: 'Hey',
    haveWish: 'you have a Diwali wish from',
    tapDiya: 'Tap the diya to open',
    openDiya: 'Open wish',
    greeting: 'Happy Diwali!',
    senderLine: (from) => `Warm wishes from ${from}!`,
    salutation: (to) => `Dear ${to} ❤️`,
    message: 'Wishing you and your family a very Happy Diwali! May your life always shine with happiness, love, success and prosperity.',
    tapCrackers: 'Tap anywhere to burst crackers 🎆',
    sendOwn: '🎁 Send your own Diwali wishes',
    followStart: 'Follow',
    followEnd: 'on Instagram',
    language: 'Language',
    english: 'English',
    gujarati: 'ગુજરાતી',
  },
  gu: {
    themes: { gold: 'શાહી સોનેરી', sunset: 'સાંજની ઝાકમઝોળ', night: 'રાતનું આકાશ' },
    title: 'દિવાળીની શુભેચ્છાઓ',
    subtitle: 'તમારા નામ સાથે દિવાળીની સુંદર શુભેચ્છા બનાવો અને સૌની સાથે શેર કરો.',
    name: 'તમારું નામ (દા.ત. જસ્મત)',
    recipient: 'મિત્રનું નામ (વૈકલ્પિક)',
    create: '✨ મારી શુભેચ્છાની લિંક બનાવો',
    from: '',
    happy: 'તમને અને તમારા પરિવારને દિવાળીની હાર્દિક શુભેચ્છાઓ!',
    openWish: 'તમારી ખાસ શુભેચ્છા જુઓ 👇',
    copied: 'કૉપી થયું ✓',
    copy: 'કૉપી',
    share: 'શેર કરો',
    preview: '👀 મારી શુભેચ્છા જુઓ',
    hey: 'પ્રિય',
    haveWish: 'તમારા માટે દિવાળીની શુભેચ્છા મોકલી છે:',
    tapDiya: 'શુભેચ્છા જોવા દીવા પર ટૅપ કરો',
    openDiya: 'શુભેચ્છા ખોલો',
    greeting: 'દિવાળીની હાર્દિક શુભેચ્છાઓ!',
    senderLine: (from) => `${from} તરફથી સ્નેહભરી શુભકામનાઓ!`,
    salutation: (to) => `પ્રિય ${to} ❤️`,
    message: 'તમને અને તમારા પરિવારને દિવાળીની હાર્દિક શુભકામનાઓ.\nતમારું જીવન સુખ, શાંતિ, સ્વાસ્થ્ય અને સમૃદ્ધિના પ્રકાશથી હંમેશા ઝળહળતું રહે. 🪔',
    tapCrackers: 'ફટાકડા ફોડવા સ્ક્રીન પર ટૅપ કરો 🎆',
    sendOwn: '🎁 તમારી દિવાળીની શુભેચ્છા મોકલો',
    followStart: 'Instagram પર',
    followEnd: 'ને ફૉલો કરો',
    language: 'ભાષા',
    english: 'English',
    gujarati: 'ગુજરાતી',
  },
}

function LanguagePicker({ language, onChange, text }) {
  return (
    <div className="language-picker" role="group" aria-label={text.language}>
      <button className={language === 'en' ? 'selected' : ''} onClick={() => onChange('en')} aria-pressed={language === 'en'}>
        {text.english}
      </button>
      <button className={language === 'gu' ? 'selected' : ''} onClick={() => onChange('gu')} aria-pressed={language === 'gu'}>
        {text.gujarati}
      </button>
    </div>
  )
}

function FollowLink({ text }) {
  return (
    <p className="credit">
      {text.followStart}{' '}
      <a href="https://www.instagram.com/aj_digitallab?utm_source=qr&obrf=MWgzZmNwMTl4MDExaA==" target="_blank" rel="noreferrer">
        @aj_digitallab
      </a>{' '}
      {text.followEnd}
    </p>
  )
}

function Floaters() {
  const items = Array.from({ length: 14 }, (_, i) => i)
  return (
    <div className="floaters" aria-hidden="true">
      {items.map((i) => (
        <span key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i * 0.7) % 6}s`, animationDuration: `${7 + (i % 5)}s` }}>
          {['🪔', '✨', '🎆', '🪔', '⭐'][i % 5]}
        </span>
      ))}
    </div>
  )
}

function DiyaRow() {
  return (
    <div className="diyas" aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => (
        <div className="diya" key={i} style={{ animationDelay: `${i * 0.2}s` }}>
          <i className="flame" />
          <b className="bowl" />
        </div>
      ))}
    </div>
  )
}

function Home({ language, setLanguage }) {
  const text = TEXT[language]
  const [name, setName] = useState(params.get('name') || '')
  const [to, setTo] = useState('')
  const [theme, setTheme] = useState('gold')
  const [link, setLink] = useState('')
  const [copied, setCopied] = useState(false)

  const make = () => {
    if (!name.trim()) return
    const q = new URLSearchParams({ from: name.trim(), t: theme, lang: language })
    if (to.trim()) q.set('to', to.trim())
    setLink(`${location.origin}/?${q.toString()}`)
    setCopied(false)
  }
  const selectLanguage = (nextLanguage) => {
    setLanguage(nextLanguage)
    if (link) {
      const updatedLink = new URL(link)
      updatedLink.searchParams.set('lang', nextLanguage)
      setLink(updatedLink.toString())
    }
  }
  const shareText = `🪔 ${text.from} ${name.trim()}: ${text.happy} ✨\n${text.openWish}\n${link}`
  const copy = async () => { try { await navigator.clipboard.writeText(shareText); setCopied(true) } catch { prompt(text.copy, shareText) } }
  const share = () => navigator.share ? navigator.share({ text: shareText }).catch(() => {}) : copy()

  return (
    <div className="screen" data-theme={theme}>
      <Floaters />
      <LanguagePicker language={language} onChange={selectLanguage} text={text} />
      <main className="card">
        <div className="big">🪔</div>
        <h1>{text.title}</h1>
        <p className="sub">{text.subtitle}</p>
        <input placeholder={text.name} value={name} onChange={(e) => setName(e.target.value)} maxLength={30} />
        <input placeholder={text.recipient} value={to} onChange={(e) => setTo(e.target.value)} maxLength={30} />
        <div className="themes">
          {Object.entries(text.themes).map(([k, v]) => (
            <button key={k} className={`chip ${theme === k ? 'on' : ''}`} onClick={() => setTheme(k)}>{v}</button>
          ))}
        </div>
        <button className="cta" onClick={make} disabled={!name.trim()}>{text.create}</button>
        {link && (
          <div className="result">
            <p className="preview">“{text.from} <b>{name.trim()}</b>: {text.happy}”</p>
            <div className="row">
              <a className="btn wa" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}>WhatsApp</a>
              <button className="btn" onClick={share}>{text.share}</button>
              <button className="btn" onClick={copy}>{copied ? text.copied : text.copy}</button>
            </div>
            <a className="peek" href={link} target="_blank" rel="noreferrer">{text.preview}</a>
          </div>
        )}
      </main>
      <DiyaRow />
      <FollowLink text={text} />
    </div>
  )
}

function Wish({ from, to, theme, language, setLanguage }) {
  const text = TEXT[language]
  const [open, setOpen] = useState(false)
  return (
    <div className="screen" data-theme={theme}>
      <LanguagePicker language={language} onChange={setLanguage} text={text} />
      {!open ? (
        <>
          <Floaters />
          <main className="card center">
            <p className="sub">{to ? `${text.hey} ${to},` : `${text.hey},`} {text.haveWish}</p>
            <h2 className="from">{from}</h2>
            <button className="gift" onClick={() => setOpen(true)} aria-label={text.openDiya}>🪔</button>
            <p className="tap">{text.tapDiya}</p>
          </main>
        </>
      ) : (
        <>
          <Fireworks />
          <main className="wish">
            <h1 className="title">{text.greeting}</h1>
            <p className="sender-line">{text.senderLine(from)}</p>
            {to && <div className="glow">{text.salutation(to)}</div>}
            <p className="msg">{text.message}</p>
            <p className="hint">{text.tapCrackers}</p>
            <a className="cta link" href={`/?name=${encodeURIComponent(to || '')}&lang=${language}`}>{text.sendOwn}</a>
          </main>
          <DiyaRow />
        </>
      )}
      <FollowLink text={text} />
    </div>
  )
}

export default function App() {
  const [language, setLanguage] = useState(() => {
    const queryLanguage = params.get('lang')
    if (queryLanguage === 'en' || queryLanguage === 'gu') return queryLanguage
    return localStorage.getItem('diwali-language') === 'gu' ? 'gu' : 'en'
  })
  useEffect(() => {
    document.documentElement.lang = language === 'gu' ? 'gu' : 'en'
  }, [language])
  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage)
    localStorage.setItem('diwali-language', nextLanguage)
  }
  const from = params.get('from')
  if (from) return <Wish from={from} to={params.get('to')} theme={THEMES[params.get('t')] ? params.get('t') : 'gold'} language={language} setLanguage={changeLanguage} />
  return <Home language={language} setLanguage={changeLanguage} />
}
