import React, { useMemo } from 'react';

import { useOverrides } from '@quarkly/components';
import { Box } from '@quarkly/widgets';

const overrides = {
  'Timeline Line': { kind: 'Box' },
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
    lineLeft: '19px',
    lineRight: 'auto',
  },
  'right': {
    lineLeft: 'auto',
    lineRight: '19px',
  },
};

const Line = ({
  alignDesktop,
  alignMobile,
  breakpoint,
  ...props
}) => {
  if (! (alignDesktop && alignMobile && breakpoint)) {
    return;
  }
  
  useMemo(() => {
    overrides['Timeline Line'].props = {
      [`${breakpoint}-left`]: styles[alignMobile].lineLeft,
      [`${breakpoint}-right`]: styles[alignMobile].lineRight,
    };
  }, [alignMobile, breakpoint]);
  
  const { override, rest } = useOverrides(props, overrides);
  
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
      {...rest}
    />
  );
};

export default Object.assign(Line, {
  title: 'Timeline Line',
  description: {
    en: 'Awesome Timeline Line component!',
  },
  overrides,
});
