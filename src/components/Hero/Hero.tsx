import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

const PHRASES = ['Café Especial', 'Chá Artesanal', 'Doce Fino']

function getInitialReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(getInitialReducedMotion)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const listener = (event: MediaQueryListEvent) => setPrefers(event.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])

  return prefers
}

/** Divide a frase em "Café " + destaque "Especial" para aplicar o highlight. */
function splitPhrase(phrase: string, length: number) {
  const visible = phrase.slice(0, length)
  const [firstWord, ...rest] = visible.split(' ')
  const highlighted = rest.join(' ')
  return { firstWord, highlighted }
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (reducedMotion) return

    const current = PHRASES[phraseIndex]
    const isComplete = !isDeleting && charIndex === current.length
    const isEmpty = isDeleting && charIndex === 0

    let timeout: ReturnType<typeof setTimeout>

    if (isComplete) {
      timeout = setTimeout(() => setIsDeleting(true), 3000)
    } else if (isEmpty) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex((index) => (index + 1) % PHRASES.length)
      }, 500)
    } else {
      timeout = setTimeout(
        () => setCharIndex((index) => index + (isDeleting ? -1 : 1)),
        isDeleting ? 50 : 100
      )
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, phraseIndex, reducedMotion])

  const displayLength = reducedMotion ? PHRASES[0].length : charIndex
  const { firstWord, highlighted } = splitPhrase(PHRASES[phraseIndex], displayLength)

  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.container}`}>
        <div>
          <span className={styles.badge}>✦ Especialidade</span>
          <h1 className={styles.title}>
            {firstWord}
            {highlighted && ' '}
            <span className={styles.highlight}>{highlighted}</span>
            <span aria-hidden="true">|</span>
          </h1>
          <p className={styles.subtitle}>
            Onde cada xícara conta uma história. Experimente cafés especiais, chás
            artesanais e doces finos em um ambiente contemporâneo.
          </p>
          <a href="#menu" className={styles.cta}>
            <i className="fas fa-arrow-down" aria-hidden="true" /> Ver Menu
          </a>
        </div>
        <div className={styles.imageWrap}>
          <div className={styles.decoration} aria-hidden="true">
            <i className="fas fa-mug-saucer" />
          </div>
        </div>
      </div>
    </section>
  )
}
