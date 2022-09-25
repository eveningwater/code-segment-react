import guideMenuZhCN from './guide-menu.zh-CN';
import guideMenu from './guide-menu';
import antdMenu from './antd-menu';
import antdMenuZhCN from './antd-menu.zh-CN';
import hooksMenu from './hooks-menu';
import hooksMenuZhCN from './hooks-menu.zh-CN';
export default {
  '/guide': guideMenu,
  '/zh-CN/guide': guideMenuZhCN,
  '/antd': antdMenu,
  '/zh-CN/antd': antdMenuZhCN,
  '/hooks': hooksMenu,
  '/zh-CN/hooks': hooksMenuZhCN,
  '/model': [
    {
      title: 'React model',
      path: '/model/model',
    },
  ],
  '/zh-CN/model': [
    {
      title: 'react状态管理工具',
      path: '/zh-CN/model/model',
    },
  ],
};
