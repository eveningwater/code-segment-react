const title = {
  en: 'code-segment-react',
  zh: 'React代码段',
};
const renderDocTitle = () => {
  if (typeof document === 'undefined') {
    return;
  }
  const html = document.querySelector('html');
  const render = () => {
    const lang = html.getAttribute('lang') || html.lang || 'en';
    document.title = title[lang];
  };
  const observer = new MutationObserver(() => {
    render();
  });
  observer.observe(html, {
    attributes: true,
  });
  setTimeout(() => {
    render();
  }, 100);
};
window.onload = () => {
  renderDocTitle();
};
