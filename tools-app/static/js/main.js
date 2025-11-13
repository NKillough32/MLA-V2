(function () {
  function createButton(text, onClick) {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = 'tool-btn';
    btn.addEventListener('click', onClick);
    return btn;
  }

  function init() {
    const list = document.getElementById('tools-buttons');
    const panel = document.getElementById('tool-panel');

    if (!window.ExtractedCalculators) {
      panel.innerHTML = '<p class="error">ExtractedCalculators not found. Ensure the file is loaded.</p>';
      return;
    }

    const getters = Object.keys(ExtractedCalculators).filter(k => k.startsWith('get'));

    // Populate sidebar
    getters.forEach(g => {
      const label = g.replace(/^get/, '').replace(/Calculator$/i, '').replace(/([A-Z])/g, ' $1').trim();
      const btn = createButton(label, () => {
        try {
          const html = ExtractedCalculators[g]();
          panel.innerHTML = html;
          window.scrollTo(0, 0);
        } catch (err) {
          panel.innerHTML = `<div class="error">Error rendering tool: ${err.message}</div>`;
        }
      });
      list.appendChild(btn);
    });

    // Expose compatibility proxy so inline onclick handlers keep working
    window.quizApp = window.quizApp || {};
    Object.keys(ExtractedCalculators).forEach(k => {
      if (k.startsWith('calculate') || k.startsWith('get')) {
        // Bind calculate functions to window.quizApp with the same name
        if (k.startsWith('calculate')) {
          window.quizApp[k] = ExtractedCalculators[k].bind(ExtractedCalculators);
        }
      }
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
