import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/homePage'
import { ElementsPage } from '../../page-objects/elementsPage'
import { CommonPage } from '../../page-objects/commonPage'
import { DragAndDropPage } from '../../page-objects/dragAndDropPage'

test.describe('Drag and drop functionality', () => {

    test('TC06 - Verify user can drag and drop', async ({ page }) => {
        let homePage = new HomePage(page)
        let elementsPage = new ElementsPage(page)
        let commonPage = new CommonPage(page)
        let dragAndDropPage = new DragAndDropPage(page)

        await homePage.openURL()
        await homePage.validateHomePage()
        await homePage.clickOnCategory('Interaction')
        await commonPage.validateUrlAndHeader('Interaction')
        await elementsPage.clickOnLeftMenu('Droppable')
        await commonPage.validateUrlAndHeader('Droppable')

        await expect(dragAndDropPage.dropHere).toContainText('Drop here')
        await dragAndDropPage.dragMe.dragTo(dragAndDropPage.dropHere);
        await expect(dragAndDropPage.dropHere).toContainText('Dropped!')
    })
})