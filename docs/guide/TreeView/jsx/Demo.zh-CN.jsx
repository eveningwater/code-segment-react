import React, { useState } from 'react';
import TreeView from './TreeView';
import Button from '../../Button/jsx/Button';
const data = {
  eveningwater: {
    name: '夕水',
    info: {
      age: 27,
      hobby: [
        '唱歌',
        '代码',
        {
          chess: '象棋',
        },
        {
          game: '欢乐斗地主',
        },
        '穿越火线',
        ['书', '小说'],
        ['抓娃娃', '航海王'],
      ],
    },
  },
};
const Demo = () => {
  const [isExpand, setIsExpand] = useState(true);
  return (
    <>
      <TreeView data={data} name="data" isParentToggled={isExpand} />
      <Button type="primary" onClick={() => setIsExpand(!isExpand)}>
        点击我
      </Button>
    </>
  );
};

export default Demo;
