/* Sunaar Pro pricing: Monthly / Yearly toggle.
   Every element with data-m and data-y swaps its text when the toggle changes.
   TRIAL_LINK: where every "Start 30-day free trial" button goes.
   When your WhatsApp number is ready, change it to e.g. 'https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20the%20Sunaar%20Pro%20free%20trial' */
(function(){
  var TRIAL_LINK = 'index.html#contact';
  var onHome = TRIAL_LINK.indexOf('index.html#') === 0 && document.getElementById(TRIAL_LINK.split('#')[1]);
  document.querySelectorAll('[data-trial]').forEach(function(a){
    a.href = onHome ? '#' + TRIAL_LINK.split('#')[1] : TRIAL_LINK;
    if (/^https?:/.test(TRIAL_LINK)) { a.target = '_blank'; a.rel = 'noopener'; }
  });

  var KEY = 'sp-billing';
  function set(mode){
    document.querySelectorAll('.bill-toggle').forEach(function(t){
      t.dataset.mode = mode;
      t.querySelectorAll('button').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.bill === mode ? 'true' : 'false'); });
    });
    document.querySelectorAll('[data-m][data-y]').forEach(function(el){
      var v = el.getAttribute(mode === 'y' ? 'data-y' : 'data-m');
      if (el.textContent !== v) {
        el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip');
        el.textContent = v;
      }
    });
    try { localStorage.setItem(KEY, mode); } catch (e) {}
  }
  document.querySelectorAll('.bill-toggle button').forEach(function(b){
    b.addEventListener('click', function(){ set(b.dataset.bill); });
  });
  var start = 'm';
  try { if (localStorage.getItem(KEY) === 'y') start = 'y'; } catch (e) {}
  if (/[?&]billing=yearly/.test(location.search)) start = 'y';
  set(start);
})();
