/**
 * @jest-environment jsdom
 */

import Knowder from '../src/index.js';

describe('Knowder Library', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Cleanup after each test
    Knowder.stop();
  });

  describe('Initialization', () => {
    test('should initialize with default config', () => {
      const result = Knowder.init();
      expect(result).toBeDefined();
      expect(typeof result.start).toBe('function');
      expect(typeof result.stop).toBe('function');
    });

    test('should initialize with custom options', () => {
      const options = {
        duration: 5000,
        category: 'science'
      };
      
      const result = Knowder.init(options);
      expect(result).toBeDefined();
    });

    test('should be chainable', () => {
      const result = Knowder.init().start();
      expect(result).toBeDefined();
    });
  });

  describe('API Methods', () => {
    test('should have init method', () => {
      expect(typeof Knowder.init).toBe('function');
    });

    test('should have start method', () => {
      expect(typeof Knowder.start).toBe('function');
    });

    test('should have stop method', () => {
      expect(typeof Knowder.stop).toBe('function');
    });

    test('should not throw when stopping without initialization', () => {
      expect(() => {
        Knowder.stop();
      }).not.toThrow();
    });
  });

  describe('Browser Global', () => {
    test('should expose Knowder globally in browser', () => {
      // Test that the global assignment works
      expect(typeof window.Knowder).toBe('object');
      expect(typeof window.Knowder.init).toBe('function');
    });
  });

  describe('Bundle Size', () => {
    test('should be lightweight', () => {
      // This test ensures we're thinking about bundle size
      const knowderString = JSON.stringify(Knowder);
      expect(knowderString.length).toBeLessThan(1000); // Arbitrary small size for basic API
    });
  });
}); 