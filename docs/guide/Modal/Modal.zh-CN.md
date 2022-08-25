| 标题     | 标签        | 首次添加时间 | 更新时间  |
| -------- | ----------- | ------------ | --------- |
| 弹框组件 | 组件,副作用 | 2022/7/26    | 2022/7/26 |

渲染一个 Modal 组件，可通过事件控制。

- 定义一个 keydownHandler 来处理所有的键盘事件并在 Esc 键被按下时调用 onClose。
- 使用 useEffect() 挂钩向 Document 添加或删除 keydown 事件侦听器，为每个事件调用 keydownHandler。
- 添加一个样式化的 `<svg>` 元素作为关闭按钮，点击时调用 onClose。
- 使用从父级传下来的 visible 属性来决定是否显示模态框。
- 要使用该组件，只需导入 Modal 一次，然后通过将布尔值传递给可见属性来显示它。

#### Modal.less

```less
@black: rgba(0, 0, 0, 1);
@baseSelector: modal;

.@{baseSelector}-container {
  .base-fixed {
    inset: 0;
    position: fixed;
  }

  .@{baseSelector}-mask {
    height: 100%;
    background-color: fade(@black, 65%);
    .base-fixed();
  }

  .@{baseSelector}-wrapper {
    .base-fixed();
    overflow: auto;
    outline: 0;
    z-index: 1000;

    .@{baseSelector}-box {
      box-sizing: border-box;
      padding: 0 0 24px;
      color: fadeout(@black, 15%);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5715;
      list-style: none;
      font-feature-settings: 'tnum';
      pointer-events: none;
      position: relative;
      top: 100px;
      width: auto;
      max-width: calc(100vw - 32px);
      margin: 0 auto;

      .@{baseSelector}-content {
        position: relative;
        background-color: #fff;
        background-clip: padding-box;
        border: 0;
        border-radius: 2px;
        box-shadow: 0 3px 6px -4px fade(@black, 5%), 0 6px 16px fade(@black, 7%),
          0 9px 28px 8px fade(@black, 9%);
        pointer-events: auto;

        &-header {
          padding: 16px 24px;
          color: fade(@black, 90%);
          background: #fff;
          border-bottom: 1px solid fade(@black, 6%);
          border-radius: 2px 2px 0 0;
          margin: 0;
          font-weight: 500;
          font-size: 16px;
          line-height: 22px;
          word-wrap: break-word;
        }

        &-body {
          padding: 24px;
          font-size: 14px;
          line-height: 1.5715;
          word-wrap: break-word;
        }

        &-footer {
          padding: 10px 16px;
          text-align: right;
          background: 0 0;
          border-top: 1px solid fadeout(@black, 94%);
          border-radius: 0 0 2px 2px;

          &-button {
            line-height: 1.5715;
            position: relative;
            display: inline-block;
            font-weight: 400;
            white-space: nowrap;
            text-align: center;
            background-image: none;
            border: 1px solid transparent;
            box-shadow: 0 2px fadeout(@black, 95%);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            touch-action: manipulation;
            height: 32px;
            padding: 4px 15px;
            font-size: 14px;
            letter-spacing: 2px;
            border-radius: 2px;
            color: fade(@black, 97%);
            border-color: #d9d9d9;
            background: #fff;
            border-radius: 4px;

            &-cancel {
              margin-right: 15px;

              &:hover,
              &:active {
                border-color: #2499f1;
                color: #2396ef;
              }
            }

            &-sure {
              background-color: #34a1f5;
              border-color: #1e9af8;
              color: #fff;

              &:hover,
              &:active {
                background-color: #0f8ff1;
                border-color: #1794f5;
              }
            }
          }
        }

        &-close {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 10;
          padding: 0;
          color: fadeout(@black, 75%);
          font-weight: 700;
          text-decoration: none;
          background: 0 0;
          border: 0;
          outline: 0;
          cursor: pointer;
          width: 54px;
          height: 54px;
          font-size: 16px;
          font-style: normal;
          line-height: 54px;
          text-align: center;
          text-transform: none;
          text-rendering: auto;
          transition: color 0.3s;

          & .close-icon {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
}
```

