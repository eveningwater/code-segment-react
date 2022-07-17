import React from 'react';
import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';
const OmitStyleText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;
interface OmitTextProps {
  width?: number | string;
  children?: ReactNode;
  className?: string;
  showTooltip?: boolean;
  tooltipProps?: Omit<TooltipProps, 'title'>;
}
const OmitTextChildren = (
  props: Omit<OmitTextProps, 'showTooltip' | 'TooltipProps'>,
) => {
  const { width = 120, className, children, ...rest } = props;
  return (
    <OmitStyleText
      className={`omitText${className ? ' ' + className : ''}`}
      style={{ maxWidth: width }}
      {...rest}
    >
      {children}
    </OmitStyleText>
  );
};
const OmitText = (props: OmitTextProps) => {
  const { showTooltip = true, tooltipProps, ...rest } = props;
  return (
    <>
      {showTooltip ? (
        <Tooltip title={rest.children} {...tooltipProps}>
          <OmitTextChildren {...rest} />
        </Tooltip>
      ) : (
        <OmitTextChildren {...rest} />
      )}
    </>
  );
};
export default OmitText;
