import React, { useState } from 'react';
import '../tabs.less';
import classnames from '../../../utils/classnames';
const TabItem = (props) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};
TabItem.displayName = 'TabItem';
const Tabs = (props) => {
  const { defaultIndex = 0, onTabClick, children } = props;
  const [bindIndex, setBindIndex] = useState(+defaultIndex);
  const changeTab = (newIndex, e) => {
    onTabClick?.(newIndex, e);
    setBindIndex(+newIndex);
  };
  const items = children?.filter((item) => item.type?.name === 'TabItem');
  const content =
    items?.[Math.max(0, Math.min(items.length - 1, bindIndex - 1))].props
      .children;
  return (
    <div className="ew-tabs">
      <div className="ew-tabs-header">
        {items?.map(({ props }) => (
          <div
            className={classnames({
              'ew-tabs-header-item': true,
              active: props.index === bindIndex,
            })}
            key={`ew-tabs-header-item-${+props.index + 1}`}
            onClick={(e) => changeTab(props.index, e)}
          >
            {props.label}
          </div>
        ))}
      </div>
      <div className="ew-tabs-content">{content}</div>
    </div>
  );
};
Tabs.TabItem = TabItem;
export default Tabs;
