import React from 'react';
import Accordion from './Accordion';

const { AccordionItem } = Accordion;

const Demo = () => {
  return (
    <Accordion defaultIndex="1" onItemClick={console.log}>
      <AccordionItem label="A" index="1">
        Lorem ipsum
      </AccordionItem>
      <AccordionItem label="B" index="2">
        Dolor sit amet
      </AccordionItem>
    </Accordion>
  );
};

export default Demo;
