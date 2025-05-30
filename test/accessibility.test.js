/**
 * Accessibility test suite for Knowder
 */

import Knowder from '../src/index.js';
import { DisplayEngine } from '../src/core/display.js';

describe('Accessibility Tests', () => {
  let displayEngine;

  beforeEach(() => {
    displayEngine = new DisplayEngine();
  });

  afterEach(() => {
    if (window.knowder) {
      window.knowder.stop();
    }
  });

  describe('ARIA Attributes', () => {
    test('should have correct ARIA attributes on container', () => {
      const container = displayEngine._createContainer();
      
      expect(container.getAttribute('role')).toBe('status');
      expect(container.getAttribute('aria-live')).toBe('polite');
      expect(container.getAttribute('aria-label')).toBe('Loading fact');
    });

    test('should update ARIA attributes when showing fact', () => {
      const fact = 'Test fact';
      displayEngine.show(fact);
      
      const container = displayEngine.c;
      expect(container.getAttribute('aria-label')).toBe('Loading fact');
      expect(container.querySelector('.fact-text').textContent).toBe(fact);
    });
  });

  describe('Reduced Motion', () => {
    test('should respect prefers-reduced-motion media query', () => {
      // Mock prefers-reduced-motion: reduce
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }));

      displayEngine = new DisplayEngine();
      const container = displayEngine._createContainer();
      
      // Should have no transition duration when reduced motion is preferred
      expect(container.style.transition).toBe('none');
    });

    test('should have smooth transitions when reduced motion is not preferred', () => {
      // Mock prefers-reduced-motion: no-preference
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }));

      displayEngine = new DisplayEngine();
      const container = displayEngine._createContainer();
      
      // Should have transition duration when reduced motion is not preferred
      expect(container.style.transition).toContain('0.3s');
    });
  });

  describe('Keyboard Navigation', () => {
    test('should be keyboard accessible', () => {
      Knowder.init();
      Knowder.start();
      
      const container = document.querySelector('.fact-container');
      expect(container).toBeTruthy();
      
      // Container should be in tab order
      expect(container.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Color Contrast', () => {
    test('should maintain WCAG 2.1 AA contrast ratio', () => {
      const container = displayEngine._createContainer();
      const computedStyle = window.getComputedStyle(container);
      
      // Get background and text colors
      const bgColor = computedStyle.backgroundColor;
      const textColor = computedStyle.color;
      
      // Convert colors to RGB
      const bgRGB = bgColor.match(/\d+/g).map(Number);
      const textRGB = textColor.match(/\d+/g).map(Number);
      
      // Calculate relative luminance
      const getLuminance = (rgb) => {
        const [r, g, b] = rgb.map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      
      const bgLuminance = getLuminance(bgRGB);
      const textLuminance = getLuminance(textRGB);
      
      // Calculate contrast ratio
      const lighter = Math.max(bgLuminance, textLuminance);
      const darker = Math.min(bgLuminance, textLuminance);
      const contrastRatio = (lighter + 0.05) / (darker + 0.05);
      
      // WCAG 2.1 AA requires contrast ratio of at least 4.5:1 for normal text
      expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Screen Reader Compatibility', () => {
    test('should announce facts to screen readers', () => {
      const fact = 'Test fact';
      displayEngine.show(fact);
      
      const container = displayEngine.c;
      const factText = container.querySelector('.fact-text');
      
      // Fact text should be visible to screen readers
      expect(factText.getAttribute('aria-hidden')).not.toBe('true');
      
      // Container should announce changes
      expect(container.getAttribute('aria-live')).toBe('polite');
    });
  });
}); 