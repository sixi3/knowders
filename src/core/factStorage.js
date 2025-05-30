/**
 * FactStorage - Manages fact storage and retrieval
 * Optimized for memory usage and performance
 */

import { DEFAULT_FACTS } from '../data/defaultFacts.js';

export class FactStorage {
  constructor() {
    this.f = new Map(); // facts
    this.u = new Map(); // used facts
    this._init();
  }

  /**
   * Initialize facts from default database
   * @private
   */
  _init() {
    for (const [k, v] of Object.entries(DEFAULT_FACTS)) {
      this.f.set(k, [...v]);
      this.u.set(k, new Set());
    }
  }

  /**
   * Add new facts to a category
   * @param {string} k - Category name
   * @param {string[]} v - Array of facts
   */
  addFacts(k, v) {
    if (!Array.isArray(v)) return;
    
    if (!this.f.has(k)) {
      this.f.set(k, []);
      this.u.set(k, new Set());
    }
    
    this.f.get(k).push(...v);
  }

  /**
   * Get a random fact from a category
   * @param {string} k - Category name
   * @returns {string|null} Random fact or null if none available
   */
  getRandomFact(k) {
    const f = this.f.get(k);
    const u = this.u.get(k);
    
    if (!f || !f.length) return null;
    
    // If all facts have been used, reset used facts
    if (u.size >= f.length) {
      u.clear();
    }
    
    // Get random unused fact
    let x;
    do {
      x = f[Math.floor(Math.random() * f.length)];
    } while (u.has(x));
    
    u.add(x);
    return x;
  }

  /**
   * Get available categories
   * @returns {string[]} Array of category names
   */
  getCategories() {
    return Array.from(this.f.keys());
  }

  /**
   * Get fact count for a category
   * @param {string} k - Category name
   * @returns {number} Number of facts
   */
  getFactCount(k) {
    return this.f.get(k)?.length || 0;
  }

  /**
   * Clear used facts for a category
   * @param {string} k - Category name
   */
  clearUsedFacts(k) {
    this.u.get(k)?.clear();
  }
} 