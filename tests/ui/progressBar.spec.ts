import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/homePage'
import { ElementsPage } from '../../page-objects/elementsPage'
import { CommonPage } from '../../page-objects/commonPage'
import { ProgressBarPage } from '../../page-objects/progressBarPage'

test.describe('Progess bar functionality', () => {

    test('TC04 - Verify the progress bar @ui', async ({ page }) => {
        let homePage = new HomePage(page)
        let elementsPage = new ElementsPage(page)
        let commonPage = new CommonPage(page)
        let progressBarPage = new ProgressBarPage(page)

        await homePage.openURL()
        await homePage.validateHomePage()
        await homePage.clickOnCategory('Widgets')
        await commonPage.validateUrlAndHeader('Widgets')
        await elementsPage.clickOnLeftMenu('Progress Bar')
        await expect(commonPage.header).toContainText('Progress Bar')

        await expect(progressBarPage.progressBarField).toHaveAttribute('aria-valuenow','0')
        await expect(progressBarPage.startStopButton).toContainText('Start')
        await progressBarPage.startStopButton.click()
        await expect(progressBarPage.startStopButton).toContainText('Stop')
        await expect(progressBarPage.progressBarField).toHaveAttribute('aria-valuenow','100')
        await expect(progressBarPage.resetBtn).toContainText('Reset')
    })
})