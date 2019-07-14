/** @jsx jsx */
import {jsx} from 'theme-ui'

const getVariantStyles = variant => {
  switch (variant) {
    case 'primary': {
      return {
        bg: 'primary',
        color: 'white',
      }
    }
    case 'secondary': {
      return {
        borderColor: 'primary',
        borderWidth: 1,
        borderStyle: 'solid',
        color: 'primary',
        bg: 'white',
      }
    }
    default: {
      return {
        bg: 'primary',
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
        getVariantStyles(props.variant),
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
