import confetti from 'canvas-confetti'

const COLORS = ['#38bdf8', '#facc15', '#4ade80', '#f87171', '#a78bfa', '#f9a8d4']

function fire(x: number, y: number, particleCount: number, spread = 70) {
  confetti({
    particleCount,
    spread,
    startVelocity: 45,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    colors: COLORS,
    disableForReducedMotion: true,
    zIndex: 9999,
  })
}

export function burstConfetti(x: number, y: number, count = 60) {
  fire(x, y, count)
}

export function burstFromEvent(event: MouseEvent, count?: number) {
  burstConfetti(event.clientX, event.clientY, count)
}

export function burstFromElement(el: Element, count?: number) {
  const rect = el.getBoundingClientRect()
  burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, count)
}

// Célébration façon "canon des deux côtés" + pluie de confettis dispersés
// sur toute la largeur de la page — effet "ça fête ça partout".
export function burstPageWide() {
  const duration = 2200
  const end = Date.now() + duration

  // Canons depuis les deux bords, en continu pendant toute la durée.
  ;(function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      startVelocity: 55,
      origin: { x: 0, y: 0.7 },
      colors: COLORS,
      disableForReducedMotion: true,
      zIndex: 9999,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      startVelocity: 55,
      origin: { x: 1, y: 0.7 },
      colors: COLORS,
      disableForReducedMotion: true,
      zIndex: 9999,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()

  // Quelques poofs aléatoires un peu partout sur la page, en cascade.
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 90,
        startVelocity: 35,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() * 0.4 },
        colors: COLORS,
        disableForReducedMotion: true,
        zIndex: 9999,
      })
    }, i * 220)
  }

  // Un gros bouquet central pour ouvrir le bal.
  confetti({
    particleCount: 140,
    spread: 100,
    startVelocity: 50,
    origin: { x: 0.5, y: 0.3 },
    colors: COLORS,
    disableForReducedMotion: true,
    zIndex: 9999,
  })
}