#### Modal.tsx

```tsx pure
import React, { useState, useEffect } from 'react';
import type { ReactNode, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';
import './Modal.less';

export interface ModalProps extends Record<string, any> {
  mask: boolean;
  footer: ReactNode;
  title: ReactNode;
  visible: boolean;
  showCancel: boolean;
  maskClosable: boolean;
  onMask: Function;
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
  keyboard: boolean;
}

const Modal = (props: Partial<ModalProps>) => {
  const {
    mask = true,
    footer,
    children,
    isRenderHTML,
    title,
    visible,
    onCancel,
    maskClosable = true,
    onOk,
    showCancel,
    showClose = true,
    onClose,
    okText,
    cancelText,
    width = 520,
    isDestroy = true,
    keyboard = true,
    onMask,
    ...rest
  } = props;

  const [modalVisible, setModalVisible] = useState(false);

  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        if (typeof onCancel === 'function' && keyboard) {
          onCancel();
        }
        break;
      default:
    }
  };

  useEffect(() => {
    if (typeof visible === 'boolean') {
      setModalVisible(visible);
    }
  }, [visible]);

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  // Set the width
  const contentStyle: Partial<Record<'width', ModalProps['width']>> = {};
  if (typeof width === 'number') {
    contentStyle['width'] = width + 'px';
  } else if (typeof width === 'string') {
    contentStyle['width'] = width;
  }

  return isDestroy && !modalVisible ? null : (
    <div
      className="modal-container"
      {...rest}
      style={{ display: modalVisible ? 'block' : 'none' }}
    >
      <div className="modal-wrapper">
        {mask ? (
          <div
            className="modal-mask"
            onClick={(e: SyntheticEvent) => {
              if (maskClosable) {
                if (typeof onMask === 'function') {
                  return onMask(e);
                }
                if (typeof onCancel === 'function') {
                  onCancel(e);
                }
              }
            }}
          />
        ) : null}
        <div className="modal-box" style={contentStyle}>
          <div className="modal-content">
            {showClose ? (
              <div
                className="modal-content-close"
                onClick={(e: SyntheticEvent) => {
                  if (typeof onCancel === 'function') {
                    onCancel(e);
                  }
                }}
              >
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
              </div>
            ) : null}
            {title ? <div className="modal-content-header">{title}</div> : null}
            <div className="modal-content-body">
              {isRenderHTML ? (
                <div dangerouslySetInnerHTML={{ __html: String(children) }} />
              ) : (
                children
              )}
            </div>
            {footer === null ? null : footer ? (
              footer
            ) : (
              <div className="modal-content-footer">
                {showCancel ? (
                  <button
                    type="button"
                    className="modal-content-footer-button modal-content-footer-button-cancel"
                    onClick={(e: SyntheticEvent) => {
                      if (typeof onCancel === 'function') {
                        onCancel(e);
                      }
                    }}
                  >
                    {cancelText ? cancelText : '取消'}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="modal-content-footer-button modal-content-footer-button-sure"
                  onClick={(e: SyntheticEvent) => {
                    if (typeof onOk === 'function') {
                      onOk(e);
                    } else {
                      if (typeof onCancel === 'function') {
                        onCancel(e);
                      }
                    }
                  }}
                >
                  {okText ? okText : '确定'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const destroyFns: Array<() => void> = [];
const closeFns: Array<() => void> = [];

interface MethodModalProps extends ModalProps {}
export type ConfirmConfig = ModalProps | ((config: ModalProps) => ModalProps);
export type ReturnType = {
  destroy: () => void;
  close: () => void;
  update: (updateConfig: ModalProps) => void;
};
export type ModalType = (config: ModalProps) => ReturnType;

Modal.confirm = (config: Partial<MethodModalProps> | string) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const defaultConfig = {
    visible: true,
    showCancel: true,
    onOk: () => destroy(),
    onCancel: () => destroy(),
    onMask: () => destroy(),
  };
  let currentConfig =
    typeof config === 'object' && config
      ? {
          ...config,
          ...defaultConfig,
        }
      : ({
          content: config,
          ...defaultConfig,
        } as any);
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
  if (currentConfig.autoClose) {
    let autoCloseTime = Number(currentConfig.autoCloseTime);
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

type GlobalModal = typeof Modal;
export { GlobalModal };
export default Modal;
```

