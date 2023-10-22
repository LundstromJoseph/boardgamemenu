import { expect, test } from '@playwright/test'
import { data as collectionData } from './collection.xml'
import { data as boardgamesData } from './boardgames.xml'

test.beforeEach(async ({ context }) => {
	await context.route('*/**/collection', (route) => route.abort())
})

test.afterEach(async ({ page }, testInfo) => {
	if (testInfo.status !== testInfo.expectedStatus) {
		// Get a unique place for the screenshot.
		const screenshotPath = testInfo.outputPath(`failure.png`)
		// Add it to the report.
		testInfo.attachments.push({
			name: 'screenshot',
			path: screenshotPath,
			contentType: 'image/png'
		})
		// Take the screenshot itself.
		await page.screenshot({ path: screenshotPath, timeout: 5000 })
	}
})

test('Load games', async ({ page }) => {
	await page.route(/.*boardgamegeek.*collection.*/, async (route) => {
		await route.fulfill({ body: collectionData, contentType: 'text/xml' })
	})

	await page.route(/.*boardgamegeek.*thing.*/, async (route) => {
		await route.fulfill({ body: boardgamesData, contentType: 'text/xml' })
	})

	await page.goto('/list/testuser', { waitUntil: 'networkidle' })
	await expect(page.getByText('CODENAMES')).toBeVisible()
})

test('Change player amount', async ({ page }) => {
	await page.route(/.*boardgamegeek.*collection.*/, async (route) => {
		await route.fulfill({ body: collectionData, contentType: 'text/xml' })
	})

	await page.route(/.*boardgamegeek.*thing.*/, async (route) => {
		await route.fulfill({ body: boardgamesData, contentType: 'text/xml' })
	})

	await page.goto('/list/testuser', { waitUntil: 'networkidle' })
	await expect(page.getByText('CODENAMES')).toBeVisible()

	await page.getByLabel('filters-menu', { exact: true }).click()

	await expect(page.getByLabel('Set player count to 1', { exact: true })).toBeVisible()

	await page.getByLabel('Set player count to 1', { exact: true }).click()

	await expect(page.getByText('CODENAMES')).not.toBeVisible()
	await expect(page.getByText('WINGSPAN')).toBeVisible()
})
