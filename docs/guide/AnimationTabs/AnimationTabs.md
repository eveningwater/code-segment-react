| title         | tags                       | firstSeen | lastUpdated |
| ------------- | -------------------------- | --------- | ----------- |
| AnimationTabs | components,state,useEffect | 2023/3/20 | 2023/3/20   |

Renders a tab component that can be configured with image options or text options with animation effects.

- Use `useState` to manage options, image options or text options are an array.
- Add a random number as the tab's key.
- Get the element according to the class name of the tab in the `useEffect` function, and calculate the left offset of the element, call the `window.scrollTo` method to modify the left offset, and add the transition animation time for the line element.
- Renders the class name of the element according to different conditions.

#### animationTabs.less

```less
@prefix: ew-animation-tabs-;
@bgColor: #060606;
@defaultColor: #7c818a;
@defaultActiveColor: #fc5aa8;
@lineColor: #fc5aa8;
@circleBgColor: #ff5bac;
.@{prefix}container {
  .@{prefix}wrapper {
    width: 100%;
    box-sizing: border-box;
  }

  .@{prefix}content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: percentage(1);
    &.@{prefix}circle-content {
      background-color: @bgColor;
    }
  }

  .@{prefix}item {
    flex: 1 0 auto;
    font-family: 'SourceHanSansCN-Normal';
    font-weight: 400;
    font-size: 28px;
    line-height: 40px;
    color: @defaultColor;
    text-align: center;
    z-index: 2;
    transition: background-image 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
    cursor: pointer;
    &-img {
      object-fit: contain;
      display: block;
      width: percentage(1);
      height: percentage(1);
    }
    &.active {
      color: @defaultActiveColor;
    }

    &.@{prefix}line-item {
      margin-right: 24px;
      padding-bottom: 8px;
      white-space: nowrap;
      min-height: 40px;
    }
    &.@{prefix}circle-item {
      z-index: 1;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      width: 117px;
      height: 84px;
      margin: 19px;
      &.active {
        width: 147px;
      }
    }
  }

  .@{prefix}line {
    z-index: 1;
    box-sizing: border-box;
    position: absolute;
    width: 45px;
    height: 5px;
    left: 0;
    bottom: 0;
    background: @lineColor;
    border-radius: 12px;
  }
  .@{prefix}circle {
    position: absolute;
    &.@{prefix}text-effect {
      width: 28px;
      height: 28px;
      top: 14px;
    }
    &.@{prefix}image-effect {
      width: 34px;
      height: 34px;
      top: 28px;
    }
    left: 0;
    border-radius: 50%;
    background-color: @circleBgColor;
    z-index: 0;
    @keyframes bounceIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    &.bounceIn {
      animation: bounceIn 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
}
.@{prefix}item-1 {
  background-image: url('./images/tab-1.png');
  &.active {
    background-image: url('./images/tab-active-1.png');
  }
}
.@{prefix}item-2 {
  background-image: url('./images/tab-2.png');
  &.active {
    background-image: url('./images/tab-active-2.png');
  }
}
.@{prefix}item-3 {
  background-image: url('./images/tab-3.png');
  &.active {
    background-image: url('./images/tab-active-3.png');
  }
}
.@{prefix}item-4 {
  background-image: url('./images/tab-4.png');
  &.active {
    background-image: url('./images/tab-active-4.png');
  }
}
```

#### AnimationTabs.tsx

