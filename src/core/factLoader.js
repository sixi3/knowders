/**
 * FactLoader - Main API class for Knowder
 * Coordinates fact storage and display
 */

import { FactStorage } from './factStorage.js';
import { DisplayEngine } from './display.js';

export class FactLoader {
  constructor(config = {}) {
    this._storage = new FactStorage();
    this._display = new DisplayEngine(config);
    this._interval = null;
    this._currentCategory = null;
    this._config = {
      interval: 3000,
      ...config
    };
  }

  /**
   * Initialize the fact loader
   * @param {Object} options - Configuration options
   * @returns {FactLoader} Instance for chaining
   */
  init(options = {}) {
    this._config = { ...this._config, ...options };
    this._display.updateConfig(this._config);
    return this;
  }

  /**
   * Start displaying facts from a category
   * @param {string} category - Category to display facts from
   * @returns {FactLoader} Instance for chaining
   */
  start(category = 'general') {
    // Always stop current display before starting new one
    this.stop();

    this._currentCategory = category;
    
    // Show first fact immediately
    const fact = this._storage.getRandomFact(category);
    if (fact) {
      this._display.show(fact);
    }

    // Set up interval for subsequent facts
    this._interval = setInterval(() => {
      const nextFact = this._storage.getRandomFact(category);
      if (nextFact) {
        this._display.updateFact(nextFact);
      }
    }, this._config.interval);

    return this;
  }

  /**
   * Stop displaying facts
   * @returns {FactLoader} Instance for chaining
   */
  stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
    this._display.hide();
    this._currentCategory = null;
    return this;
  }

  /**
   * Add custom facts to a category
   * @param {string} category - Category to add facts to
   * @param {string[]} facts - Array of facts to add
   * @returns {FactLoader} Instance for chaining
   */
  addFacts(category, facts) {
    this._storage.addFacts(category, facts);
    return this;
  }

  /**
   * Get available categories
   * @returns {string[]} Array of category names
   */
  getCategories() {
    return this._storage.getCategories();
  }

  /**
   * Get current configuration
   * @returns {Object} Current configuration
   */
  getConfig() {
    return {
      ...this._config,
      display: this._display.getConfig()
    };
  }

  /**
   * Update configuration
   * @param {Object} newConfig - New configuration options
   * @returns {FactLoader} Instance for chaining
   */
  updateConfig(newConfig) {
    this._config = { ...this._config, ...newConfig };
    this._display.updateConfig(newConfig);
    return this;
  }

  /**
   * Check if facts are currently being displayed
   * @returns {boolean} Display state
   */
  isActive() {
    return this._interval !== null;
  }

  /**
   * Get current category
   * @returns {string|null} Current category name
   */
  getCurrentCategory() {
    return this._currentCategory;
  }
} 