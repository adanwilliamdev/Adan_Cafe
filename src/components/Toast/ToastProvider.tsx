import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import styles from './Toast.module.css'

interface Toast {
  id: number
  message: string
}

interface ToastContextValue {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const idRef = useRef(0)

  const showToast = useCallback((message: string) => {
    const id = idRef.current++
    setToasts((current) => [...current, { id, message }])
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={styles.container} aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div className={styles.toast} key={toast.id}>
            <i className="fas fa-check-circle" aria-hidden="true" /> {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider')
  }
  return context
}