```tsx | pure
import React, { useEffect, useMemo, useState, SyntheticEvent } from 'react';
import { getElementStyle } from '../../utils/getElementStyle';
import LazyLoadingImage from '../LazyLoadingImage/LazyLoadImage';
import './animationTabs.less';
export interface TabItem {
  label: string;
  value: string;
}
export interface TabImageItem {
  defaultSrc: string;
  activeSrc: string;
  value: string;
}
export interface TabIndexImageItem {
  index: number;
  value: string;
}
export interface AnimationTabsProps extends Record<string, any> {
  tabs: TabItem[];
  currentTab?: string;
  onChange: (tab: TabItem | TabImageItem | TabIndexImageItem) => void;
  type: 'line' | 'circle';
  imageTabs: (TabImageItem | TabIndexImageItem)[];
  transitionDuration: number;
  isHasAnimation: boolean;
  key: number;
}
const AnimationTabs = (props: Partial<AnimationTabsProps>) => {
  const {
    currentTab,
    tabs: textTabs = [],
    onChange,
    type = 'line',
    key = Math.floor(Math.random() * 1000),
    imageTabs = [],
    transitionDuration = 300,
    isHasAnimation = false,
  } = props;
  let selectId = key;
  if (!textTabs.length && !imageTabs.length) {
    return null;
  }
  const cacheImageTabs = useMemo(() => imageTabs, []);
  const cacheTextTabs = useMemo(() => textTabs, []);
  const [tabs, setTabs] = useState(
    cacheImageTabs.length ? cacheImageTabs : cacheTextTabs,
  );
  const [defaultTabname, setDefaultTabname] = useState(
    currentTab || tabs[0].value,
  );
  const [isImage, setIsImage] = useState(Boolean(cacheImageTabs.length));
  const [tabname, setTabname] = useState(currentTab || tabs[0].value);
  const [animation, setAnimation] = useState('');
  const changeAnimation = () => {
    setAnimation('');
    setTimeout(() => {
      setAnimation('bounceIn');
    }, 100);
  };
  const handleMouseMove = (e: SyntheticEvent) => {
    e.stopPropagation();
  };
  const handleSelectTab = (tab: TabItem | TabImageItem | TabIndexImageItem) => {
    if (type === 'circle' && isHasAnimation) {
      changeAnimation();
    }
    setTabname(tab.value);
    onChange?.(tab);
  };
  useEffect(() => {
    if (currentTab) {
      setTabname(currentTab);
    }
  }, [currentTab]);
  useEffect(() => {
    setTabs(imageTabs.length ? imageTabs : textTabs);
    setIsImage(Boolean(imageTabs.length));
  }, [imageTabs, textTabs]);
  useEffect(() => {
    const wcls = '.ew-animation-tabs-wrapper-' + selectId;
    const wrapper = document.querySelector(wcls);
    if (!wrapper) {
      return;
    }
    const activeTab = wrapper.querySelector(
      `.ew-animation-tabs-item.active`,
    ) as HTMLDivElement;
    if (!activeTab) return;
    const curLeft = activeTab.offsetLeft;
    const curWidth = Math.max(
      activeTab.offsetWidth,
      parseInt(getElementStyle(activeTab, 'width')),
    );
    const curCenter = curLeft + curWidth / 2;
    const bodyDom = document.querySelector('body') as HTMLBodyElement;
    const center = (bodyDom.offsetWidth - 24) / 2;
    if (curCenter > center) {
      wrapper?.scrollTo({
        left: curCenter - center,
        behavior: 'smooth',
      });
    } else {
      wrapper?.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
    const rectDom = wrapper.querySelector(
      `.ew-animation-tabs-effect`,
    ) as HTMLDivElement;
    if (!rectDom) {
      return;
    }
    const index = (tabs as TabItem[]).findIndex(
      (tab) => tab.value === defaultTabname,
    );
    const margin =
      type === 'circle' ? parseInt(getElementStyle(activeTab, 'margin')) : 0;
    const translateX =
      type === 'circle'
        ? isImage
          ? curLeft + curWidth - rectDom.offsetWidth + 4
          : curLeft + curWidth - rectDom.offsetWidth - margin
        : curCenter - rectDom.offsetWidth / 2;
    if (index === 0) {
      rectDom.setAttribute('style', `transform: translateX(${translateX}px)`);
      setDefaultTabname('-1');
      return;
    }
    rectDom.setAttribute(
      'style',
      `transition-duration: ${transitionDuration}ms;transform: translateX(${translateX}px)`,
    );
  }, [tabname, isImage]);

  return (
    <div className="ew-animation-tabs-container">
      <div
        className={[
          'ew-animation-tabs-wrapper',
          'ew-animation-tabs-wrapper-' + selectId,
        ].join(' ')}
        onTouchMove={handleMouseMove}
      >
        <div
          className={[
            'ew-animation-tabs-content',
            `ew-animation-tabs-${type}-content`,
          ].join(' ')}
        >
          {tabs.map((tab: TabItem | TabImageItem | TabIndexImageItem) => (
            <div
              className={[
                'ew-animation-tabs-item',
                (tab as TabIndexImageItem).index
                  ? `ew-animation-tabs-item-${(tab as TabIndexImageItem).index}`
                  : '',
                `ew-animation-tabs-${type}-item`,
                tabname === tab.value ? 'active' : '',
              ].join(' ')}
              key={tab.value}
              onClick={() => handleSelectTab(tab)}
            >
              {!isImage && (tab as TabItem).label}
              {isImage &&
                (tab as TabImageItem).defaultSrc &&
                (tab as TabImageItem).activeSrc && (
                  <LazyLoadingImage
                    src={
                      tabname === tab.value
                        ? (tab as TabImageItem).activeSrc
                        : (tab as TabImageItem).defaultSrc
                    }
                    className="ew-animation-tabs-item-img"
                  />
                )}
            </div>
          ))}
          <div
            className={[
              `${
                type === 'line'
                  ? 'ew-animation-tabs-line'
                  : 'ew-animation-tabs-circle'
              }`,
              'ew-animation-tabs-effect',
              `${
                isImage
                  ? 'ew-animation-tabs-image-effect'
                  : 'ew-animation-tabs-text-effect'
              }`,
              animation,
            ].join(' ')}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AnimationTabs;
```

#### AnimationTabs.jsx

