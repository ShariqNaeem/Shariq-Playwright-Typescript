import { expect, Locator, Page } from "@playwright/test"


export class ElementsPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickOnLeftMenu(elementName: string) {
        await this.page.locator(`//span[text()="${elementName}"]`).click()
    }
}