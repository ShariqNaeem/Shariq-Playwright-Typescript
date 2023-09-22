import { Locator, Page } from "@playwright/test"


export class DragAndDropPage {
    readonly page: Page
    readonly dragMe: Locator
    readonly dropHere: Locator

    constructor(page: Page) {
        this.page = page
        this.dragMe = page.locator('#simpleDropContainer #draggable')
        this.dropHere = page.locator('#simpleDropContainer #droppable')
    }
}