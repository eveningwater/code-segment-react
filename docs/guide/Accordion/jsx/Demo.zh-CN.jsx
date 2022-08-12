import React from 'react';
import Accordion from './Accordion';
const { AccordionItem } = Accordion;
const Demo = () => {
  return (
    <Accordion defaultIndex="1" onItemClick={console.log}>
      <AccordionItem label="标题1" index="1">
        项目1
      </AccordionItem>
      <AccordionItem label="标题2" index="2">
        项目2
      </AccordionItem>
    </Accordion>
  );
};

export default Demo;
