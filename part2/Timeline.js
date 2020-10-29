import React from 'react';

import atomize from "@quarkly/atomize";
import { useOverrides } from '@quarkly/components';
import { Box, Text, Icon } from '@quarkly/widgets';

const overrides = {
  'Timeline Line': {
    kind: 'Box'
  },
  'Timeline Item': {
    kind: 'Box'
  },
  'Timeline Point': {
    kind: 'Icon'
  },
  'Timeline Dates': {
    kind: 'Text'
  },
  'Timeline Title': {
    kind: 'Text'
  },
  'Timeline Descr': {
    kind: 'Text'
  },
};

const Line = ({ override }) => {
  return (
    <Box
      top="0"
      left="19px"
      min-width="2px"
      min-height="100%"
      background="--color-dark"
      position="absolute"
      opacity=".1"
      
      {...override('Timeline Line')}
    />
  );
};

const Item = ({ index, override }) => {
  return (
    <Box
      margin-left="30px"
      padding-bottom="30px"
      box-sizing="border-box"
      position="relative"
      
      {...override('Timeline Item', `Timeline ${index} Item`)}
    >
      <Icon
        top="-8px"
        left="-46px"
        width="40px"
        height="40px"
        color="--color-dark"
        position="absolute"
        
        size="40px"
        category="bs"
        icon="BsDot"
        
        {...override('Timeline Point', `Timeline ${index} Point`)}
      />
      <Text
        margin="0 0 8px"
        font="--font-base"
        color="--color-darkL1"
        
        {...override('Timeline Dates', `Timeline ${index} Dates`)}
      >
        {override(`Timeline ${index} Dates`).children || '18:00 - 22:00'}
      </Text>
      <Text
        margin="0 0 6px"
        font="--font-headline3"
        color="--color-dark"
        
        {...override('Timeline Title', `Timeline ${index} Title`)}
      >
        {override(`Timeline ${index} Title`).children || 'Event name'}
      </Text>
      <Text
        margin="0"
        font="--font-base"
        color="--color-darkL2"
        
        {...override('Timeline Descr', `Timeline ${index} Descr`)}
      >
        {override(`Timeline ${index} Descr`).children || 'Description'}
      </Text>
    </Box>
  );
};

const Wrapper = atomize.div({
  effects: { hover: ":hover" },
});

const Timeline = props => {
  const items = 3;
  
  [...new Array(items)].map((i, index) => {
    overrides[`Timeline ${index} Item`] = { kind: 'Box' }
    overrides[`Timeline ${index} Point`] = { kind: 'Icon' }
    overrides[`Timeline ${index} Dates`] = { kind: 'Text' }
    overrides[`Timeline ${index} Title`] = { kind: 'Text' }
    overrides[`Timeline ${index} Descr`] = { kind: 'Text' }
  });
  
  const { override, rest } = useOverrides(props, overrides);
  
  return (
    <Wrapper
      padding="0 16px"
      position="relative"
      z-index="1"
      
      box-shadow="--xl"
      hover-box-shadow="--xxl"
      
      {...rest}
    >
      <Line
        override={override}
      />
      { [...new Array(items)].map((i, index) => (
        <Item
          index={index}
          override={override}
        />
      ))}
    </Wrapper>
  );
};

export default Object.assign(Timeline, {
  title: 'Timeline',
  description: {
    en: 'Awesome Timeline component!',
  },
  overrides,
});
