import { test, expect } from '@playwright/test';

test.describe('Match Eleitoral', () => {
  test('página carrega e mostra wizard', async ({ page }) => {
    await page.goto('/match');
    await expect(page.locator('text=Match Eleitoral')).toBeVisible();
    await expect(page.locator('text=Pergunta 1 de 10')).toBeVisible();
  });

  test('fluxo completo: responder 3 perguntas e ver resultados', async ({ page }) => {
    await page.goto('/match');

    // Responde 3 perguntas
    for (let i = 0; i < 3; i++) {
      await page.locator('button', { hasText: 'Concordo muito' }).first().click();
      if (i < 2) {
        await page.locator('button', { hasText: 'Próximo' }).click();
      }
    }

    // Clica em Ver resultados
    await page.locator('button', { hasText: 'Ver resultados' }).click();

    // Espera resultados
    await expect(page.locator('text=Seu perfil político')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Parlamentares mais alinhados')).toBeVisible();
  });

  test('navegação entre perguntas funciona', async ({ page }) => {
    await page.goto('/match');

    await page.locator('button', { hasText: 'Concordo muito' }).first().click();
    await page.locator('button', { hasText: 'Próximo' }).click();

    await page.locator('button', { hasText: 'Anterior' }).click();
    await expect(page.locator('text=Pergunta 1 de 10')).toBeVisible();
  });
});

test.describe('Navegação principal', () => {
  test('header links funcionam', async ({ page }) => {
    await page.goto('/');
    await page.locator('a', { hasText: 'Parlamentares' }).click();
    await expect(page).toHaveURL(/.*parlamentares.*/);
  });

  test('busca retorna resultados', async ({ page }) => {
    await page.goto('/');
    await page.locator('input[placeholder*="Pesquise"]').fill('Lula');
    await page.locator('button', { hasText: 'Buscar' }).click();
    await expect(page.locator('text=Resultados para:')).toBeVisible();
  });
});
