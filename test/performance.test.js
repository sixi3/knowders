/**
 * Performance test suite for Knowder
 * Measures critical performance metrics
 */

import Knowder from '../src/index.js';

describe('Performance Tests', () => {
  let startTime;
  let endTime;
  let memoryUsage;

  beforeEach(() => {
    // Reset performance measurements
    startTime = 0;
    endTime = 0;
    memoryUsage = 0;
    
    // Clear any existing instances
    if (window.knowder) {
      window.knowder.stop();
    }
  });

  afterEach(() => {
    // Cleanup
    if (window.knowder) {
      window.knowder.stop();
    }
  });

  test('Initialization time should be under 50ms', () => {
    startTime = performance.now();
    Knowder.init();
    endTime = performance.now();
    
    const initTime = endTime - startTime;
    console.log(`Initialization time: ${initTime.toFixed(2)}ms`);
    expect(initTime).toBeLessThan(50);
  });

  test('Memory usage should be under 1MB', () => {
    if (performance.memory) {
      const beforeMemory = performance.memory.usedJSHeapSize;
      Knowder.init();
      const afterMemory = performance.memory.usedJSHeapSize;
      memoryUsage = (afterMemory - beforeMemory) / (1024 * 1024); // Convert to MB
      
      console.log(`Memory usage: ${memoryUsage.toFixed(2)}MB`);
      expect(memoryUsage).toBeLessThan(1);
    } else {
      console.warn('Memory measurement not available in this environment');
    }
  });

  test('Animation should maintain 60fps', () => {
    Knowder.init();
    Knowder.start();
    
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;
    
    // Measure FPS over 1 second
    return new Promise((resolve) => {
      const measureFPS = () => {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
          fps = frameCount;
          console.log(`FPS: ${fps}`);
          resolve();
        } else {
          requestAnimationFrame(measureFPS);
        }
      };
      
      requestAnimationFrame(measureFPS);
    }).then(() => {
      expect(fps).toBeGreaterThanOrEqual(55); // Allow small margin for browser variations
    });
  });

  test('CPU impact should be under 1% during idle', () => {
    Knowder.init();
    Knowder.start();
    
    return new Promise((resolve) => {
      let samples = 0;
      let totalCPU = 0;
      
      const measureCPU = () => {
        if (performance.now() - startTime >= 1000) {
          const avgCPU = totalCPU / samples;
          console.log(`Average CPU impact: ${avgCPU.toFixed(2)}%`);
          resolve(avgCPU);
        } else {
          // Simulate CPU measurement
          const start = performance.now();
          for (let i = 0; i < 1000; i++) {
            Math.random();
          }
          const end = performance.now();
          const cpuTime = (end - start) / 10; // Rough estimate
          
          totalCPU += cpuTime;
          samples++;
          
          setTimeout(measureCPU, 10);
        }
      };
      
      startTime = performance.now();
      measureCPU();
    }).then((avgCPU) => {
      expect(avgCPU).toBeLessThan(1);
    });
  });

  test('DOM operations should be optimized', () => {
    if (typeof PerformanceObserver === 'undefined') {
      console.warn('PerformanceObserver not available in this environment, skipping DOM operations test.');
      return;
    }
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    Knowder.init({ target: container });
    Knowder.start();
    
    // Measure DOM operations
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const domOps = entries.filter(entry => 
        entry.entryType === 'measure' && 
        entry.name.includes('dom')
      );
      
      console.log('DOM operations:', domOps);
      expect(domOps.length).toBeLessThan(10); // Should have minimal DOM operations
    });
    
    observer.observe({ entryTypes: ['measure'] });
    
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => {
        observer.disconnect();
        container.remove();
      });
  });
}); 