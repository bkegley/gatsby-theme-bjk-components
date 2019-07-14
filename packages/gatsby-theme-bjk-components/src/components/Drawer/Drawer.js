/** @jsx jsx */
import React from 'react'
import {jsx, Flex, Box} from 'theme-ui'
import PropTypes from 'prop-types'
import {X} from 'react-feather'
import {animated, useTransition} from 'react-spring'

const getStylesForDrawerOpenFrom = from => {
  switch (from) {
    case 'top': {
      return {
        width: '100%',
        maxHeight: '90%',
        top: 0,
        left: 0,
      }
    }
    case 'right': {
      return {
        height: '100%',
        maxWidth: '90%',
        top: 0,
        right: 0,
      }
    }
    case 'bottom': {
      return {
        width: '100%',
        maxHeight: '90%',
        bottom: 0,
        left: 0,
      }
    }
    case 'left': {
      return {
        height: '100%',
        maxWidth: '90%',
        top: 0,
        left: 0,
      }
    }
  }
}

const DrawerBackground = ({children, ...props}) => {
  return (
    <Box
      sx={{
        zIndex: 100,
        position: 'fixed',
        overflow: 'auto',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: 0.5,
        bg: 'black',
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

const DrawerWrapper = ({children, ...props}) => {
  return (
    <Box
      sx={Object.assign(
        {
          zIndex: 100,
          overflow: 'auto',
          position: 'fixed',
        },
        getStylesForDrawerOpenFrom(props.from),
      )}
      {...props}
    >
      {children}
    </Box>
  )
}

const AnimatedDrawerBackground = animated(DrawerBackground)
const AnimatedDrawerWrapper = animated(DrawerWrapper)

const getDrawerAnimationStyles = from => {
  switch (from) {
    case 'top': {
      return {
        from: {marginTop: '-100%'},
        enter: {marginTop: '0px'},
        leave: {marginTop: '-100%'},
      }
    }
    case 'right': {
      return {
        from: {marginRight: '-100%'},
        enter: {marginRight: '0px'},
        leave: {marginRight: '-100%'},
      }
    }
    case 'bottom': {
      return {
        from: {marginBottom: '-100%'},
        enter: {marginBottom: '0px'},
        leave: {marginBottom: '-100%'},
      }
    }
    case 'left': {
      return {
        from: {marginLeft: '-100%'},
        enter: {marginLeft: '0px'},
        leave: {marginLeft: '-100%'},
      }
    }
    default: {
      {
      }
    }
  }
}

const Drawer = React.memo(
  ({children, onClickOutside, variant = 'header', bg = 'white', width = ['90%', '75%', 'fit-content'], ...props}) => {
    const [toggleActive, setToggleActive] = React.useState(false)
    const handleKeyDown = e => {
      if (e.code === 'Escape' && props.open) onClickOutside()
    }
    React.useEffect(() => {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    })

    const drawerTransitions = useTransition(props.open, null, getDrawerAnimationStyles(props.from))

    const backgroundTransitions = useTransition(props.open, null, {
      from: {opacity: 0},
      enter: {opacity: 0.5},
      leave: {opacity: 0},
      onRest: () => setToggleActive(true),
    })

    return (
      <>
        {backgroundTransitions.map(
          ({item, key, props: animatedProps}) =>
            item && (
              <AnimatedDrawerBackground
                style={animatedProps}
                key={key}
                onClick={
                  toggleActive
                    ? () => {
                        setToggleActive(false)
                        onClickOutside()
                      }
                    : null
                }
              />
            ),
        )}
        {drawerTransitions.map(
          ({item, key, props: animatedProps}) =>
            item && (
              <AnimatedDrawerWrapper
                style={animatedProps}
                key={key}
                sx={{bg: bg, width: props.from === 'top' || props.from === 'bottom' ? null : width}}
                {...props}
              >
                <Flex sx={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  {variant === 'bare' ? null : (
                    <Box
                      sx={{
                        cursor: 'pointer',
                        p: 2,
                        alignSelf: `flex-${props.from === 'right' ? 'start' : 'end'}`,
                      }}
                    >
                      <X onClick={onClickOutside} />
                    </Box>
                  )}
                  <Box sx={{width: '100%'}}>{children}</Box>
                </Flex>
              </AnimatedDrawerWrapper>
            ),
        )}
      </>
    )
  },
)

Drawer.displayName = 'Drawer'

Drawer.propTypes = {
  children: PropTypes.element.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['header', 'bare']),
}

export default Drawer
