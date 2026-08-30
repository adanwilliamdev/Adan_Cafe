import { expect, test } from '@playwright/test'

test.describe('Fluxo de compra', () => {
  test('adiciona item ao carrinho, abre o carrinho e finaliza o pedido', async ({
    page,
  }) => {
    await page.goto('/')

    // Aguarda o menu carregar e adiciona o primeiro produto
    const firstAddButton = page.getByRole('button', { name: /adicionar/i }).first()
    await firstAddButton.waitFor({ state: 'visible' })
    await firstAddButton.click()

    // Toast de confirmação aparece
    await expect(page.getByText(/item adicionado/i)).toBeVisible()

    // Abre o carrinho
    await page.getByRole('button', { name: /abrir carrinho/i }).click()
    await expect(page.getByRole('dialog', { name: /carrinho de compras/i })).toBeVisible()

    // Finaliza o pedido
    await page.getByRole('button', { name: /finalizar pedido/i }).click()

    // Preenche o formulário de checkout
    await page.getByLabel(/nome completo/i).fill('Maria Souza')
    await page.getByLabel(/e-mail/i).fill('maria@example.com')
    await page.getByLabel(/telefone/i).fill('(11) 99999-9999')
    await page.getByLabel(/endereço de entrega/i).fill('Av. Paulista, 1000')
    await page.getByRole('radio', { name: 'Pix' }).check()

    await page.getByRole('button', { name: /confirmar pedido/i }).click()

    await expect(page.getByText(/pedido foi recebido com sucesso/i)).toBeVisible()
  })
})
