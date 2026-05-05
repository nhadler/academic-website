(function () {
  var KEY = 'theme';
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function getMode() {
    var v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' || v === 'auto' ? v : 'auto';
  }

  function resolved(mode) {
    return mode === 'auto' ? (media.matches ? 'dark' : 'light') : mode;
  }

  function apply() {
    var mode = getMode();
    var root = document.documentElement;
    root.setAttribute('data-theme', resolved(mode));
    root.setAttribute('data-theme-mode', mode);
  }

  apply();

  if (media.addEventListener) {
    media.addEventListener('change', function () {
      if (getMode() === 'auto') apply();
    });
  }

  window.cycleTheme = function () {
    var next = { auto: 'light', light: 'dark', dark: 'auto' }[getMode()];
    if (next === 'auto') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, next);
    apply();
  };
})();
