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
