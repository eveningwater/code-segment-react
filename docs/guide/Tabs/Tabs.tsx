import React, {
  useState,
  ReactNode,
  ReactElement,
  SyntheticEvent,
} from 'react';
import './tabs.less';
import classnames from '../../utils/classnames';
export interface TabsItemProps extends Record<string, any> {
  index: number | string;
  label: ReactNode;
}
const TabItem = (props: Partial<TabsItemProps>) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};
TabItem.displayName = 'TabItem';
type ChildrenElements = ReactElement<TabsItemProps, any>;
export interface TabsProps extends Record<string, any> {
  defaultIndex: number | string;
  onTabClick: (v: number | string, e: SyntheticEvent) => void;
  children: ChildrenElements[];
}
const Tabs = (props: Partial<TabsProps>) => {
  const { defaultIndex = 0, onTabClick, children } = props;
  const [bindIndex, setBindIndex] = useState(+defaultIndex);
  const changeTab = (newIndex: string | number, e: SyntheticEvent) => {
    onTabClick?.(newIndex, e);
    setBindIndex(+newIndex);
  };
  const items = children?.filter(
    (item) => item.type?.displayName === 'TabItem',
  );
  const content =
    items?.[Math.max(0, Math.min(items.length - 1, bindIndex - 1))].props
      ?.children;
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
            onClick={(e: SyntheticEvent) => changeTab(props.index, e)}
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
