import { test, expect } from '@playwright/test';

test.describe('Match Eleitoral', () => {
  test('página carrega e mostra wizard', async ({ page }) => {
    await page.goto('/match');
    await expect(page.getByRole('heading', { name: /match eleitoral/i }).first()).toBeVisible();
    await expect(page.locator('text=Pergunta 1 de 10')).toBeVisible();
  });

  test('fluxo completo: responder perguntas e ver resultados', async ({ page }) => {
    await page.goto('/match');

    // Responde todas as 10 perguntas
    for (let i = 0; i < 10; i++) {
      await page.getByRole('button', { name: 'Concordo muito' }).first().click();
      if (i < 9) {
        await page.getByRole('button', { name: 'Próximo' }).click();
      }
    }

    // Clica em Ver resultados
    await page.getByRole('button', { name: /ver resultados/i }).click();

    // Espera resultados
    await expect(page.getByRole('heading', { name: 'Seu perfil político' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Parlamentares mais alinhados' })).toBeVisible();
  });

  test('navegação entre perguntas funciona', async ({ page }) => {
    await page.goto('/match');

    await page.getByRole('button', { name: 'Concordo muito' }).first().click();
    await page.getByRole('button', { name: 'Próximo' }).click();

    await page.getByRole('button', { name: 'Anterior' }).click();
    await expect(page.locator('text=Pergunta 1 de 10')).toBeVisible();
  });
});

test.describe('Navegação principal', () => {
  test('header links funcionam', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav a[href="/parlamentares"]').first().click();
    await expect(page).toHaveURL(/.*parlamentares.*/);
  });

  test('busca retorna resultados', async ({ page }) => {
    await page.goto('/');
    await page.locator('input[placeholder*="Pesquise"]').fill('Lula');
    await page.getByRole('button', { name: 'Buscar' }).click();
    await expect(page.locator('text=Resultados para:')).toBeVisible();
  });
});
