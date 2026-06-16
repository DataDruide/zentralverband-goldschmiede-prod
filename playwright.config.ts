import { defineConfig, devices } from "@playwright/test";

/**
 * Visual-Regression-Tests für Cookie-Banner und Hero.
 * Baselines liegen in tests/visual/__screenshots__/.
 * Update mit:  bunx playwright test --update-snapshots
 */
export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "retain-on-failure",
  },
  expect: {
    toHaveScreenshot: {
      // 0.2 % Pixel-Toleranz – fängt echte Layout-Brüche, ignoriert AA-Rauschen.
      maxDiffPixelRatio: 0.002,
      animations: "disabled",
    },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "tablet",  use: { ...devices["iPad (gen 7)"] } },
    { name: "mobile",  use: { ...devices["iPhone 13"] } },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : { command: "bun run start", port: 3000, reuseExistingServer: !process.env.CI, timeout: 120_000 },
});
