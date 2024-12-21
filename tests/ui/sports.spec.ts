import { test, expect } from '@playwright/test'
import { SportsPage } from '../../page-objects/sportsPage'
import testData from '../../test-data/file1.json'

test.describe('user flow functionality', () => {
    let sportsPage: SportsPage


    test.beforeEach(async ({ page }) => {
        sportsPage = new SportsPage(page)
        
        await sportsPage.openURL()
        await sportsPage.validateSportsPage()
    })

    test('Ensure that users can successfully place bets on various sports events without authentication.', async () => {
    })

    test('Verify that the displayed odds for sports events are accurate and formatted correctly.', async () => {
    })

})