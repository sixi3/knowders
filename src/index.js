/**
 * Knowder - A lightweight library for displaying engaging facts during loading states
 * @module Knowder
 */

import { FactLoader } from './core/factLoader.js';

// Create singleton instance
const knowder = new FactLoader();

// Create public API
const Knowder = {
  /**
   * Initialize Knowder with configuration options
   * @param {Object} options - Configuration options
   * @returns {Object} Knowder API
   */
  init(options) {
    knowder.init(options);
    return this;
  },

  /**
   * Start displaying facts from a category
   * @param {string} category - Category to display facts from
   * @returns {Object} Knowder API
   */
  start(category) {
    knowder.start(category);
    return this;
  },

  /**
   * Stop displaying facts
   * @returns {Object} Knowder API
   */
  stop() {
    knowder.stop();
    return this;
  },

  /**
   * Add custom facts to a category
   * @param {string} category - Category to add facts to
   * @param {string[]} facts - Array of facts to add
   * @returns {Object} Knowder API
   */
  addFacts(category, facts) {
    knowder.addFacts(category, facts);
    return this;
  },

  /**
   * Get available categories
   * @returns {string[]} Array of category names
   */
  getCategories() {
    return knowder.getCategories();
  }
};

// Export for both ESM and UMD
export default Knowder; 