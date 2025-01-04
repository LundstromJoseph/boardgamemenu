import { expect, test } from '@playwright/test'
import { data as boardgamesData } from './boardgames.xml'
import { data as collectionData } from './collection.xml'

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

	await page.getByLabel('open-side-menu', { exact: true }).click()

	await expect(page.getByRole('slider').first()).toBeVisible()

	const slider = page.getByRole('slider').first()

	await slider.hover()
	const sliderBoundingBox = await slider.boundingBox()
	if (!sliderBoundingBox) {
		throw new Error('Slider bounding box not found')
	}
	await page.mouse.down()
	for (let i = 0; i < 100; i++) {
		if ((await slider.getAttribute('aria-valuenow')) === '1') {
			break
		}
		await page.mouse.move(sliderBoundingBox.x + i, 0)
	}
	await page.mouse.up()

	await expect(page.getByText('CODENAMES')).not.toBeVisible()
	await expect(page.getByText('WINGSPAN')).toBeVisible()
})
