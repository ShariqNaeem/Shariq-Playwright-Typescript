import { expect, Locator, Page } from "@playwright/test"


export class ProgressBarPage {
    readonly page: Page
    readonly startStopButton: Locator
    readonly progressBarField: Locator
    readonly resetBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.startStopButton = page.locator('#startStopButton')
        this.resetBtn = page.locator('#resetButton')
        this.progressBarField = page.locator('div[role="progressbar"]')
    }
}