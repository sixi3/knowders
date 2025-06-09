# Knowder API Documentation

## Overview
Knowder is a lightweight JavaScript library for displaying engaging facts during loading states. It transforms user frustration into engagement while maintaining exceptional performance.

## API Reference

### `Knowder.init(options)`
Initializes the Knowder library with the provided configuration options.

#### Parameters
- `options` (Object): Configuration options for Knowder.
  - `duration` (Number, optional): Duration in milliseconds for each fact display. Default: `3000`.
  - `target` (HTMLElement, optional): The DOM element where facts will be displayed. Default: `document.body`.
  - `backgroundColor` (String, optional): Background color of the fact container. Default: `'rgba(0,0,0,.8)'`.
  - `textColor` (String, optional): Text color of the facts. Default: `'#fff'`.
  - `fontSize` (String, optional): Font size of the facts. Default: `'16px'`.
  - `fontFamily` (String, optional): Font family of the facts. Default: `'system-ui,-apple-system,sans-serif'`.
  - `fontStyle` (String, optional): Font style of the facts. Default: `'normal'`.
  - `fontWeight` (String, optional): Font weight of the facts. Default: `'normal'`.
  - `letterSpacing` (String, optional): Letter spacing of the facts. Default: `'normal'`.
  - `textTransform` (String, optional): Text transform of the facts. Default: `'none'`.
  - `maxWidth` (String, optional): Maximum width of the fact container. Default: `'600px'`.
  - `minWidth` (String, optional): Minimum width of the fact container. Default: `'300px'`.

#### Example
```javascript
Knowder.init({
  duration: 5000,
  target: document.getElementById('fact-container'),
  backgroundColor: 'rgba(102, 126, 234, 0.95)',
  textColor: '#ffffff'
});
```

### `Knowder.start(category)`
Starts displaying facts from the specified category.

#### Parameters
- `category` (String, optional): The category of facts to display. If not provided, defaults to `'general'`.

#### Example
```javascript
Knowder.start('science');
```

### `Knowder.stop()`
Stops displaying facts and cleans up the DOM.

#### Example
```javascript
Knowder.stop();
```

### `Knowder.addFacts(category, facts)`
Adds custom facts to a specified category.

#### Parameters
- `category` (String): The category to add facts to.
- `facts` (Array): An array of fact strings to add.

#### Example
```javascript
Knowder.addFacts('demo', [
  'This is a custom fact!',
  'Another custom fact here.'
]);
```

### `Knowder.getCategories()`
Returns an array of available fact categories.

#### Example
```javascript
const categories = Knowder.getCategories();
console.log(categories); // ['general', 'science', 'demo']
```

## Configuration Options
- **duration**: Controls how long each fact is displayed.
- **target**: Specifies where facts are rendered in the DOM.
- **backgroundColor**: Sets the background color of the fact container.
- **textColor**: Sets the text color of the facts.
- **fontSize**: Controls the font size of the facts.
- **fontFamily**: Sets the font family of the facts.
- **fontStyle**: Controls the font style of the facts.
- **fontWeight**: Sets the font weight of the facts.
- **letterSpacing**: Controls the letter spacing of the facts.
- **textTransform**: Sets the text transform of the facts.
- **maxWidth**: Controls the maximum width of the fact container.
- **minWidth**: Sets the minimum width of the fact container.

## Usage Examples
### Basic Usage
```javascript
// Initialize Knowder
Knowder.init({
  duration: 3000,
  backgroundColor: 'rgba(102, 126, 234, 0.95)',
  textColor: '#ffffff'
});

// Start showing facts
Knowder.start('general');

// Stop when done
Knowder.stop();
```

### Custom Facts
```javascript
// Add custom facts
Knowder.addFacts('demo', [
  'This is a custom fact!',
  'Another custom fact here.'
]);

// Start showing custom facts
Knowder.start('demo');
```

## Migration Guides
- **From v1.0.0 to v1.1.0**: No breaking changes. Simply update to the latest version.
- **From v0.9.0 to v1.0.0**: The `target` option is now optional and defaults to `document.body`.

## Performance Tips
- Keep the `duration` short (e.g., 3000ms) to maintain user engagement.
- Use native CSS transitions for smooth animations.
- Avoid adding too many custom facts to prevent memory issues.

## Troubleshooting Guide
- **Facts not displaying**: Ensure the `target` element exists in the DOM.
- **Styling issues**: Check if the CSS properties are correctly set in the `init` options.
- **Performance issues**: Reduce the number of facts or increase the `duration` to lower CPU usage.

## Browser Support
- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## License
MIT 