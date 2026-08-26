import { expect, test, type Page } from "@playwright/test";

/**
 * Type into a field and make sure the value stuck.
 *
 * The form is a controlled React island: a `fill()` that lands before
 * hydration writes to the DOM and is then overwritten when React takes over,
 * which is exactly what happened intermittently on the tablet project. Filling
 * inside `toPass` retries until the value survives.
 */
async function fillField(page: Page, label: string, value: string) {
  const field = page.getByLabel(label);
  await expect(async () => {
    await field.fill(value);
    await expect(field).toHaveValue(value, { timeout: 500 });
  }).toPass({ timeout: 10_000 });
}

/** Fill the required fields. The optional ones are exercised separately. */
async function fillRequired(page: Page) {
  await fillField(page, "Name *", "Anna Whitfield");
  await fillField(page, "Email *", "anna@example.com");
  await fillField(
    page,
    "Tell me about your wedding! *",
    "April 2027, about 140 guests, getting ready at the venue.",
  );
}

test.describe("inquiry form", () => {
  test("a completed enquiry reports success", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      }),
    );

    await page.goto("/pricing");
    await fillRequired(page);
    await page.getByRole("button", { name: "Send my enquiry" }).click();

    await expect(page.getByRole("status")).toContainText(/on its way/i);
    // A successful send clears the form, so the page is ready for the next one.
    await expect(page.getByLabel("Name *")).toHaveValue("");
  });

  test("a failed send tells the visitor how else to reach Bre", async ({
    page,
  }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal server error." }),
      }),
    );

    await page.goto("/pricing");
    await fillRequired(page);
    await page.getByRole("button", { name: "Send my enquiry" }).click();

    await expect(page.getByRole("status")).toContainText(/@/);
    // The typed enquiry survives the failure — nothing is lost.
    await expect(page.getByLabel("Name *")).toHaveValue("Anna Whitfield");
  });

  test("the form will not submit without the required fields", async ({
    page,
  }) => {
    let posted = false;
    await page.route("**/api/contact", (route) => {
      posted = true;
      return route.fulfill({ status: 200, body: "{}" });
    });

    await page.goto("/pricing");
    await page.getByRole("button", { name: "Send my enquiry" }).click();
    await page.waitForTimeout(300);

    expect(posted).toBe(false);
  });

  test("the wedding date picker takes a date and closes the past off", async ({
    page,
  }) => {
    await page.goto("/pricing");

    // Base UI ties the label to the control, so the trigger answers to its
    // field label rather than the placeholder text it displays.
    const trigger = page.getByLabel("Wedding date");
    await expect(trigger).toHaveText(/Select a date/i);
    await trigger.click();

    const grid = page.getByRole("grid");
    await expect(grid).toBeVisible();

    // The past is closed off: there is no navigating back past this month,
    // and days already gone are not selectable.
    await expect(
      page.getByRole("button", { name: /Previous Month/i }),
    ).toBeDisabled();

    const available = page.locator(
      '[data-day]:not([data-disabled="true"]) button',
    );
    await expect(available.first()).toBeEnabled();
    await available.first().click();

    // The popover closes and the trigger now reads the chosen date.
    await expect(grid).toBeHidden();
    await expect(trigger).not.toHaveText(/Select a date/i);
  });
});
