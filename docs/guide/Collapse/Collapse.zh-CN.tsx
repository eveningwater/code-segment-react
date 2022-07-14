import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import React, { useState } from 'react';

const CollapseStyle = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  border-radius: 2px;
  & .collapse-header {
    line-height: 1.5715;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    transition: all 0.3s, visibility 0s;
    box-sizing: border-box;
  }
`;
const CollapseStyleItem = styled.div`
  border-bottom: 1px solid #d9d9d9;
  & .collapse-content {
    color: #000000d9;
    background-color: #fff;
    border-top: 1px solid #d9d9d9;
    transition: all 0.3s ease-in-out;
    padding: 16px;
    &.collapsed {
      display: none;
    }
    &.expanded {
      display: block;
    }
  }
`;

interface CollapseProps {
  collapsed: boolean;
  children: ReactNode;
  header: ReactNode;
}

type CollapseItemProps = Omit<Omit<CollapseProps, 'collapsed'>, 'header'> & {
  className: string;
};

const CollapseItem = (props: Partial<CollapseItemProps>) => {
  const { children, className } = props;
  return (
    <CollapseStyleItem>
      <div className={`${'collapse-content'}${className}`}>{children}</div>
    </CollapseStyleItem>
  );
};

const Collapse = (props: Partial<CollapseProps>) => {
  const { collapsed, children, header } = props;
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  return (
    <CollapseStyle>
      <div
        className="collapse-header"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {header || (isCollapsed ? '显示' : '隐藏') + ' 内容'}
      </div>
      <CollapseItem className={`${isCollapsed ? ' collapsed' : ' expanded'}`}>
        {children}
      </CollapseItem>
    </CollapseStyle>
  );
};

const Demo = () => {
  return (
    <Collapse header="这是标题">
      <h1>这是一个折叠组件</h1>
      <p>你好，世界!</p>
    </Collapse>
  );
};

export default Demo;
