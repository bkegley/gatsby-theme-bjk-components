/** @jsx jsx */
import {jsx} from 'theme-ui'

const getVariantStyles = props => {
  switch (props.variant) {
    case 'primary': {
      return {
        bg: props.disabled ? 'muted' : 'primary',
        color: 'white',
      }
    }
    case 'secondary': {
      return {
        borderColor: 'primary',
        borderWidth: 1,
        borderStyle: 'solid',
        color: 'primary',
        bg: props.disabled ? 'lightgrey' : 'white',
      }
    }
    default: {
      return {
        bg: props.disabled ? 'muted' : 'primary',
        color: 'white',
      }
    }
  }
}

const Button = ({children, ...props}) => {
  return (
    <button
      sx={Object.assign(
        {
          px: 3,
          py: 2,
          fontSize: 3,
          border: 'none',
          textTransform: 'uppercase',
          ':hover': {
            boxShadow: 'default',
          },
        },
        getVariantStyles(props),
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
