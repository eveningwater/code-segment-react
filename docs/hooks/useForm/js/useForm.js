import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => {
      const target = e.target;
      setValues({
        ...values,
        [target?.name]: target.value,
      });
    },
  ];
};

export default useForm;
