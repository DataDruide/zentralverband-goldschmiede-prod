import { test, expect } from "@playwright/test";

test("Hero-Bereich Startseite", async ({ page }) => {
  // Cookie-Banner für stabile Baseline akzeptieren.
  await page.addInitScript(() => {
    try { localStorage.setItem("zv-cookie-consent-v1", "all"); } catch { /* ignore */ }
  });
  await page.goto("/");
  const hero = page.locator("section").first();
  await expect(hero).toBeVisible();
  await expect(hero).toHaveScreenshot("hero.png");
});
