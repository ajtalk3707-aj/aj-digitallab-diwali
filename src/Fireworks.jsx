import { useEffect, useRef } from 'react'

const COLORS = ['#ffd54a', '#ff7a1a', '#ff4d6d', '#7cf7ff', '#b388ff', '#8dff8a', '#ffffff']

export default function Fireworks() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const x = c.getContext('2d')
    let W, H, raf
    const rockets = [], parts = []
    const size = () => { W = c.width = innerWidth; H = c.height = innerHeight }
    size()
    addEventListener('resize', size)
    const pick = () => COLORS[Math.floor(Math.random() * COLORS.length)]
    const launch = (tx, ty) => rockets.push({
      x: tx ?? W * (0.1 + Math.random() * 0.8), y: H,
      ty: ty ?? H * (0.12 + Math.random() * 0.35), c: pick(), vy: 9 + Math.random() * 3
    })
    const boom = (px, py, col) => {
      for (let i = 0; i < 80; i++) {
        const a = Math.random() * 6.283, s = Math.random() * 5 + 1
        parts.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, c: Math.random() < 0.3 ? pick() : col })
      }
    }
    const loop = () => {
      x.globalCompositeOperation = 'destination-out'
      x.fillStyle = 'rgba(0,0,0,0.22)'
      x.fillRect(0, 0, W, H)
      x.globalCompositeOperation = 'lighter'
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.y -= r.vy
        x.fillStyle = r.c
        x.beginPath(); x.arc(r.x, r.y, 2.5, 0, 6.283); x.fill()
        if (r.y <= r.ty) { boom(r.x, r.y, r.c); rockets.splice(i, 1) }
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.vx *= 0.985; p.vy *= 0.985; p.life -= 0.013
        if (p.life <= 0) { parts.splice(i, 1); continue }
        x.globalAlpha = p.life
        x.fillStyle = p.c
        x.beginPath(); x.arc(p.x, p.y, 2, 0, 6.283); x.fill()
      }
      x.globalAlpha = 1
      raf = requestAnimationFrame(loop)
    }
    loop()
    for (let i = 0; i < 4; i++) setTimeout(() => launch(), i * 250)
    const t = setInterval(() => launch(), 700)
    const click = (e) => launch(e.clientX, e.clientY)
    c.addEventListener('pointerdown', click)
    return () => {
      cancelAnimationFrame(raf); clearInterval(t)
      removeEventListener('resize', size)
      c.removeEventListener('pointerdown', click)
    }
  }, [])
  return <canvas ref={ref} className="fx" />
}
