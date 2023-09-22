import { expect, Locator, Page } from "@playwright/test";


export class BrokenImagePage {
    readonly page: Page
    readonly brokenImage: Locator

    constructor(page: Page) {
        this.page = page;
        this.brokenImage = page.locator('//p[contains(text(),"Broken image")]/following-sibling::img');
    }

    async validateImageBroken(imageSrc: any){
        const response = await this.page.request.get('https://demoqa.com' + imageSrc)
        expect.soft(response.status()).toBe(200)
    }
}