import { expect, Locator, Page } from "@playwright/test";


export class SportsPage {
    readonly page: Page
    readonly SportsContent: Locator

    constructor(page: Page) {
        this.page = page;
        this.SportsContent = page.locator('[data-testid="category-lobby-tab-button"]');
    }

    async openURL() {
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async validateSportsPage() {
        const pageTitle = await this.page.title();
        expect(pageTitle).toBe('Epicbet - Your favorite sportsbook.');
        await expect(this.SportsContent).toBeVisible();
    }
}