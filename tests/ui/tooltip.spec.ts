import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/homePage'
import { ElementsPage } from '../../page-objects/elementsPage'
import { CommonPage } from '../../page-objects/commonPage'
import { TooltipPage } from '../../page-objects/tooltipPage'

test.describe('Tool tips functionality', () => {

    test('TC05 - Verify the tooltip', async ({ page }) => {
        let homePage = new HomePage(page)
        let elementsPage = new ElementsPage(page)
        let commonPage = new CommonPage(page)
        let tooltipPage = new TooltipPage(page)

        await homePage.openURL()
        await homePage.validateHomePage()
        await homePage.clickOnCategory('Widgets')
        await commonPage.validateUrlAndHeader('Widgets')
        await elementsPage.clickOnLeftMenu('Tool Tips')
        await expect(commonPage.header).toContainText('Tool Tips')

        await tooltipPage.hoverMeBtn.hover()
        await expect(tooltipPage.tooltip).toContainText('You hovered over the Button')
        
    })
})