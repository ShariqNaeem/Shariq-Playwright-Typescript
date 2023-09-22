import { test, expect , Browser} from '@playwright/test'
import { HomePage } from '../../page-objects/homePage'
import { ElementsPage } from '../../page-objects/elementsPage'
import { CommonPage } from '../../page-objects/commonPage'
import { BrokenImagePage } from '../../page-objects/brokenImagePage'

test.describe('broken image functionality', () => {

    test('TC02 - Verify broken image @ui', async ( {browser} ) => {
        let context = await browser.newContext();
        let page = await context.newPage()

        let homePage = new HomePage(page)
        let elementsPage = new ElementsPage(page)
        let  brokenImagePage = new BrokenImagePage(page)
        let commonPage = new CommonPage(page)

        await homePage.openURL()
        await homePage.validateHomePage()
        await homePage.clickOnCategory('Elements')
        await commonPage.validateUrlAndHeader('Elements')
        await elementsPage.clickOnLeftMenu('Broken Links - Images')
        await commonPage.validateUrlAndHeader('Broken')

        const imageSrc = await brokenImagePage.brokenImage.getAttribute('src')
        //await brokenImagePage.validateImageBroken(imageSrc)

        let page2 = await context.newPage()
        await page2.goto('https://demoqa.com'+imageSrc)
        await page2.waitForLoadState('networkidle');
        await expect(page2.locator('body img')).not.toHaveAttribute('src', `https://demoqa.com${imageSrc}`)
    })
})