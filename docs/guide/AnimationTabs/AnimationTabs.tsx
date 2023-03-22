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
