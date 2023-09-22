import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/homePage'
import { ElementsPage } from '../../page-objects/elementsPage'
import { CommonPage } from '../../page-objects/commonPage'
import { PractiseFormPage } from '../../page-objects/practiseFormPage'
import studentData from '../../test-data/studentRegistration.json'


test.describe('Form submission functionality', () => {

    test.use({
        viewport: { width: 1600, height: 1200 },
    });

    test('TC03 - Verify user can submit the form @ui', async ({ page }) => {
        let homePage = new HomePage(page)
        let elementsPage = new ElementsPage(page)
        let commonPage = new CommonPage(page)
        let practiseFormPage = new PractiseFormPage(page)

        await homePage.openURL()
        await homePage.validateHomePage()
        await homePage.clickOnCategory('Forms')
        await commonPage.validateUrlAndHeader('Forms')
        await elementsPage.clickOnLeftMenu('Practice Form')
        await expect(commonPage.header).toContainText('Practice Form')

        await practiseFormPage.firstName.fill(studentData.firstName)
        await practiseFormPage.lastName.fill(studentData.lastName)
        await practiseFormPage.email.fill(studentData.email)
        await practiseFormPage.selectGender(studentData.gender)
        await practiseFormPage.mobile.fill(studentData.mobile)
        await practiseFormPage.setDateOfBirth(studentData.date, studentData.month, studentData.year)
        await practiseFormPage.setSubject(studentData.subject)
        await practiseFormPage.selectHobby(studentData.hobbies)
        await practiseFormPage.uploadFile(studentData.fileName)
        await practiseFormPage.currentAddress.fill(studentData.currentAddress)
        await practiseFormPage.setStateAndCity(studentData.state, studentData.city)
        await practiseFormPage.submitBtn.click()
        await practiseFormPage.validateStudentData(studentData)
    })
})