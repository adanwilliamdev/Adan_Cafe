import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCart } from '../../context/CartContext'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import styles from './CheckoutForm.module.css'
import { checkoutSchema, type CheckoutFormData } from './checkoutSchema'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

interface CheckoutFormProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CheckoutForm({ open, onClose, onSuccess }: CheckoutFormProps) {
  const { items, totalPrice, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useFocusTrap(modalRef, open, onClose)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'pix' },
  })

  if (!open) return null

  async function onSubmit() {
    // Simula o envio do pedido para uma API.
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSubmitted(true)
    clearCart()
  }

  function handleClose() {
    setSubmitted(false)
    reset()
    onClose()
    if (submitted) onSuccess()
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 className={styles.title} id="checkout-title">
            {submitted ? 'Pedido confirmado' : 'Finalizar Pedido'}
          </h3>
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Fechar formulário de checkout"
            onClick={handleClose}
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className={styles.successState}>
            <div className={styles.successIcon} aria-hidden="true">
              <i className="fas fa-check-circle" />
            </div>
            <p>Seu pedido foi recebido com sucesso! ☕ Obrigado pela preferência.</p>
            <button type="button" className={styles.submitBtn} onClick={handleClose}>
              Voltar ao menu
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.summary}>
              <span>{items.reduce((sum, item) => sum + item.quantity, 0)} item(s)</span>
              <span>{currencyFormatter.format(totalPrice)}</span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Nome completo
              </label>
              <input
                id="name"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                {...register('name')}
              />
              {errors.name && (
                <p className={styles.errorMessage} id="name-error" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
              />
              {errors.email && (
                <p className={styles.errorMessage} id="email-error" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="phone">
                Telefone
              </label>
              <input
                id="phone"
                placeholder="(11) 99999-9999"
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                {...register('phone')}
              />
              {errors.phone && (
                <p className={styles.errorMessage} id="phone-error" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="address">
                Endereço de entrega
              </label>
              <input
                id="address"
                className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'address-error' : undefined}
                {...register('address')}
              />
              {errors.address && (
                <p className={styles.errorMessage} id="address-error" role="alert">
                  {errors.address.message}
                </p>
              )}
            </div>

            <fieldset className={styles.field}>
              <legend className={styles.label}>Forma de pagamento</legend>
              <div className={styles.radioGroup}>
                <label className={styles.radioOption}>
                  <input type="radio" value="pix" {...register('paymentMethod')} />
                  Pix
                </label>
                <label className={styles.radioOption}>
                  <input type="radio" value="credit" {...register('paymentMethod')} />
                  Crédito
                </label>
                <label className={styles.radioOption}>
                  <input type="radio" value="debit" {...register('paymentMethod')} />
                  Débito
                </label>
              </div>
              {errors.paymentMethod && (
                <p className={styles.errorMessage} role="alert">
                  {errors.paymentMethod.message}
                </p>
              )}
            </fieldset>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Confirmar Pedido'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
