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
      setBranches(['主', '分期', '测试', '开发']);
    }, 2000);
    return () => {
      handle && clearTimeout(handle);
    };
  }, []);

  return (
    <div>
      <p>选中的分支: {selectedBranch || ''}</p>
      <Select onChange={(e: OptionValueProps) => setSelectedBranch(e.value)}>
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
