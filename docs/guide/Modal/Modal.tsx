import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
`;

const ModalMaskLayer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalWrapper = styled.div``;

const ModalContent = styled.div`
  min-width: 300px;
  background-color: #fff;
  border: 1px solid lighten(#dedede, 4%);
  color: rgba(0, 0, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 8px 12px rgba(33, 33, 36, 0.9);
  overflow: hidden;
`;

const ModalContentClose = styled.span`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 1;
  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    filter: brightness(1.4);
  }
  & .close-icon {
    width: 30px;
    height: 30px;
  }
`;

const ModalContentHeader = styled.div``;

const ModalContentBody = styled.div``;

const ModalContentFooter = styled.div``;

const ModalFooterCancelButton = styled.button``;

const ModalFooterSureButton = styled.button``;

export interface ModalProps extends Record<string, unknown> {
  mask: boolean;
  footer: ReactNode;
  title: ReactNode;
  visible: boolean;
  showCancel: boolean;
  maskClosable: boolean;
  onCancel: Function;
  onOk: Function;
  onClose: Function;
  content: ReactNode;
  showClose: boolean;
  closeMask: boolean;
  autoClose: boolean;
  autoCloseTime: number;
  isRenderHTML: boolean;
  okText: string;
  cancelText: string;
  width: string | number;
  children: ReactNode;
  isDestroy: boolean;
}

const Modal = (props: Partial<ModalProps>) => {
  const {
    mask,
    footer,
    children,
    isRenderHTML,
    title,
    visible,
    onCancel,
    maskClosable,
    onOk,
    showCancel,
    showClose,
    onClose,
    okText,
    cancelText,
    width,
    isDestroy,
    ...rest
  } = props;

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (typeof visible === 'boolean') {
      setModalVisible(visible);
    }
  }, [visible]);

  // Set the width
  const contentStyle: Partial<Record<'width', ModalProps['width']>> = {};
  if (typeof width === 'number') {
    contentStyle['width'] = width + 'px';
  } else if (typeof width === 'string') {
    contentStyle['width'] = width;
  }

  return modalVisible && isDestroy ? (
    <ModalContainer
      {...rest}
      style={{ display: modalVisible ? 'block' : 'none' }}
    >
      {mask ? (
        <ModalMaskLayer
          onClick={() => {
            if (maskClosable) {
              setModalVisible(false);
            }
          }}
        />
      ) : null}
      <ModalWrapper>
        <ModalContent style={contentStyle}>
          {showClose ? (
            <ModalContentClose onClick={() => setModalVisible(false)}>
              <svg
                className="close-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2217"
              >
                <path
                  d="M546.942134 511.818772l327.456957-326.128977c9.617355-9.577423 9.648071-25.135361 0.070648-34.751692-9.577423-9.617355-25.137409-9.647048-34.750668-0.070648L512.119795 477.137729 184.520518 150.868479c-9.616331-9.577423-25.176316-9.545683-34.751692 0.070648-9.577423 9.616331-9.545683 25.174268 0.070648 34.751692l327.457981 326.127953-327.457981 326.128978c-9.616331 9.577423-9.647048 25.135361-0.070648 34.751692a24.496456 24.496456 0 0 0 17.41117 7.231702 24.500552 24.500552 0 0 0 17.340522-7.162078L512.119795 546.499816l327.599276 326.26925a24.492361 24.492361 0 0 0 17.340522 7.162078 24.5026 24.5026 0 0 0 17.41117-7.231702c9.577423-9.617355 9.545683-25.175292-0.070648-34.751692L546.942134 511.818772z"
                  fill="#bfbfbf"
                  p-id="2218"
                ></path>
              </svg>
            </ModalContentClose>
          ) : null}
          <ModalContentHeader>{title}</ModalContentHeader>
          <ModalContentBody>
            {isRenderHTML ? (
              <div dangerouslySetInnerHTML={{ __html: String(children) }} />
            ) : (
              children
            )}
          </ModalContentBody>
          {footer === null ? null : footer ? (
            footer
          ) : (
            <ModalContentFooter>
              {showCancel ? (
                <ModalFooterCancelButton>
                  {cancelText ? cancelText : '取消'}
                </ModalFooterCancelButton>
              ) : null}
              <ModalFooterSureButton>
                {okText ? okText : '确定'}
              </ModalFooterSureButton>
            </ModalContentFooter>
          )}
        </ModalContent>
      </ModalWrapper>
    </ModalContainer>
  ) : null;
};

const destroyFns: Array<() => void> = [];
const closeFns: Array<() => void> = [];

interface MethodModalProps extends ModalProps {}
type ConfirmConfig = ModalProps | ((config: ModalProps) => ModalProps);
export type ReturnType = {
  destroy: () => void;
  close: () => void;
  update: (updateConfig: ModalProps) => void;
};
export type ModalType = (config: ModalProps) => ReturnType;

Modal.confirm = (config: MethodModalProps) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig = { ...config, close, visible: true } as any;
  function destroy() {
    const unMountResult = ReactDOM.unmountComponentAtNode(div);
    if (unMountResult && div.parentElement) {
      div.parentElement.removeChild(div);
    }
    for (let i = 0, l = destroyFns.length; i < l; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }
  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
    };
    render(currentConfig);
  }
  function render(props: MethodModalProps) {
    setTimeout(() => {
      ReactDOM.render(<Modal {...props}>{props.content}</Modal>, div);
    });
  }
  function update(updateConfig: ConfirmConfig) {
    if (typeof updateConfig === 'function') {
      currentConfig = updateConfig(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...updateConfig,
      };
    }
    render(currentConfig);
  }
  render(currentConfig);
  closeFns.push(close);
  destroyFns.push(destroy);
  if (config.autoClose) {
    let autoCloseTime = Number(config.autoCloseTime);
    autoCloseTime = Number.isNaN(autoCloseTime)
      ? 1000
      : Math.min(10000, autoCloseTime);
    setTimeout(() => {
      destroy();
    }, autoCloseTime);
  }
  return {
    destroy,
    close,
    update,
  };
};

Modal.closeAll = () => {
  closeFns.forEach((close: Function) => {
    close && close();
  });
};

Modal.destroyAll = () => {
  destroyFns.forEach((destroy: Function) => {
    destroy && destroy();
  });
};

export default Modal;
