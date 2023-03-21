import React, { useState } from 'react';
import TreeView from './TreeView';
import Button from '../../Button/jsx/Button';
const data = {
  lorem: {
    ipsum: 'dolor sit',
    amet: {
      consectetur: 'adipiscing',
      elit: [
        'duis',
        'vitae',
        {
          semper: 'orci',
        },
        {
          est: 'sed ornare',
        },
        'etiam',
        ['laoreet', 'tincidunt'],
        ['vestibulum', 'ante'],
      ],
    },
    ipsum: 'primis',
  },
};
const Demo = () => {
  const [isExpand, setIsExpand] = useState(true);
  return (
    <>
      <TreeView data={data} name="data" isParentToggled={isExpand} />
      <Button type="primary" onClick={() => setIsExpand(!isExpand)}>
        clicked me
      </Button>
    </>
  );
};

export default Demo;
