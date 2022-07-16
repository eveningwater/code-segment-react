import React from 'react';
import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';
const OmitStyleText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
interface OmitTextProps {
  width: number | string;
  children?: ReactNode;
  className?: string;
  showTooltip?: boolean;
  TooltipProps?: Omit<TooltipProps, 'title'>;
}
const OmitTextChildren = (
  props: Omit<OmitTextProps, 'showTooltip' & 'TooltipProps'>,
) => {
  const { width, className, children, ...rest } = props;
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
  const { showTooltip, TooltipProps, ...rest } = props;
  return (
    <>
      {showTooltip ? (
        <Tooltip title={rest.children}>
          <OmitTextChildren {...rest} />
        </Tooltip>
      ) : (
        <OmitTextChildren {...rest} />
      )}
    </>
  );
};
export default OmitText;
