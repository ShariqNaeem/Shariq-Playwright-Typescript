import { Locator, Page } from "@playwright/test"


export class TooltipPage {
    readonly page: Page
    readonly hoverMeBtn: Locator
    readonly tooltip: Locator

    constructor(page: Page) {
        this.page = page
        this.hoverMeBtn = page.locator('#toolTipButton')
        this.tooltip = page.locator('div[role="tooltip"]')
    }
}