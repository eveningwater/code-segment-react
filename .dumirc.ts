import { defineConfig } from 'dumi';

export default defineConfig({
  locales: [
    { id: 'en-US', name: '英文' },
    { id: 'zh-CN', name: '中文' },
  ],
  themeConfig: {
    rtl: true,
    socialLinks: {
      github: 'https://github.com/eveningwater/code-segment-react'
    },
    showLineNum: true,
    logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
  },
  base: process.env.NODE_ENV === 'production' ? '/code-segment-react/' : '/',
  outputPath: 'build',
  publicPath:
    process.env.NODE_ENV === 'production' ? '/code-segment-react/' : '/',
  styles: [`
    img {margin: auto; display:block;}

    .pipe-el+.pipe-el:before {
      content: "";
      font-size: 0;
      padding: 12px 3px 1px;
      margin-left: 6px;
      border-left: 1px solid #618fbd;
    }

    body {
      margin: 0;
    }
  `],
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
      src: 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.14.7/vconsole.min.js',
    },
    {
      src:
        process.env.NODE_ENV === 'production'
          ? '/code-segment-react/debug.js'
          : '/debug.js',
    },
    {
      src:
        process.env.NODE_ENV === 'production'
          ? '/code-segment-react/renderFooter.js'
          : '/renderFooter.js',
    },
    {
      src:
        process.env.NODE_ENV === 'production'
          ? '/code-segment-react/renderDocTitle.js'
          : '/renderDocTitle.js',
    },
  ],
});
