import React, { useMemo } from 'react';

import atomize from "@quarkly/atomize";
import { useOverrides } from '@quarkly/components';
import { Box, Text, Icon } from '@quarkly/widgets';

const overrides = {
  'Timeline Line': { kind: 'Box' },
  'Timeline Item': { kind: 'Box' },
  'Timeline Point': { kind: 'Icon' },
  'Timeline Dates': { kind: 'Text' },
  'Timeline Title': { kind: 'Text' },
  'Timeline Descr': { kind: 'Text' },
};

const styles = {
  'center (from left)': {
    lineLeft: 'calc(50% - 1px)',
    lineRight: 'auto',
  },
  'center (from right)': {
    lineLeft: 'auto',
    lineLeft: 'calc(50% - 1px)',
  },
  'left': {
    itemMarginLeft: '30px',
    itemMarginRight: '0px',
    itemWidth: 'calc(100% - 30px)',
    itemAlignSelf: 'flex-start',
    itemTextAlign: 'left',
    pointLeft: '-46px',
    pointRight: 'auto',
    lineLeft: '19px',
    lineRight: 'auto',
  },
  'right': {
    itemMarginLeft: '0px',
    itemMarginRight: '30px',
    itemWidth: 'calc(100% - 30px)',
    itemAlignSelf: 'flex-end',
    itemTextAlign: 'right',
    pointLeft: 'auto',
    pointRight: '-46px',
    lineLeft: 'auto',
    lineRight: '19px',
  },
};

const Line = ({
  alignDesktop,
  alignMobile,
  breakpoint,
  override,
}) => {
  useMemo(() => {
    overrides['Timeline Line'].props = {
      [`${breakpoint}-left`]: styles[alignMobile].lineLeft,
      [`${breakpoint}-right`]: styles[alignMobile].lineRight,
    };
  }, [alignMobile, breakpoint]);
  
  return (
    <Box
      top="0"
      left="19px"
      min-width="2px"
      min-height="100%"
      background="--color-dark"
      position="absolute"
      opacity=".1"
      
      left={styles[alignDesktop].lineLeft}
      right={styles[alignDesktop].lineRight}
      
      {...override('Timeline Line')}
    />
  );
};

const Item = ({
  index,
  alignDesktop,
  alignMobile,
  breakpoint,
  override,
}) => {
  useMemo(() => {
    styles['center (from left)'] = {
      ...styles['center (from left)'],
      itemMarginLeft: index % 2 ? '30px' : '',
      itemMarginRight: index % 2 ? '' : '30px',
      itemWidth: 'calc(50% - 30px)',
      itemAlignSelf: index % 2 ? 'flex-end' : 'flex-start',
      itemTextAlign: index % 2 ? 'left' : 'right',
      pointLeft: index % 2 ? '-50px' : '',
      pointRight: index % 2 ? '' : '-50px',
    };
    styles['center (from right)'] = {
      ...styles['center (from right)'],
      itemMarginLeft: index % 2 ? '' : '30px',
      itemMarginRight: index % 2 ? '30px' : '',
      itemWidth: 'calc(50% - 30px)',
      itemAlignSelf: index % 2 ? 'flex-start' : 'flex-end',
      itemTextAlign: index % 2 ? 'right' : 'left',
      pointLeft: index % 2 ? '' : '-50px',
      pointRight: index % 2 ? '-50px' : '',
    };
  }, [index, alignDesktop]);
  
  useMemo(() => {
    overrides['Timeline Item'].props = {
      [`${breakpoint}-margin-left`]: styles[alignMobile].itemMarginLeft,
      [`${breakpoint}-margin-right`]: styles[alignMobile].itemMarginRight,
      [`${breakpoint}-width`]: styles[alignMobile].itemWidth,
      [`${breakpoint}-align-self`]: styles[alignMobile].itemAlignSelf,
      [`${breakpoint}-text-align`]: styles[alignMobile].itemTextAlign,
    };
    overrides['Timeline Point'].props = {
      [`${breakpoint}-left`]: styles[alignMobile].pointLeft,
      [`${breakpoint}-right`]: styles[alignMobile].pointRight,
    };
  }, [alignMobile, breakpoint]);
  
  return (
    <Box
      margin-left={styles[alignDesktop].itemMarginLeft}
      margin-right={styles[alignDesktop].itemMarginRight}
      padding-bottom="30px"
      width={styles[alignDesktop].itemWidth}
      align-self={styles[alignDesktop].itemAlignSelf}
      text-align={styles[alignDesktop].itemTextAlign}
      box-sizing="border-box"
      position="relative"
      
      {...override('Timeline Item', `Timeline ${index} Item`)}
    >
      <Icon
        top="-8px"
        left={styles[alignDesktop].pointLeft}
        right={styles[alignDesktop].pointRight}
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

const Timeline = ({
  items,
  alignDesktop,
  alignMobile,
  breakpoint,
  ...props
}) => {
  items = parseInt(items) || 0;
  
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
      padding="30px 16px 0"
      width="100%"
      flex-direction="column"
      box-sizing="border-box"
      position="relative"
      display="flex"
      z-index="1"
      
      box-shadow="--xl"
      hover-box-shadow="--xxl"
      
      {...rest}
    >
      <Line
        alignDesktop={alignDesktop}
        alignMobile={alignMobile}
        breakpoint={breakpoint}
        override={override}
      />
      { [...new Array(items)].map((i, index) => (
        <Item
          index={index}
          alignDesktop={alignDesktop}
          alignMobile={alignMobile}
          breakpoint={breakpoint}
          override={override}
        />
      ))}
    </Wrapper>
  );
};

const propInfo = {
  items: {
    title: 'Number of elements on the list',
    description: {
      en: 'Specifies the number of displayed elements on the timeline list',
    },
    control: 'input',
    type: 'string',
    category: 'Content',
    weight: 1,
  },
  alignDesktop: {
    title: 'Element alignment for the desktop view',
    description: {
      en: 'Specifies the way to align elements for the desktop view (by default)',
    },
    control: 'select',
    variants: [
      'left',
      'center (from left)',
      'center (from right)',
      'right'
    ],
    type: 'string',
    category: 'Alignment',
    weight: 1,
  },
  alignMobile: {
    title: 'Element alignment for the mobile view',
    description: {
      en: 'Specifies the way to align elements for the mobile view',
    },
    control: 'radio-group',
    variants: [
      'left',
      'right'
    ],
    type: 'string',
    category: 'Alignment',
    weight: 1,
  },
  breakpoint: {
    title: 'The mobile view starts with a breakpoint',
    description: {
      en: 'Specifies the breakpoint name from which the mobile view alignment will be applied',
    },
    control: 'input',
    type: 'string',
    category: 'Alignment',
    weight: 1,
  },
};

const defaultProps = {
  items: 3,
  alignDesktop: 'left',
  alignMobile: 'left',
  breakpoint: 'sm',
}

export default Object.assign(Timeline, {
  title: 'Timeline',
  description: {
    en: 'Awesome Timeline component!',
  },
  propInfo,
  defaultProps,
  overrides,
});
