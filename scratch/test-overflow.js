(() => {
  const widths = [1440, 1024, 768, 390];
  console.log('Scroll width check:');
  for (const w of widths) {
    window.resizeTo(w, 800);
    const hasScroll = document.documentElement.scrollWidth > document.documentElement.clientWidth;
    console.log('Width: ' + w + ' | ScrollWidth: ' + document.documentElement.scrollWidth + ' | ClientWidth: ' + document.documentElement.clientWidth + ' | Overflow: ' + hasScroll);
  }
})();
