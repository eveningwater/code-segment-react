import React, { useState, useEffect } from 'react';
import useDelayedState from './useDelayedState';
import Select from '../../guide/Select/Select';
import type { OptionValueProps } from '../../guide/Select/Option';

const { Option } = Select;

const Demo = () => {
  const [branches, setBranches] = useState<string[]>([]);

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
      <Select onChange={(e: OptionValueProps) => setSelectedBranch(e.value)}>
        {branches?.map((item) => (
          <Option key={item} value={item} label={item}>
            {item}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Demo;
