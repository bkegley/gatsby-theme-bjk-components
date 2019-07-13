/** @jsx jsx */
import React from 'react'
import {jsx, Flex, Box} from 'theme-ui'
import PropTypes from 'prop-types'
import {X} from 'react-feather'
import useComponentSize from '../../utils/useComponentSize'
import {animated, useTransition} from 'react-spring'

const getStylesForFullScreen = (fullScreen = false) => {
  if (fullScreen) {
    return `
      min-width: 100%;
      min-height: 100%;
      top: 0;
      left: 0;
    `
  }
  return
}

const ModalBackground = ({children, ...props}) => {
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
        backgroundColor: 'black',
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

const ModalWrapper = ({children, ...props}) => {
  return (
    <Box
      sx={Object.assign(
        {
          zIndex: 100,
          overflow: 'auto',
          position: 'fixed',
          top: `calc(50% - ${props.componentHeight / 2}px)`,
          left: `calc(50% - ${props.componentWidth / 2}px)`,
        },
        getStylesForFullScreen(props.fullScreen),
      )}
      {...props}
    >
      {children}
    </Box>
  )
}

const AnimatedModalBackground = animated(ModalBackground)
const AnimatedModalWrapper = animated(ModalWrapper)

const Modal = ({
  children,
  onClickOutside,
  variant = 'header',
  sx = {bg: 'white', width: ['90%', '75%', 'fit-content', 'fit-content']},
  ...props
}) => {
  const [show] = React.useState(true)
  const backgroundTransitions = useTransition(show, null, {
    from: {opacity: 0},
    enter: {opacity: 0.5},
    leave: {opacity: 0},
  })

  const modalTransitions = useTransition(show, null, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
  })
  const handleKeyDown = e => {
    if (e.code === 'Escape') onClickOutside()
  }
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  const ref = React.useRef(null)
  const {height: componentHeight, width: componentWidth} = useComponentSize(ref)

  return (
    <>
      {backgroundTransitions.map(
        ({item, key, props: animatedProps}) =>
          item && <AnimatedModalBackground onClick={onClickOutside} style={animatedProps} key={key} />,
      )}
      {modalTransitions.map(
        ({item, key, props: animatedProps}) =>
          item && (
            <AnimatedModalWrapper
              style={animatedProps}
              key={key}
              sx={sx}
              {...props}
              componentHeight={componentHeight}
              componentWidth={componentWidth}
            >
              <div ref={ref}>
                <Flex sx={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ...sx}}>
                  <Box sx={{alignSelf: 'flex-end', p: 2, cursor: 'pointer'}}>
                    <X onClick={onClickOutside} />
                  </Box>
                  <Box>{children}</Box>
                </Flex>
              </div>
            </AnimatedModalWrapper>
          ),
      )}
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['header', 'bare']),
  fullScreen: PropTypes.bool,
}

export default Modal
