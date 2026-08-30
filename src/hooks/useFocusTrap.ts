import { useEffect, type RefObject } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Prende o foco de teclado dentro do elemento enquanto `active` for true,
 * fecha com Escape e devolve o foco ao elemento que abriu o modal ao fechar.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  onClose: () => void
) {
  useEffect(() => {
    if (!active) return

    const container = containerRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null

    const focusables = () =>
      Array.from(container?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [])

    const firstFocusable = focusables()[0]
    firstFocusable?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [active, containerRef, onClose])
}
