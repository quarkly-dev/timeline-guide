import React from 'react';

import atomize from "@quarkly/atomize";
import { Box, Text, Icon } from '@quarkly/widgets';

const Line = () => {
  return (
    <Box
      top="0"
      left="19px"
      min-width="2px"
      min-height="100%"
      background="--color-dark"
      position="absolute"
      opacity=".1"
    />
  );
};

const Item = () => {
  return (
    <Box
      margin-left="30px"
      padding-bottom="30px"
      box-sizing="border-box"
      position="relative"
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
      />
      <Text
        margin="0 0 8px"
        font="--font-base"
        color="--color-darkL1"
      >
        {'18:00 - 22:00'}
      </Text>
      <Text
        margin="0 0 6px"
        font="--font-headline3"
        color="--color-dark"
      >
        {'Event name'}
      </Text>
      <Text
        margin="0"
        font="--font-base"
        color="--color-darkL2"
      >
        {'Description'}
      </Text>
    </Box>
  );
};

const Wrapper = atomize.div({
  effects: { hover: ":hover" },
});

const Timeline = props => {
  return (
		<Wrapper
      padding="0 16px"
			position="relative"
      z-index="1"
      
      box-shadow="--xl"
      hover-box-shadow="--xxl"
      
      {...props}
    >
      <Line />
      <Item />
      <Item />
      <Item />
		</Wrapper>
	);
};

export default Object.assign(Timeline, {
	title: 'Timeline',
	description: {
		en: 'Awesome Timeline component!',
	},
});
