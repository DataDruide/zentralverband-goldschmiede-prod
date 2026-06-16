import { test, expect } from "@playwright/test";

const KEY = "zv-cookie-consent-v1";

test.describe("Cookie-Banner", () => {
  test.beforeEach(async ({ context }) => {
    // Sicherstellen, dass Banner sichtbar ist.
    await context.addInitScript((k) => {
      try { localStorage.removeItem(k); } catch { /* ignore */ }
    }, KEY);
  });

  test("Banner sichtbar auf Startseite, verdeckt keinen Hero-CTA", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: /Datenschutz/i });
    await expect(banner).toBeVisible();
    await expect(banner).toHaveScreenshot("cookie-banner.png");

    // Primärer Hero-CTA muss klickbar bleiben (kein Overlap).
    const cta = page.getByRole("link", { name: /Über den Verband/i }).first();
    await expect(cta).toBeVisible();
    await expect(async () => {
      const box = await cta.boundingBox();
      const banBox = await banner.boundingBox();
      if (!box || !banBox) throw new Error("missing box");
      const overlap = !(box.y + box.height < banBox.y || box.y > banBox.y + banBox.height);
      expect(overlap, "Hero-CTA darf nicht vom Cookie-Banner überlagert werden").toBe(false);
    }).toPass();
  });

  test("Tastaturbedienung: Escape lehnt ab, Fokus startet auf 'Allen zustimmen'", async ({ page }) => {
    await page.goto("/");
    const accept = page.getByRole("button", { name: /Allen Cookies/i });
    await expect(accept).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
