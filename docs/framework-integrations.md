# Knowder Framework Integrations

## Overview
Knowder is designed to be framework-agnostic, making it easy to integrate with popular JavaScript frameworks. Below are examples and best practices for integrating Knowder with React, Vue.js, Angular, Svelte, and Next.js.

---

## React Integration

### Installation
```bash
npm install knowder
```

### Usage
```jsx
import React, { useEffect } from 'react';
import Knowder from 'knowder';

const LoadingFacts = () => {
  useEffect(() => {
    // Initialize Knowder
    Knowder.init({
      duration: 3000,
      backgroundColor: 'rgba(102, 126, 234, 0.95)',
      textColor: '#ffffff'
    });

    // Start showing facts
    Knowder.start('general');

    // Cleanup on unmount
    return () => {
      Knowder.stop();
    };
  }, []);

  return <div id="fact-container" />;
};

export default LoadingFacts;
```

### Best Practices
- Use `useEffect` for initialization and cleanup.
- Ensure the `target` element exists in the DOM before initializing Knowder.

---

## Vue.js Integration

### Installation
```bash
npm install knowder
```

### Usage
```vue
<template>
  <div id="fact-container"></div>
</template>

<script>
import Knowder from 'knowder';

export default {
  name: 'LoadingFacts',
  mounted() {
    // Initialize Knowder
    Knowder.init({
      duration: 3000,
      backgroundColor: 'rgba(102, 126, 234, 0.95)',
      textColor: '#ffffff'
    });

    // Start showing facts
    Knowder.start('general');
  },
  beforeDestroy() {
    // Cleanup on unmount
    Knowder.stop();
  }
};
</script>
```

### Best Practices
- Use `mounted` and `beforeDestroy` lifecycle hooks for initialization and cleanup.

---

## Angular Integration

### Installation
```bash
npm install knowder
```

### Usage
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import Knowder from 'knowder';

@Component({
  selector: 'app-loading-facts',
  template: '<div id="fact-container"></div>'
})
export class LoadingFactsComponent implements OnInit, OnDestroy {
  ngOnInit() {
    // Initialize Knowder
    Knowder.init({
      duration: 3000,
      backgroundColor: 'rgba(102, 126, 234, 0.95)',
      textColor: '#ffffff'
    });

    // Start showing facts
    Knowder.start('general');
  }

  ngOnDestroy() {
    // Cleanup on unmount
    Knowder.stop();
  }
}
```

### Best Practices
- Use `ngOnInit` and `ngOnDestroy` lifecycle hooks for initialization and cleanup.

---

## Svelte Integration

### Installation
```bash
npm install knowder
```

### Usage
```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import Knowder from 'knowder';

  onMount(() => {
    // Initialize Knowder
    Knowder.init({
      duration: 3000,
      backgroundColor: 'rgba(102, 126, 234, 0.95)',
      textColor: '#ffffff'
    });

    // Start showing facts
    Knowder.start('general');
  });

  onDestroy(() => {
    // Cleanup on unmount
    Knowder.stop();
  });
</script>

<div id="fact-container"></div>
```

### Best Practices
- Use `onMount` and `onDestroy` lifecycle hooks for initialization and cleanup.

---

## Next.js Integration

### Installation
```bash
npm install knowder
```

### Usage
```jsx
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Knowder from 'knowder';

const LoadingFacts = () => {
  useEffect(() => {
    // Initialize Knowder
    Knowder.init({
      duration: 3000,
      backgroundColor: 'rgba(102, 126, 234, 0.95)',
      textColor: '#ffffff'
    });

    // Start showing facts
    Knowder.start('general');

    // Cleanup on unmount
    return () => {
      Knowder.stop();
    };
  }, []);

  return <div id="fact-container" />;
};

// Use dynamic import to avoid SSR issues
export default dynamic(() => Promise.resolve(LoadingFacts), { ssr: false });
```

### Best Practices
- Use `dynamic` import to avoid server-side rendering (SSR) issues.
- Ensure the `target` element exists in the DOM before initializing Knowder.

---

## General Best Practices
- **Bundle Size:** Keep the library lightweight (<5KB gzipped) by avoiding unnecessary dependencies.
- **Performance:** Use native CSS transitions for smooth animations and maintain 60fps performance.
- **Accessibility:** Ensure the fact container is accessible to screen readers and keyboard users.
- **Error Handling:** Gracefully handle cases where the `target` element is missing.

---

## License
MIT 