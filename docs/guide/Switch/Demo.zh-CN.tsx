import React, { useState } from 'react';
import Switch from './Switch';
const Demo = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Switch disabled>被禁用的开关组件</Switch>
      <Switch checked={checked} onChange={(v) => setChecked(v)}>
        {checked ? '开启' : '关闭'}
      </Switch>
    </>
  );
};

export default Demo;
