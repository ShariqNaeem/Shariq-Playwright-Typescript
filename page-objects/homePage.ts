import { expect, Locator, Page } from "@playwright/test";


export class HomePage {
    readonly page: Page
    readonly homeContent: Locator

    constructor(page: Page) {
        this.page = page;
        this.homeContent = page.locator('.home-content');
    }

    async openURL() {
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async validateHomePage() {
        const pageTitle = await this.page.title();
        expect(pageTitle).toBe('DEMOQA');
        await expect(this.homeContent).toBeVisible();
    }

    async clickOnCategory(elementName: string) {
        await this.page.locator(`//div[@class="card-body"]/h5[contains(text(),"${elementName}")]`).click();
    }
}