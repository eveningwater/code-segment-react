import React, { useState } from 'react';
import { ButtonProps, Modal, ModalFuncProps, ModalProps } from 'antd';

interface LoadingModalProps
  extends Omit<ModalProps, 'confirmLoading' & 'onOk'> {
  duration?: number;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
}
const LoadingModal = (props: LoadingModalProps) => {
  const { duration, onOk, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const onOkHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (onOk) {
      setLoading(true);
      onOk(e);
      setTimeout(() => {
        setLoading(false);
      }, Math.min(Math.min(10000, duration || 1000)));
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
  options: Omit<ModalFuncProps, 'type' & 'onOk'> &
    Pick<LoadingModalProps, 'duration' | 'onOk'> &
    ModalOkButtonProps,
) => {
  const { duration, onOk, ...rest } = options;
  let modal: ModalInstance | null = null;
  const modalOptions = { ...rest, okButtonProps: { loading: false } };
  const onOkHandler: ModalFuncProps['onOk'] = (e) => {
    modalOptions.okButtonProps.loading = true;
    modal?.update(modalOptions);
    setTimeout(() => {
      modalOptions.okButtonProps.loading = false;
      if (onOk) {
        onOk(e);
      }
      modal?.update(modalOptions);
    }, Math.min(Math.min(10000, duration || 1000)));
  };
  modal = Modal.confirm({ ...modalOptions, onOk: onOkHandler });
  return modal;
};
export default LoadingModal;
