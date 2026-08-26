import { expect, test, type Page } from "@playwright/test";

/** The overlay menu exists below 768px — the breakpoint, not the device flag.
 *  Playwright reports the iPad as `isMobile`, but at 810px it gets the desktop
 *  header, so every skip here keys off the viewport width instead. */
const isNarrow = (page: Page) => (page.viewportSize()?.width ?? 0) < 768;

/** The off-canvas menu stays mounted so it can slide, so "closed" means
 *  `inert` — out of the tab order and hidden from assistive tech — not
 *  unmounted. That attribute is the real contract, so it is what we assert. */
const overlay = (page: Page) => page.locator("#mobile-menu");

test.describe("navigation", () => {
  test("the header links the three pages and the primary action", async ({
    page,
  }) => {
    await page.goto("/");
    test.skip(isNarrow(page), "The desktop nav is hidden below 768px.");

    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link", { name: "packages" })).toBeVisible();

    await nav.getByRole("link", { name: "portfolio" }).click();
    await expect(page).toHaveURL(/\/take-a-look$/);
    await expect(page.locator("h1")).toHaveText(/Take a Look/i);

    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Inquire" })
      .click();
    await expect(page).toHaveURL(/\/pricing#inquire$/);
  });

  test("the mobile menu opens, navigates and closes", async ({ page }) => {
    await page.goto("/");
    test.skip(!isNarrow(page), "The overlay menu only exists below 768px.");

    await expect(overlay(page)).toHaveAttribute("inert", /.*/);

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(overlay(page)).not.toHaveAttribute("inert", /.*/);

    await page
      .getByRole("navigation", { name: "Mobile" })
      .getByRole("link", { name: "packages" })
      .click();
    await expect(page).toHaveURL(/\/pricing$/);

    // Navigating closes the menu rather than leaving it over the new page.
    await expect(overlay(page)).toHaveAttribute("inert", /.*/);
  });

  test("escape closes the mobile menu", async ({ page }) => {
    await page.goto("/");
    test.skip(!isNarrow(page), "The overlay menu only exists below 768px.");

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(overlay(page)).not.toHaveAttribute("inert", /.*/);

    await page.keyboard.press("Escape");
    await expect(overlay(page)).toHaveAttribute("inert", /.*/);
  });

  test("the inquire pill is reachable on every page", async ({ page }) => {
    for (const path of ["/", "/take-a-look", "/pricing"]) {
      await page.goto(path);
      await expect(
        page.getByRole("link", { name: /Inquire/i }).first(),
      ).toBeVisible();
    }
  });

  test("the FAQ answers open on the home page", async ({ page }) => {
    await page.goto("/");
    const question = page.getByRole("button", { name: /Do you travel\?/i });
    await question.click();
    await expect(
      page.getByText(/travel available for weddings beyond the Pee Dee/i),
    ).toBeVisible();
  });
});
