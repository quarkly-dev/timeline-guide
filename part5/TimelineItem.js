import React, { useMemo } from 'react';

import { useOverrides } from '@quarkly/components';
import { Box, Text, Icon } from '@quarkly/widgets';

const overrides = {
  'Timeline Item': { kind: 'Box' },
  'Timeline Point': { kind: 'Icon' },
  'Timeline Dates': { kind: 'Text' },
  'Timeline Title': { kind: 'Text' },
  'Timeline Descr': { kind: 'Text' },
};

const styles = {
  left: {
    itemMarginLeft: '30px',
    itemMarginRight: '0px',
    itemWidth: 'calc(100% - 30px)',
    itemAlignSelf: 'flex-start',
    itemTextAlign: 'left',
    pointLeft: '-46px',
    pointRight: 'auto',
  },
  right: {
    itemMarginLeft: '0px',
    itemMarginRight: '30px',
    itemWidth: 'calc(100% - 30px)',
    itemAlignSelf: 'flex-end',
    itemTextAlign: 'right',
    pointLeft: 'auto',
    pointRight: '-46px',
  }
};

const Item = ({
  index,
  alignDesktop,
  alignMobile,
  breakpoint,
  ...props
}) => {
  if (! (index && alignDesktop && alignMobile && breakpoint)) {
    return;
  }
  
  useMemo(() => {
    styles['center (from left)'] = {
      itemMarginLeft: index % 2 ? '30px' : '',
      itemMarginRight: index % 2 ? '' : '30px',
      itemWidth: 'calc(50% - 30px)',
      itemAlignSelf: index % 2 ? 'flex-end' : 'flex-start',
      itemTextAlign: index % 2 ? 'left' : 'right',
      pointLeft: index % 2 ? '-50px' : '',
      pointRight: index % 2 ? '' : '-50px',
    };
    styles['center (from right)'] = {
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
  
  const { override, rest } = useOverrides(props, overrides);
  
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
      
      {...override('Timeline Item')}
      {...rest}
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
        
        {...override('Timeline Point')}
      />
      <Text
        margin="0 0 8px"
        font="--font-base"
        color="--color-darkL1"
        
        {...override('Timeline Dates')}
      >
        {override('Timeline Dates').children || '18:00 - 22:00'}
      </Text>
      <Text
        margin="0 0 6px"
        font="--font-headline3"
        color="--color-dark"
        
        {...override('Timeline Title')}
      >
        {override('Timeline Title').children || 'Event name'}
      </Text>
      <Text
        margin="0"
        font="--font-base"
        color="--color-darkL2"
        
        {...override('Timeline Descr')}
      >
        {override('Timeline Descr').children || 'Description'}
      </Text>
    </Box>
  );
};

export default Object.assign(Item, {
  title: 'Timeline Item',
  description: {
    en: 'Awesome Timeline Item component!',
  },
  overrides,
});
