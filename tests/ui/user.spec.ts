import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/homePage'
import { ElementsPage } from '../../page-objects/elementsPage'
import { CommonPage } from '../../page-objects/commonPage'
import { WebTablesPage } from '../../page-objects/webTables'
import registerdata from '../../test-data/registration.json'

test.describe('user flow functionality', () => {
    let homePage: HomePage
    let elementsPage: ElementsPage
    let commonPage: CommonPage
    let webTablesPage: WebTablesPage


    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        elementsPage = new ElementsPage(page)
        webTablesPage = new WebTablesPage(page)
        commonPage = new CommonPage(page)
        
        await homePage.openURL()
        await homePage.validateHomePage()
        await homePage.clickOnCategory('Elements')
        await commonPage.validateUrlAndHeader('Elements')
        await elementsPage.clickOnLeftMenu('Web Tables')
        await commonPage.validateUrlAndHeader('Web Tables')
    })

    test('TC01- Scenario A - Verify user can enter new data into the table @ui', async () => {
        await webTablesPage.addNewRecord.click()
        await webTablesPage.fillRegistrationForm(registerdata)
        await webTablesPage.searchField.fill(registerdata.email)
        await webTablesPage.validateUserData(registerdata)
    })

    test('TC01- Scenario B - Verify user can edit the row in a table @ui', async () => {
        const updatedFirstName = registerdata.updatedFirstName
        const updatedLasttName = registerdata.updatedLastName

        await webTablesPage.secondRowEditBtn.click()
        await webTablesPage.firstName.clear()
        await webTablesPage.firstName.fill(updatedFirstName)
        await webTablesPage.lastName.clear()
        await webTablesPage.lastName.fill(updatedLasttName)
        await webTablesPage.submitBtn.click()

        await webTablesPage.searchField.fill(updatedFirstName)
        await webTablesPage.validateTableData(1, updatedFirstName)
        await webTablesPage.validateTableData(2, updatedLasttName)
    })

})