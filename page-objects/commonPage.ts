import { expect, Locator, Page } from "@playwright/test"


export class CommonPage {
    readonly page: Page
    readonly header: Locator

    constructor(page: Page) {
        this.page = page
        this.header = page.locator('div.main-header')
    }

    async validateUrlAndHeader(text: string) {
        const currentURL = this.page.url();
        expect(currentURL).toContain(text.toLowerCase().replace(/\s/g,''))
        await expect(this.header).toHaveText(text)
    }
};