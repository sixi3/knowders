/**
 * Basic browser tests for Knowder
 */

const { test, expect } = require('@playwright/test');

test.describe('Basic Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/docs/example.html');
    // Wait for the library to be loaded
    await page.waitForFunction(() => window.Knowder !== undefined);
    // Ensure <body> exists and is properly set up
    await page.evaluate(() => {
      if (!document.body) {
        document.documentElement.appendChild(document.createElement('body'));
      }
      // Set a default target for Knowder
      window.Knowder.init({
        target: document.body
      });
    });
  });

  test('should initialize and display facts', async ({ page }) => {
    // Initialize Knowder
    await page.evaluate(() => {
      window.Knowder.init();
      window.Knowder.start();
    });

    // Wait for fact to appear
    const factElement = await page.waitForSelector('.fact-text');
    expect(factElement).toBeTruthy();

    // Check fact content
    const factText = await factElement.textContent();
    expect(factText.length).toBeGreaterThan(0);
  });

  test('should handle configuration changes', async ({ page }) => {
    // Initialize with custom config
    await page.evaluate(() => {
      window.Knowder.init({
        fontSize: '20px',
        backgroundColor: 'rgba(0,0,0,.9)'
      });
      window.Knowder.start();
    });

    // Check styles
    const container = await page.waitForSelector('.fact-container');
    const styles = await container.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        fontSize: computed.fontSize,
        backgroundColor: computed.backgroundColor
      };
    });

    expect(styles.fontSize).toBe('20px');
    expect(styles.backgroundColor).toBe('rgba(0, 0, 0, 0.9)');
  });

  test('should respect reduced motion preference', async ({ page }) => {
    // Mock reduced motion preference (no jest.fn)
    await page.evaluate(() => {
      window.matchMedia = query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: function() {},
        removeListener: function() {},
      });
    });

    // Initialize Knowder
    await page.evaluate(() => {
      window.Knowder.init();
      window.Knowder.start();
    });

    // Check transition
    const container = await page.waitForSelector('.fact-container');
    const transition = await container.evaluate(el => 
      window.getComputedStyle(el).transition
    );

    expect(transition).toBe('none');
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Initialize Knowder
    await page.evaluate(() => {
      window.Knowder.init();
      window.Knowder.start();
    });

    // Check tabindex
    const container = await page.waitForSelector('.fact-container');
    const tabindex = await container.getAttribute('tabindex');
    expect(tabindex).toBe('0');

    // Check keyboard focus
    await page.keyboard.press('Tab');
    const isFocused = await container.evaluate(el => 
      document.activeElement === el
    );
    expect(isFocused).toBe(true);
  });

  test('should handle window resize', async ({ page }) => {
    // Initialize Knowder
    await page.evaluate(() => {
      window.Knowder.init();
      window.Knowder.start();
    });

    // Get initial position
    const container = await page.waitForSelector('.fact-container');
    const initialPosition = await container.boundingBox();

    // Resize window
    await page.setViewportSize({ width: 800, height: 600 });

    // Check position update
    const newPosition = await container.boundingBox();
    expect(newPosition).not.toEqual(initialPosition);
  });
}); 