import styled from '@emotion/styled';
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

const CollapseItem = (props) => {
  const { children, className } = props;
  return (
    <CollapseStyleItem>
      <div className={`${'collapse-content'}${className}`}>{children}</div>
    </CollapseStyleItem>
  );
};

const Collapse = (props) => {
  const { collapsed, children, header } = props;
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  return (
    <CollapseStyle>
      <div
        className="collapse-header"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {header || (isCollapsed ? 'show' : 'hide') + ' content'}
      </div>
      <CollapseItem className={`${isCollapsed ? ' collapsed' : ' expanded'}`}>
        {children}
      </CollapseItem>
    </CollapseStyle>
  );
};

export default Collapse;
