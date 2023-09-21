import { expect, Locator, Page } from "@playwright/test";
import path from 'path';

export class PractiseFormPage {
    readonly page: Page
    readonly firstName: Locator
    readonly lastName: Locator
    readonly email: Locator
    readonly maleRadioBtn: Locator
    readonly mobile: Locator
    readonly dateOfBirth: Locator
    readonly monthDropdown: Locator
    readonly yearDropdown: Locator
    readonly subject: Locator
    readonly uploadPicture: Locator
    readonly currentAddress: Locator
    readonly submitBtn: Locator

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('#firstName')
        this.lastName = page.locator('#lastName')
        this.email = page.locator('#userEmail')
        this.mobile = page.locator('#userNumber')
        this.dateOfBirth = page.locator('#dateOfBirthInput')
        this.monthDropdown = page.locator('select.react-datepicker__month-select')
        this.yearDropdown = page.locator('select.react-datepicker__year-select')
        this.subject = page.locator('#subjectsWrapper input')
        this.uploadPicture = page.locator('#uploadPicture')
        this.currentAddress = page.locator('#currentAddress')
        this.submitBtn = page.locator('#submit')
    }

    async selectGender(gender: string) {
        await this.page.locator(`//div[@id="genterWrapper"]//label[contains(text(),"${gender}")]`).click()
    }

    async selectHobby(hobby: string) {
        await this.page.locator(`//label[contains(text(),"${hobby}")]`).click()
    }

    async setDateOfBirth(date: string, month: string, year: string) {
        await this.dateOfBirth.click()
        await this.monthDropdown.selectOption({ label: month })
        await this.yearDropdown.selectOption({ label: year })
        await this.page.locator(`//div[@class="react-datepicker__week"]/div[contains(text(),"${date}")]`).click()
    }

    async setSubject(subject: string) {
        await this.subject.fill(subject)
        await this.page.waitForTimeout(1000)
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('Enter')
    }

    async setStateAndCity(state: string, city: string) {
        await this.page.locator('#stateCity-wrapper>div:nth-child(2) input').fill(state)
        await this.page.waitForTimeout(1000)
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('Enter')
        await this.page.locator('#stateCity-wrapper>div:nth-child(3) input').fill(city)
        await this.page.waitForTimeout(1000)
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('Enter')
    }

    async uploadFile(fileName: string) {
        await this.uploadPicture.setInputFiles(path.join(__dirname, `../resources/images/${fileName}`))
    }

    async validateModalData(index: number, expectedText: string) {
        await expect(this.page.locator(`.table-responsive tr:nth-child(${index}) td:last-child`)).toContainText(expectedText)
    }

    async validateStudentData(studentDetails: any) {
        await this.validateModalData(1, studentDetails.firstName + ' ' + studentDetails.lastName)
        await this.validateModalData(2, studentDetails.email)
        await this.validateModalData(3, studentDetails.gender)
        await this.validateModalData(4, studentDetails.mobile)
        await this.validateModalData(5, studentDetails.date + ' ' + studentDetails.month + ',' + studentDetails.year)
        await this.validateModalData(6, studentDetails.subject)
        await this.validateModalData(7, studentDetails.hobbies)
        await this.validateModalData(8, studentDetails.fileName)
        await this.validateModalData(9, studentDetails.currentAddress)
        await this.validateModalData(10, studentDetails.state + ' ' + studentDetails.city)
    }
}