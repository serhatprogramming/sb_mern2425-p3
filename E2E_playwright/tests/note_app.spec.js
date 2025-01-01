const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Superuser",
        username: "root",
        password: "pass123",
      },
    });
    await page.goto("http://localhost:5173");
  });

  describe("Should open and login", () => {
    test("should front page can be opened", async ({ page }) => {
      const locator = await page.getByText("Notes");
      await expect(locator).toBeVisible();
      await expect(
        page.getByText(
          "Note app, Department of Computer Science, University of Helsinki 2023"
        )
      ).toBeVisible();
    });

    test("should login form opened", async ({ page }) => {
      await page.getByRole("button", { name: "Open Log In Form" }).click();
      await page.getByTestId("username").fill("root");
      await page.getByTestId("password").fill("pass123");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Superuser logged-in")).toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Open Log In Form" }).click();
      await page.getByTestId("username").fill("root");
      await page.getByTestId("password").fill("pass123");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("should a new note be created", async ({ page }) => {
      await page.getByRole("button", { name: "Open New Note Form" }).click();
      await page.getByRole("textbox").fill("a note created by playwright");
      await page.getByRole("button", { name: "save" }).click();
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });
  });
});
