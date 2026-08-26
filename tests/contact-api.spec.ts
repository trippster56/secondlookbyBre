import { expect, test } from "@playwright/test";

const valid = {
  name: "Anna Whitfield",
  email: "anna@example.com",
  message: "We're getting married in April and would love to talk.",
};

test.describe("/api/contact", () => {
  test("accepts a complete enquiry", async ({ request }) => {
    const response = await request.post("/api/contact", { data: valid });
    expect(response.status()).toBe(200);
    expect((await response.json()).success).toBe(true);
  });

  test("rejects a missing name, email or message", async ({ request }) => {
    for (const field of ["name", "email", "message"] as const) {
      const data = { ...valid, [field]: "" };
      const response = await request.post("/api/contact", { data });
      expect(response.status(), `missing ${field}`).toBe(400);
    }
  });

  test("rejects a malformed email address", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: { ...valid, email: "not-an-address" },
    });
    expect(response.status()).toBe(400);
  });

  test("rejects an over-long message", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: { ...valid, message: "x".repeat(5001) },
    });
    expect(response.status()).toBe(400);
  });

  test("silently accepts and discards a bot submission", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: { ...valid, company: "spam-bot" },
    });
    expect(response.status()).toBe(200);
  });
});
