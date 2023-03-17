import React from 'react';
import Tabs from './Tabs';
const { TabItem } = Tabs;
const Demo = () => {
  const onTabClickHandler = (index) => console.log(index);
  return (
    <Tabs defaultIndex={1} onTabClick={onTabClickHandler}>
      <TabItem index={1} label="选项卡1">
        选项卡内容1
      </TabItem>
      <TabItem index={2} label="选项卡2">
        选项卡内容2
      </TabItem>
    </Tabs>
  );
};

export default Demo;
