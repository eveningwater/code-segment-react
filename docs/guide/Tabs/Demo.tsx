import React from 'react';
import Tabs from './Tabs';
const { TabItem } = Tabs;
const Demo = () => {
  const onTabClickHandler = (index: string | number) => console.log(index);
  return (
    <Tabs defaultIndex={1} onTabClick={onTabClickHandler}>
      <TabItem index={1} label="A">
        Lorem ipsum
      </TabItem>
      <TabItem index={2} label="B">
        Dolor sit amet
      </TabItem>
    </Tabs>
  );
};

export default Demo;
