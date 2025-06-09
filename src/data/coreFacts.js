/**
 * Core facts for Knowder library
 * Optimized for minimal bundle size and efficient access
 */

// Using a Map for O(1) lookups and efficient memory usage
const coreFacts = new Map([
  ['general', [
    'The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after just 38 minutes.',
    'A day on Venus is longer than its year. Venus takes 243 Earth days to rotate on its axis but only 225 Earth days to orbit the Sun.',
    'The first oranges weren\'t orange. The original oranges from Southeast Asia were actually green.',
    'Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.',
    'The first computer programmer was a woman. Ada Lovelace wrote the first algorithm intended to be processed by a machine in the 1840s.',
    'A group of flamingos is called a "flamboyance."',
    'The first product to have a barcode was Wrigley\'s gum in 1974.',
    'The average person spends 6 months of their lifetime waiting for red lights to turn green.',
    'The first YouTube video was uploaded on April 23, 2005, and was titled "Me at the zoo."',
    'The shortest complete sentence in the English language is "I am."',
    'A "jiffy" is an actual unit of time: 1/100th of a second.',
    'The first email was sent in 1971 by Ray Tomlinson to himself.',
    'The first computer mouse was made of wood.',
    'The first website is still online at info.cern.ch.',
    'The first computer bug was an actual bug. In 1947, Grace Hopper found a moth causing problems in the Harvard Mark II computer.',
    'The first camera phone was invented in 1997 in Japan.',
    'The first emoji was created in 1999 by Shigetaka Kurita.',
    'The first computer programmer was a woman. Ada Lovelace wrote the first algorithm in the 1840s.',
    'The first computer mouse was made of wood in 1964.',
    'The first website is still online at info.cern.ch, created in 1991.'
  ]],
  ['science', [
    'The human body contains enough carbon to make 900 pencils.',
    'A single bolt of lightning contains enough energy to toast 100,000 slices of bread.',
    'The average person walks the equivalent of three times around the world in a lifetime.',
    'The human brain can process images in as little as 13 milliseconds.',
    'The first computer programmer was a woman. Ada Lovelace wrote the first algorithm in the 1840s.',
    'The first computer mouse was made of wood in 1964.',
    'The first website is still online at info.cern.ch, created in 1991.',
    'The first email was sent in 1971 by Ray Tomlinson to himself.',
    'The first computer bug was an actual bug. In 1947, Grace Hopper found a moth causing problems in the Harvard Mark II computer.',
    'The first camera phone was invented in 1997 in Japan.',
    'The first emoji was created in 1999 by Shigetaka Kurita.',
    'The first computer programmer was a woman. Ada Lovelace wrote the first algorithm in the 1840s.',
    'The first computer mouse was made of wood in 1964.',
    'The first website is still online at info.cern.ch, created in 1991.',
    'The first email was sent in 1971 by Ray Tomlinson to himself.',
    'The first computer bug was an actual bug. In 1947, Grace Hopper found a moth causing problems in the Harvard Mark II computer.',
    'The first camera phone was invented in 1997 in Japan.',
    'The first emoji was created in 1999 by Shigetaka Kurita.',
    'The first computer programmer was a woman. Ada Lovelace wrote the first algorithm in the 1840s.',
    'The first computer mouse was made of wood in 1964.'
  ]],
  ['tech', [
    'The first computer programmer was a woman. Ada Lovelace wrote the first algorithm in the 1840s.',
    'The first computer mouse was made of wood in 1964.',
    'The first website is still online at info.cern.ch, created in 1991.',
    'The first email was sent in 1971 by Ray Tomlinson to himself.',
    'The first computer bug was an actual bug. In 1947, Grace Hopper found a moth causing problems in the Harvard Mark II computer.',
    'The first camera phone was invented in 1997 in Japan.',
    'The first emoji was created in 1999 by Shigetaka Kurita.',
    'The first computer programmer was a woman. Ada Lovelace wrote the first algorithm in the 1840s.',
    'The first computer mouse was made of wood in 1964.',
    'The first website is still online at info.cern.ch, created in 1991.',
    'The first email was sent in 1971 by Ray Tomlinson to himself.',
    'The first computer bug was an actual bug. In 1947, Grace Hopper found a moth causing problems in the Harvard Mark II computer.',
    'The first camera phone was invented in 1997 in Japan.',
    'The first emoji was created in 1999 by Shigetaka Kurita.',
    'The first computer programmer was a woman. Ada Lovelace wrote the first algorithm in the 1840s.',
    'The first computer mouse was made of wood in 1964.',
    'The first website is still online at info.cern.ch, created in 1991.',
    'The first email was sent in 1971 by Ray Tomlinson to himself.',
    'The first computer bug was an actual bug. In 1947, Grace Hopper found a moth causing problems in the Harvard Mark II computer.',
    'The first camera phone was invented in 1997 in Japan.'
  ]]
]);

// Efficient fact rotation tracking
const factRotation = new Map();

/**
 * Get a random fact from a specific category
 * @param {string} category - The fact category
 * @returns {string} A random fact
 */
export function getRandomFact(category = 'general') {
  const facts = coreFacts.get(category) || coreFacts.get('general');
  if (!facts || facts.length === 0) {
    return 'Loading...';
  }

  // Get or initialize rotation tracking for this category
  let displayedFacts = factRotation.get(category);
  if (!displayedFacts) {
    displayedFacts = new Set();
    factRotation.set(category, displayedFacts);
  }
  
  // If all facts have been shown, reset the rotation
  if (displayedFacts.size >= facts.length) {
    displayedFacts.clear();
  }
  
  // Get a random fact that hasn't been shown recently
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * facts.length);
  } while (displayedFacts.has(randomIndex));
  
  // Track the displayed fact
  displayedFacts.add(randomIndex);
  
  return facts[randomIndex];
}

/**
 * Get all available categories
 * @returns {string[]} Array of category names
 */
export function getCategories() {
  return Array.from(coreFacts.keys());
}

/**
 * Get all facts for a specific category
 * @param {string} category - The fact category
 * @returns {string[]} Array of facts
 */
export function getFacts(category = 'general') {
  return coreFacts.get(category) || coreFacts.get('general');
}

/**
 * Reset fact rotation for a specific category
 * @param {string} category - The fact category
 */
export function resetRotation(category = 'general') {
  factRotation.set(category, new Set());
}

export default {
  getRandomFact,
  getCategories,
  getFacts,
  resetRotation
}; 