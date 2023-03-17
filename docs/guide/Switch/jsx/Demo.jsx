import React, { useState } from 'react';
import Switch from './Switch';
const Demo = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Switch disabled>Disabled switch component</Switch>
      <Switch checked={checked} onChange={(v) => setChecked(v)}>
        {checked ? 'on' : 'off'}
      </Switch>
    </>
  );
};

export default Demo;
