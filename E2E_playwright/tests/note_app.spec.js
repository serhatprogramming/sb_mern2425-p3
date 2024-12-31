const { test, expect, describe } = require("@playwright/test");

describe("Note app", () => {
  test("should front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2023"
      )
    ).toBeVisible();
  });

  test("should login form opened", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.getByRole("button", { name: "Open Log In Form" }).click();
    await page.getByTestId("username").fill("root");
    await page.getByTestId("password").fill("pass123");
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("Superuser logged-in")).toBeVisible();
  });
});
