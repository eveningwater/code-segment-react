import React, { useState, useEffect } from 'react';
import useDelayedState from './useDelayedState';
import Select from '../../../guide/Select/jsx/Select';

const { Option } = Select;

const Demo = () => {
  const [branches, setBranches] = useState([]);

  const [selectedBranch, setSelectedBranch] = useDelayedState(
    branches[0],
    branches.length,
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      setBranches(['master', 'staging', 'test', 'dev']);
    }, 2000);
    return () => {
      handle && clearTimeout(handle);
    };
  }, []);

  return (
    <div>
      <p>Selected branch: {selectedBranch || ''}</p>
      <Select onChange={(e) => setSelectedBranch(e.value)}>
        {branches?.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Demo;
