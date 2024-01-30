const about = {
  en: [
    {
      title: 'jue jin',
      path: 'https://juejin.im/user/4054654613988718',
    },
    {
      title: 'segmentfault',
      path: 'https://segmentfault.com/u/xishui_5ac9a340a5484',
    },
    {
      title: 'gitee',
      path: 'https://gitee.com/eveningwater',
    },
    {
      title: 'Github',
      path: 'https://github.com/eveningwater',
    },
    {
      title: 'blog',
      path: 'https://www.cnblogs.com/eveningwater/',
    },
    {
      title: 'website',
      path: 'https://www.eveningwater.com/',
    },
    {
      title: 'My project',
      path: 'https://www.eveningwater.com/my-web-projects/home/',
    },
    {
      title: '17sucai',
      path: 'https://www.17sucai.com/user/800544',
    },
    {
      title: 'ewColorPicker',
      path: 'https://eveningwater.gitee.io/ew-color-picker/',
    },
  ],
  zh: [
    {
      title: '掘金',
      path: 'https://juejin.im/user/4054654613988718',
    },
    {
      title: '思否',
      path: 'https://segmentfault.com/u/xishui_5ac9a340a5484',
    },
    {
      title: '码云',
      path: 'https://gitee.com/eveningwater',
    },
    {
      title: '代码仓库',
      path: 'https://github.com/eveningwater',
    },
    {
      title: '博客',
      path: 'https://www.cnblogs.com/eveningwater/',
    },
    {
      title: '个人网站',
      path: 'https://www.eveningwater.com/',
    },
    {
      title: '个人项目',
      path: 'https://www.eveningwater.com/my-web-projects/home/',
    },
    {
      title: '门素材',
      path: 'https://www.17sucai.com/user/800544',
    },
    {
      title: '颜色选择器',
      path: 'https://eveningwater.gitee.io/ew-color-picker/',
    },
  ],
};

const renderFooter = () => {
  if (typeof document === 'undefined') {
    return;
  }
  const html = document.querySelector('html');
  const render = () => {
    const footerContainer = document.querySelector('.dumi-default-footer');
    if (footerContainer) {
      const lang = html.getAttribute('lang') || html.lang;
      const getFooterList = () =>
        about[lang]
          .map(
            (item) =>
              `<a href="${item.path}" target="_blank" rel="noopener noreferrer" class="pipe-el">${item.title}</a>`,
          )
          .join('');
      footerContainer.innerHTML = `<span class="pipe-el">Copyright ©2023</span>
        ${getFooterList()}`;
    }
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
  renderFooter();
};
