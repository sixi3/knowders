/**
 * Core functionality test suite for Knowder
 */

import Knowder from '../src/index.js';
import { FactStorage } from '../src/core/factStorage.js';
import { DisplayEngine } from '../src/core/display.js';

describe('Core Functionality Tests', () => {
  let factStorage;
  let displayEngine;

  beforeEach(() => {
    factStorage = new FactStorage();
    displayEngine = new DisplayEngine();
  });

  afterEach(() => {
    if (window.knowder) {
      window.knowder.stop();
    }
  });

  describe('FactStorage', () => {
    test('should initialize with default facts', () => {
      const categories = factStorage.getCategories();
      expect(categories).toContain('general');
      expect(categories).toContain('accountAggregator');
      expect(categories).toContain('identityVerification');
    });

    test('should not repeat facts until all are used', () => {
      const category = 'general';
      const usedFacts = new Set();
      const totalFacts = factStorage.getFactCount(category);

      for (let i = 0; i < totalFacts; i++) {
        const fact = factStorage.getRandomFact(category);
        expect(usedFacts.has(fact)).toBe(false);
        usedFacts.add(fact);
      }

      // After using all facts, should start repeating
      const fact = factStorage.getRandomFact(category);
      expect(usedFacts.has(fact)).toBe(true);
    });

    test('should allow adding custom facts', () => {
      const category = 'custom';
      const facts = ['Custom fact 1', 'Custom fact 2'];
      
      factStorage.addFacts(category, facts);
      expect(factStorage.getFactCount(category)).toBe(2);
      
      const fact = factStorage.getRandomFact(category);
      expect(facts).toContain(fact);
    });
  });

  describe('DisplayEngine', () => {
    test('should create container with correct attributes', () => {
      const container = displayEngine._createContainer();
      expect(container.getAttribute('role')).toBe('status');
      expect(container.getAttribute('aria-live')).toBe('polite');
    });

    test('should show and hide facts with animations', () => {
      const fact = 'Test fact';
      displayEngine.show(fact);
      
      expect(displayEngine.isVisible()).toBe(true);
      expect(displayEngine.c.querySelector('.fact-text').textContent).toBe(fact);
      
      displayEngine.hide();
      expect(displayEngine.isVisible()).toBe(false);
    });

    test('should update configuration correctly', () => {
      const newConfig = {
        fontSize: '20px',
        backgroundColor: 'rgba(0,0,0,.9)'
      };
      
      displayEngine.updateConfig(newConfig);
      const currentConfig = displayEngine.getConfig();
      
      expect(currentConfig.fontSize).toBe('20px');
      expect(currentConfig.backgroundColor).toBe('rgba(0,0,0,.9)');
    });
  });

  describe('Main API', () => {
    test('should initialize with default config', () => {
      const instance = Knowder.init();
      expect(instance).toBeDefined();
    });

    test('should start and stop fact display', async () => {
      Knowder.init();
      Knowder.start();
      expect(document.querySelector('.fact-text')).toBeTruthy();
      Knowder.stop();
      await new Promise(r => setTimeout(r, 350));
      expect(document.querySelector('.fact-text')).toBeFalsy();
    });

    test('should handle invalid configurations gracefully', () => {
      const invalidConfig = {
        duration: 'invalid',
        fontSize: 123
      };
      const instance = Knowder.init(invalidConfig);
      expect(instance).toBeDefined();
    });

    test('should maintain singleton instance', () => {
      const instance1 = Knowder.init();
      const instance2 = Knowder.init({ fontSize: '20px' });
      expect(instance1).toBe(instance2);
    });
  });
}); 