import { useState } from 'react';
import type { ChangeEventHandler } from 'react';

const useForm = (
  initialValues: Record<string, any>,
): [Record<string, any>, (e: unknown) => void] => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e: unknown) => {
      const target = (e as MouseEvent).target as HTMLInputElement;
      setValues({
        ...values,
        [target?.name]: target.value,
      });
    },
  ];
};

export default useForm;
