import { expect, Locator, Page } from "@playwright/test"


export class WebTablesPage {
    readonly page: Page
    readonly addNewRecord: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly userEmail: Locator
    readonly age: Locator
    readonly salary: Locator
    readonly department: Locator
    readonly submitBtn: Locator
    readonly searchField: Locator
    readonly secondRowEditBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.addNewRecord = page.locator('#addNewRecordButton')
        this.firstName = page.locator('#firstName')
        this.lastName = page.locator('#lastName')
        this.userEmail = page.locator('#userEmail')
        this.age = page.locator('#age')
        this.salary = page.locator('#salary')
        this.department = page.locator('#department')
        this.department = page.locator('#department')
        this.submitBtn = page.locator('#submit')
        this.searchField = page.locator('#searchBox')
        this.secondRowEditBtn = page.locator('.rt-tbody .rt-tr-group:nth-child(2) .rt-td:nth-child(7) [title="Edit"]');
    }

    async fillRegistrationForm(userDetails: any){
        this.firstName.fill(userDetails.firstName);
        this.lastName.fill(userDetails.lastName);
        this.userEmail.fill(userDetails.email);
        this.age.fill(userDetails.age);
        this.salary.fill(userDetails.salary);
        this.department.fill(userDetails.department);
        this.submitBtn.click();
    }

    async validateTableData(index: number, expectedText: string){
        expect(await this.page.locator(`.rt-tbody .rt-tr-group:first-child .rt-td:nth-child(${index})`)).toHaveText(expectedText)
    }

    async validateUserData(userDetails: any){
        await this.validateTableData(1, userDetails.firstName)
        await this.validateTableData(2, userDetails.lastName)
        await this.validateTableData(3, userDetails.email)
        await this.validateTableData(4, userDetails.age)
        await this.validateTableData(5, userDetails.salary)
        await this.validateTableData(6, userDetails.department)
    }
}