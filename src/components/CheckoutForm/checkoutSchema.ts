import { z } from 'zod'

export const checkoutSchema = z.object({
  name: z.string().trim().min(3, 'Informe seu nome completo').max(80, 'Nome muito longo'),
  email: z.string().trim().min(1, 'Informe seu e-mail').email('E-mail inválido'),
  phone: z
    .string()
    .trim()
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido. Ex: (11) 99999-9999'),
  address: z
    .string()
    .trim()
    .min(5, 'Informe um endereço de entrega válido')
    .max(150, 'Endereço muito longo'),
  paymentMethod: z.enum(['credit', 'debit', 'pix'], {
    message: 'Selecione uma forma de pagamento',
  }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