#### Modal.jsx

```jsx | pure
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../Modal.less';

const Modal = (props) => {
  const {
    mask = true,
    footer,
    children,
    isRenderHTML,
    title,
    visible,
    onCancel,
    maskClosable = true,
    onOk,
    showCancel,
    showClose = true,
    onClose,
    okText,
    cancelText,
    width = 520,
    isDestroy = true,
    keyboard = true,
    onMask,
    ...rest
  } = props;

  const [modalVisible, setModalVisible] = useState(false);

  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        if (typeof onCancel === 'function' && keyboard) {
          onCancel();
        }
        break;
      default:
    }
  };

  useEffect(() => {
    if (typeof visible === 'boolean') {
      setModalVisible(visible);
    }
  }, [visible]);

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  // Set the width
  const contentStyle = {};
  if (typeof width === 'number') {
    contentStyle['width'] = width + 'px';
  } else if (typeof width === 'string') {
    contentStyle['width'] = width;
  }

  return isDestroy && !modalVisible ? null : (
    <div
      className="modal-container"
      {...rest}
      style={{ display: modalVisible ? 'block' : 'none' }}
    >
      <div className="modal-wrapper">
        {mask ? (
          <div
            className="modal-mask"
            onClick={(e) => {
              if (maskClosable) {
                if (typeof onMask === 'function') {
                  return onMask(e);
                }
                if (typeof onCancel === 'function') {
                  onCancel(e);
                }
              }
            }}
          />
        ) : null}
        <div className="modal-box" style={contentStyle}>
          <div className="modal-content">
            {showClose ? (
              <div
                className="modal-content-close"
                onClick={(e) => {
                  if (typeof onCancel === 'function') {
                    onCancel(e);
                  }
                }}
              >
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
              </div>
            ) : null}
            {title ? <div className="modal-content-header">{title}</div> : null}
            <div className="modal-content-body">
              {isRenderHTML ? (
                <div dangerouslySetInnerHTML={{ __html: String(children) }} />
              ) : (
                children
              )}
            </div>
            {footer === null ? null : footer ? (
              footer
            ) : (
              <div className="modal-content-footer">
                {showCancel ? (
                  <button
                    type="button"
                    className="modal-content-footer-button modal-content-footer-button-cancel"
                    onClick={(e) => {
                      if (typeof onCancel === 'function') {
                        onCancel(e);
                      }
                    }}
                  >
                    {cancelText ? cancelText : '取消'}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="modal-content-footer-button modal-content-footer-button-sure"
                  onClick={(e) => {
                    if (typeof onOk === 'function') {
                      onOk(e);
                    } else {
                      if (typeof onCancel === 'function') {
                        onCancel(e);
                      }
                    }
                  }}
                >
                  {okText ? okText : '确定'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const destroyFns = [];
const closeFns = [];

Modal.confirm = (config) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const defaultConfig = {
    visible: true,
    showCancel: true,
    onOk: () => destroy(),
    onCancel: () => destroy(),
    onMask: () => destroy(),
  };
  let currentConfig =
    typeof config === 'object' && config
      ? {
          ...config,
          ...defaultConfig,
        }
      : {
          content: config,
          ...defaultConfig,
        };
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
  function render(props) {
    setTimeout(() => {
      ReactDOM.render(<Modal {...props}>{props.content}</Modal>, div);
    });
  }
  function update(updateConfig) {
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
  if (currentConfig.autoClose) {
    let autoCloseTime = Number(currentConfig.autoCloseTime);
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
  closeFns.forEach((close) => {
    close && close();
  });
};

Modal.destroyAll = () => {
  destroyFns.forEach((destroy) => {
    destroy && destroy();
  });
};

export default Modal;
```

示例:

<code src="./Demo.zh-CN.tsx"></code>

jsx 示例:

<code src="./jsx/Demo.zh-CN.jsx"></code>
