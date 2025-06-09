/**
 * FactStorage - Manages fact storage and retrieval
 * Optimized for minimal memory usage and efficient access
 */

import coreFacts from '../data/coreFacts';

export class FactStorage {
  constructor() {
    this.customFacts = new Map();
    this.initialized = false;
  }

  /**
   * Initialize the fact storage
   * @returns {void}
   */
  init() {
    if (this.initialized) return;
    
    // Initialize custom facts map
    this.customFacts = new Map();
    this.initialized = true;
  }

  /**
   * Get a random fact from a specific category
   * @param {string} category - The fact category
   * @returns {string} A random fact
   */
  getRandomFact(category = 'general') {
    if (!this.initialized) this.init();

    try {
      // Check if we have custom facts for this category
      const customFacts = this.customFacts.get(category);
      if (customFacts && customFacts.length > 0) {
        return customFacts[Math.floor(Math.random() * customFacts.length)];
      }

      // Fall back to core facts
      const fact = coreFacts.getRandomFact(category);
      if (!fact) {
        console.warn(`No facts available for category: ${category}`);
        return 'Loading...';
      }
      return fact;
    } catch (error) {
      console.warn('Error getting random fact:', error);
      return 'Loading...';
    }
  }

  /**
   * Add custom facts to a category
   * @param {string} category - The fact category
   * @param {string[]} facts - Array of facts to add
   * @returns {void}
   */
  addFacts(category, facts) {
    if (!this.initialized) this.init();
    
    if (!Array.isArray(facts)) {
      throw new Error('Facts must be an array');
    }

    // Validate facts
    facts.forEach(fact => {
      if (typeof fact !== 'string' || fact.length === 0) {
        throw new Error('Each fact must be a non-empty string');
      }
    });

    // Add facts to custom facts map
    const existingFacts = this.customFacts.get(category) || [];
    this.customFacts.set(category, [...existingFacts, ...facts]);
  }

  /**
   * Get all available categories
   * @returns {string[]} Array of category names
   */
  getCategories() {
    if (!this.initialized) this.init();
    
    // Combine core and custom categories
    const categories = new Set([
      ...coreFacts.getCategories(),
      ...this.customFacts.keys()
    ]);
    
    return Array.from(categories);
  }

  /**
   * Get all facts for a specific category
   * @param {string} category - The fact category
   * @returns {string[]} Array of facts
   */
  getFacts(category = 'general') {
    if (!this.initialized) this.init();
    
    // Combine core and custom facts
    const coreFactsList = coreFacts.getFacts(category);
    const customFactsList = this.customFacts.get(category) || [];
    
    return [...coreFactsList, ...customFactsList];
  }

  /**
   * Reset fact rotation for a specific category
   * @param {string} category - The fact category
   * @returns {void}
   */
  resetRotation(category = 'general') {
    if (!this.initialized) this.init();
    
    coreFacts.resetRotation(category);
  }
} 