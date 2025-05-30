/**
 * DisplayEngine - Handles DOM manipulation and animations
 * Optimized for performance and accessibility
 */

export class DisplayEngine {
  constructor(o = {}) {
    this.o = {
      duration: 3000,
      target: document.body,
      backgroundColor: 'rgba(0,0,0,.8)',
      textColor: '#fff',
      fontSize: '16px',
      fontFamily: 'system-ui,-apple-system,sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      letterSpacing: 'normal',
      textTransform: 'none',
      maxWidth: '600px',
      minWidth: '300px',
      ...o
    };
    this.c = null; // container
    this.f = null; // current fact
    this.v = false; // isVisible
  }

  /**
   * Create the container element with optimized styles
   * @private
   */
  _createContainer() {
    const c = document.createElement('div');
    c.setAttribute('role', 'status');
    c.setAttribute('aria-live', 'polite');
    
    const l = document.createElement('div');
    l.className = 'loader';
    
    const t = document.createElement('div');
    t.className = 'fact-text';
    
    c.appendChild(l);
    c.appendChild(t);
    
    Object.assign(c.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      zIndex: '9999',
      padding: '20px',
      backgroundColor: this.o.backgroundColor,
      color: this.o.textColor,
      fontSize: this.o.fontSize,
      fontFamily: this.o.fontFamily,
      fontStyle: this.o.fontStyle,
      fontWeight: this.o.fontWeight,
      letterSpacing: this.o.letterSpacing,
      textTransform: this.o.textTransform,
      borderRadius: '8px',
      maxWidth: this.o.maxWidth,
      minWidth: this.o.minWidth,
      width: 'auto',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,.1)',
      opacity: '0',
      transition: 'opacity .3s ease-in-out',
      willChange: 'opacity',
      backfaceVisibility: 'hidden'
    });

    const s = document.createElement('style');
    s.textContent = `
      .loader{width:90px;height:14px;box-shadow:0 3px 0 #fff;position:relative;display:grid;clip-path:inset(-60px 0 -5px);margin:0 auto 20px}
      .loader:after{content:"";position:relative;background:repeating-linear-gradient(90deg,#0000 0 calc(50% - 8px),#ccc 0 calc(50% + 8px),#0000 0 100%) 0 0/calc(100%/3) 100%;animation:l6-1 1s infinite}
      .loader:before{content:"";position:absolute;width:14px;aspect-ratio:1;left:calc(50% - 7px);bottom:0;border-radius:50%;background:lightblue;animation:l6-2 1s infinite}
      @keyframes l6-1{50%,100%{background-position:calc(100%/2) 0}}
      @keyframes l6-2{0%,50%{transform:translateY(-80px)}}
      .fact-text{margin-top:10px;opacity:0;transition:opacity .3s ease-in-out;padding:0 10px;line-height:1.4;display:inline-block;max-width:100%;word-wrap:break-word}
      .fact-text.visible{opacity:1}
    `;
    document.head.appendChild(s);

    return c;
  }

  /**
   * Show a fact with smooth animation
   * @param {string} f - Fact to display
   */
  show(f) {
    if (!this.c) {
      this.c = this._createContainer();
      this.o.target.appendChild(this.c);
    }

    this.c.style.opacity = '1';
    this.v = true;

    const t = this.c.querySelector('.fact-text');
    t.textContent = f;
    this.f = f;

    t.offsetHeight;
    t.classList.add('visible');
  }

  /**
   * Hide the fact display with smooth animation
   */
  hide() {
    if (!this.c || !this.v) return;

    this.c.style.opacity = '0';
    this.v = false;

    setTimeout(() => {
      if (this.c && this.c.parentNode) {
        this.c.parentNode.removeChild(this.c);
        this.c = null;
      }
    }, 300);
  }

  /**
   * Update the current fact with smooth transition
   * @param {string} f - New fact to display
   */
  updateFact(f) {
    if (!this.c || !this.v) {
      this.show(f);
      return;
    }

    const t = this.c.querySelector('.fact-text');
    t.classList.remove('visible');

    setTimeout(() => {
      t.textContent = f;
      this.f = f;
      t.classList.add('visible');
    }, 150);
  }

  /**
   * Check if display is currently visible
   * @returns {boolean} Visibility state
   */
  isVisible() {
    return this.v;
  }

  /**
   * Get current configuration
   * @returns {Object} Current configuration
   */
  getConfig() {
    return { ...this.o };
  }

  /**
   * Update configuration
   * @param {Object} n - New configuration options
   */
  updateConfig(n) {
    this.o = { ...this.o, ...n };
    
    if (this.c) {
      Object.assign(this.c.style, {
        backgroundColor: this.o.backgroundColor,
        color: this.o.textColor,
        fontSize: this.o.fontSize,
        fontFamily: this.o.fontFamily,
        fontStyle: this.o.fontStyle,
        fontWeight: this.o.fontWeight,
        letterSpacing: this.o.letterSpacing,
        textTransform: this.o.textTransform,
        maxWidth: this.o.maxWidth,
        minWidth: this.o.minWidth
      });
    }
  }
} 