```jsx | pure
import React, { useEffect, useMemo, useState } from 'react';
import { getElementStyle } from '../../../utils/getElementStyle';
import LazyLoadingImage from '../../LazyLoadingImage/jsx/LazyLoadImage';
import '../animationTabs.less';
const AnimationTabs = (props) => {
  const {
    currentTab,
    tabs: textTabs = [],
    onChange,
    type = 'line',
    key = Math.floor(Math.random() * 1000),
    imageTabs = [],
    transitionDuration = 300,
    isHasAnimation = false,
  } = props;
  let selectId = key;
  if (!textTabs.length && !imageTabs.length) {
    return null;
  }
  const cacheImageTabs = useMemo(() => imageTabs, []);
  const cacheTextTabs = useMemo(() => textTabs, []);
  const [tabs, setTabs] = useState(
    cacheImageTabs.length ? cacheImageTabs : cacheTextTabs,
  );
  const [defaultTabname, setDefaultTabname] = useState(
    currentTab || tabs[0].value,
  );
  const [isImage, setIsImage] = useState(Boolean(cacheImageTabs.length));
  const [tabname, setTabname] = useState(currentTab || tabs[0].value);
  const [animation, setAnimation] = useState('');
  const changeAnimation = () => {
    setAnimation('');
    setTimeout(() => {
      setAnimation('bounceIn');
    }, 100);
  };
  const handleMouseMove = (e) => {
    e.stopPropagation();
  };
  const handleSelectTab = (tab) => {
    if (type === 'circle' && isHasAnimation) {
      changeAnimation();
    }
    setTabname(tab.value);
    onChange?.(tab);
  };
  useEffect(() => {
    if (currentTab) {
      setTabname(currentTab);
    }
  }, [currentTab]);
  useEffect(() => {
    setTabs(imageTabs.length ? imageTabs : textTabs);
    setIsImage(Boolean(imageTabs.length));
  }, [imageTabs, textTabs]);
  useEffect(() => {
    const wcls = '.ew-animation-tabs-wrapper-' + selectId;
    const wrapper = document.querySelector(wcls);
    if (!wrapper) {
      return;
    }
    const activeTab = wrapper.querySelector(`.ew-animation-tabs-item.active`);
    if (!activeTab) return;
    const curLeft = activeTab.offsetLeft;
    const curWidth = Math.max(
      activeTab.offsetWidth,
      parseInt(getElementStyle(activeTab, 'width')),
    );
    const curCenter = curLeft + curWidth / 2;
    const bodyDom = document.querySelector('body');
    const center = (bodyDom.offsetWidth - 24) / 2;
    if (curCenter > center) {
      wrapper?.scrollTo({
        left: curCenter - center,
        behavior: 'smooth',
      });
    } else {
      wrapper?.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
    const rectDom = wrapper.querySelector(`.ew-animation-tabs-effect`);
    if (!rectDom) {
      return;
    }
    const index = tabs.findIndex((tab) => tab.value === defaultTabname);
    const margin =
      type === 'circle' ? parseInt(getElementStyle(activeTab, 'margin')) : 0;
    const translateX =
      type === 'circle'
        ? isImage
          ? curLeft + curWidth - rectDom.offsetWidth + 4
          : curLeft + curWidth - rectDom.offsetWidth - margin
        : curCenter - rectDom.offsetWidth / 2;
    if (index === 0) {
      rectDom.setAttribute('style', `transform: translateX(${translateX}px)`);
      setDefaultTabname('-1');
      return;
    }
    rectDom.setAttribute(
      'style',
      `transition-duration: ${transitionDuration}ms;transform: translateX(${translateX}px)`,
    );
  }, [tabname, isImage]);

  return (
    <div className="ew-animation-tabs-container">
      <div
        className={[
          'ew-animation-tabs-wrapper',
          'ew-animation-tabs-wrapper-' + selectId,
        ].join(' ')}
        onTouchMove={handleMouseMove}
      >
        <div
          className={[
            'ew-animation-tabs-content',
            `ew-animation-tabs-${type}-content`,
          ].join(' ')}
        >
          {tabs.map((tab) => (
            <div
              className={[
                tab.index ? `ew-animation-tabs-item-${tab.index}` : '',
                'ew-animation-tabs-item',
                `ew-animation-tabs-${type}-item`,
                tabname === tab.value ? 'active' : '',
              ].join(' ')}
              key={tab.value}
              onClick={() => handleSelectTab(tab)}
            >
              {!isImage && tab.label}
              {isImage && tab.defaultSrc && tab.activeSrc && (
                <LazyLoadingImage
                  src={tabname === tab.value ? tab.activeSrc : tab.defaultSrc}
                  className="ew-animation-tabs-item-img"
                />
              )}
            </div>
          ))}
          <div
            className={[
              `${
                type === 'line'
                  ? 'ew-animation-tabs-line'
                  : 'ew-animation-tabs-circle'
              }`,
              'ew-animation-tabs-effect',
              `${
                isImage
                  ? 'ew-animation-tabs-image-effect'
                  : 'ew-animation-tabs-text-effect'
              }`,
              animation,
            ].join(' ')}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AnimationTabs;
```

Demo:

<code src="./Demo.tsx"></code>

jsx Demo:

<code src="./jsx/Demo.jsx"></code>
