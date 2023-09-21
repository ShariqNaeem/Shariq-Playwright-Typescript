import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/homePage'
import { ElementsPage } from '../../page-objects/elementsPage'
import { CommonPage } from '../../page-objects/commonPage'
import { BrokenImagePage } from '../../page-objects/brokenImagePage'

test.describe('broken image functionality', () => {
    let homePage: HomePage
    let elementsPage: ElementsPage
    let commonPage: CommonPage
    let brokenImagePage: BrokenImagePage


    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        elementsPage = new ElementsPage(page)
        brokenImagePage = new BrokenImagePage(page)
        await homePage.openURL()
        await homePage.validateHomePage()
        await homePage.clickOnCategory('Elements')
        await commonPage.validateUrlAndHeader('Elements')
        await elementsPage.clickOnLeftMenu('Broken Links - Images')
        await commonPage.validateUrlAndHeader('Broken')
    })

    test('TC02 - Verify broken image', async () => {
        const imageSrc = await brokenImagePage.brokenImage.getAttribute('src')
        await brokenImagePage.validateImageBroken(imageSrc)
    })
})