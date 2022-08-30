import { defineConfig } from 'dumi';
import about from './config/about';
import menus from './config/menu';

export default defineConfig({
  title: 'react-code-segment',
  mode: 'site',
  base: process.env.NODE_ENV === 'production' ? '/code-segment-react/' : '/',
  outputPath: 'build',
  publicPath:
    process.env.NODE_ENV === 'production' ? '/code-segment-react/' : '/',
  logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
  styles: [`img {margin: auto; display:block;}`],
  links: [
    {
      rel: 'stylesheet',
      type: 'text/css',
      href:
        process.env.NODE_ENV === 'production'
          ? '/code-segment-react/common.css'
          : '/common.css',
    },
  ],
  scripts: [
    {
      src: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js',
    },
    {
      src:
        process.env.NODE_ENV === 'production'
          ? '/code-segment-react/debug.js'
          : '/debug.js',
    },
  ],
  menus: menus,
  navs: {
    'en-US': [
      {
        title: 'getting-started',
        path: '/getting-started',
      },
      {
        title: 'guide',
        path: '/guide',
      },
      {
        title: 'hooks',
        path: '/hooks',
      },
      {
        title: 'antd',
        path: '/antd',
      },
      {
        title: 'github',
        path: 'https://github.com/eveningwater/code-segment-react.git',
      },
      {
        title: 'about me',
        path: 'https://www.eveningwater.com/my-web-projects/',
        children: about.en,
      },
    ],
    'zh-CN': [
      {
        title: '快速上手',
        path: '/zh-CN/getting-started',
      },
      {
        title: '指南',
        path: '/zh-CN/guide',
      },
      {
        title: '钩子函数',
        path: '/zh-CN/hooks',
      },
      {
        title: '蚂蚁设计',
        path: '/zh-CN/antd',
      },
      {
        title: '源码地址',
        path: 'https://github.com/eveningwater/code-segment-react.git',
      },
      {
        title: '关于我',
        path: 'https://www.eveningwater.com/my-web-projects/',
        children: about.zh,
      },
    ],
  },
});
