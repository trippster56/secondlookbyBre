import { expect, test } from "@playwright/test";

test.describe("take a look", () => {
  test("the gallery renders tiles, each with alt text", async ({ page }) => {
    await page.goto("/take-a-look");

    // The stills grid only — the reels feed above it is Instagram's covers,
    // which are decorative inside a labelled play button.
    const images = page.locator('[data-testid="stills-grid"] img');
    const count = await images.count();

    if (count === 0) {
      // The empty-safe path: while there is no work to show, the page says so
      // rather than rendering a broken grid.
      await expect(page.getByText(/being edited right now/i)).toBeVisible();
      return;
    }

    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      await expect(images.nth(i)).toHaveAttribute("alt", /.{10,}/);
    }
  });

  test("the page closes with the site's one primary action", async ({ page }) => {
    await page.goto("/take-a-look");
    const cta = page.getByRole("link", { name: /Inquire about your date/i });
    await expect(cta.last()).toBeVisible();
  });
});
