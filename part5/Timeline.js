import React from 'react';
import atomize from '@quarkly/atomize';

const Wrapper = atomize.div({
  effects: { hover: ":hover" },
});

const Timeline = ({
	alignDesktop,
  alignMobile,
  breakpoint,
  children,
	...props
}) => {
  return (
		<Wrapper
      padding="30px 16px 0"
      width="100%"
      min-height="16px"
			flex-direction="column"
			box-sizing="border-box"
			position="relative"
      display="flex"
		  z-index="1"
      
      box-shadow="--xl"
      hover-box-shadow="--xxl"
      
      {...props}
    >
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
            index,
            alignDesktop,
            alignMobile,
            breakpoint,
          })
          : child
      )}
		</Wrapper>
	);
};

const propInfo = {
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
});
