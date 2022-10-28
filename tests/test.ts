import { expect, test } from '@playwright/test'
let pageURL = 'http://localhost:4173/'

test('index page has h1', async ({ page }) => {
  await page.goto('/')
  expect(await page.textContent('h1')).toBe('Welcome to Svead')
})

test('head has canonical', async ({ page }) => {
  await page.goto('/')
  const metaDescription = page.locator('link[rel="canonical"]')
  await expect(metaDescription).toHaveAttribute('href', pageURL)
})

test('head has description', async ({ page }) => {
  await page.goto('/')
  const metaDescription = page.locator('meta[name="description"]')
  await expect(metaDescription).toHaveAttribute(
    'content',
    'Svead, a component that allows you to set head meta information, canonical, title, Twitter and Facebook Open Graph tags.'
  )
})

test('has open graph info', async ({ page }) => {
  await page.goto('/')
  const metaDescription = page.locator('meta[property="og:type"]')
  await expect(metaDescription).toHaveAttribute('content', 'website')
})
