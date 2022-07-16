import React, { useState } from 'react';
import { ButtonProps, Modal, ModalFuncProps, ModalProps } from 'antd';

interface LoadingModalProps
  extends Omit<ModalProps, 'confirmLoading' | 'onOk'> {
  duration?: number;
  isUseDuration?: boolean;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
}
const LoadingModal = (props: LoadingModalProps) => {
  const { duration, isUseDuration, onOk, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const onOkHandler = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (onOk) {
      setLoading(true);
      if (isUseDuration) {
        setTimeout(() => {
          setLoading(false);
          onOk(e);
        }, Math.min(Math.min(10000, duration || 1000)));
      } else {
        try {
          await onOk(e);
        } finally {
          setLoading(false);
        }
      }
    }
  };
  return <Modal {...rest} confirmLoading={loading} onOk={onOkHandler} />;
};
type ModalOkButtonProps = Omit<ButtonProps, 'loading'>;
type ModalInstance = {
  destroy: (...args: any[]) => void;
  update: (
    configUpdate:
      | ModalFuncProps
      | ((prevConfig: ModalFuncProps) => ModalFuncProps),
  ) => void;
};
export const onLoadingModal = (
  options: Omit<ModalFuncProps, 'type' | 'onOk' | 'okButtonProps'> &
    Pick<LoadingModalProps, 'duration' | 'isUseDuration'> & {
      okButtonProps?: ModalOkButtonProps;
      onOk?: ModalFuncProps['onOk'];
    },
) => {
  const { duration, isUseDuration, onOk, okButtonProps, ...rest } = options;
  let modal: ModalInstance | null = null;
  const onOkHandler: ModalFuncProps['onOk'] = async (close) => {
    modalOptions.okButtonProps.loading = true;
    modal?.update(modalOptions);
    if (isUseDuration) {
      setTimeout(() => {
        modalOptions.okButtonProps.loading = false;
        if (onOk) {
          onOk(close);
        }
        modal?.update(modalOptions);
      }, Math.min(Math.min(10000, duration || 1000)));
    } else {
      try {
        if (onOk) {
          await onOk(close);
        }
      } finally {
        modalOptions.okButtonProps.loading = false;
        modal?.update(modalOptions);
      }
    }
  };
  const modalOptions = {
    ...rest,
    okButtonProps: { loading: false, ...okButtonProps },
    onOk: (close) => {
      onOkHandler(close);
    },
  };
  modal = Modal.confirm(modalOptions);
  return modal;
};
export default LoadingModal;
