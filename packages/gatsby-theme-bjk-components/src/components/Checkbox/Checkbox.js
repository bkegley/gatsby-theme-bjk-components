/** @jsx jsx */
import {jsx, Box} from 'theme-ui'
import PropTypes from 'prop-types'
import {Field} from 'formik'
import {Check} from 'react-feather'

const disabledStyle = {
  borderColor: 'grey',
  cursor: 'default',
}

// CheckboxWrapper aligns the check inside the box and provides main styles
const CheckboxWrapper = ({children, ...props}) => {
  return (
    <Box
      sx={Object.assign(
        {
          height: props.size ? props.size : '1.5rem',
          width: props.size ? props.size : '1.5rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: props.checked ? props.color : 'black',
          borderRadius: '3px',
          transition: {
            borderColor: '0.15s ease-in,',
          },
          ':hover': {
            borderColor: props.disabled ? null : props.color,
          },
        },
        props.disabled ? disabledStyle : null,
      )}
      {...props}
    >
      {children}
    </Box>
  )
}

// StyledInput handles the value and registers clicks
const StyledInput = props => {
  return (
    <input
      sx={{
        position: 'absolute',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        opacity: 0,
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
      }}
      {...props}
    />
  )
}

const CheckboxInner = ({
  formik,
  field,
  form,
  toggleCheckbox,
  size,
  name,
  color = 'primary',
  disabled = false,
  checked,
  ...props
}) => {
  // return checked value from either formik or provided value in props
  const isChecked = formik ? field.value === true : checked
  return (
    <CheckboxWrapper disabled={disabled} checked={isChecked} color={color} size={size}>
      <StyledInput
        disabled={disabled}
        type="checkbox"
        name={name}
        // create onClick handler for either formik or from provided function in props
        onClick={() => {
          if (formik) {
            form.setFieldValue(field.name, !field.value)
          } else {
            toggleCheckbox()
          }
        }}
        {...props}
      />
      {isChecked ? <Check sx={{color: color}} size={size} /> : null}
    </CheckboxWrapper>
  )
}

const Checkbox = ({formik, ...props}) => {
  // if component state is stored in formik wrap it in a formik Field and pass necessary props
  return formik ? (
    <Field component={formikProps => <CheckboxInner formik={formik} {...props} {...formikProps} />} {...props} />
  ) : (
    <CheckboxInner {...props} />
  )
}

Checkbox.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  toggleCheckbox: PropTypes.func,
}

export default Checkbox
