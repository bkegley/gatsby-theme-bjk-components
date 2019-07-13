/** @jsx jsx */
import React from 'react'
import {jsx} from 'theme-ui'
import {Field} from 'formik'

const getStylesFromVariantProp = variant => {
  switch (variant) {
    case 'compact': {
      return {
        padding: '.5rem',
      }
    }
    default: {
      return {
        padding: '1rem 2rem 1rem 1rem',
      }
    }
  }
}

const TextAreaInner = props => {
  return (
    <textarea
      sx={Object.assign(
        {
          width: '100%',
          outline: 0,
          fontSize: '1rem',
          wordWrap: 'break-word',
          display: 'inline-block',
          color: 'black',
          boxShadow: 'none',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'gray',
          transition: 'box-shadow 0.1s ease, width 0.1s ease',

          ':focus': {
            borderColor: 'primary',
          },
        },
        getStylesFromVariantProp(props.variant),
      )}
      {...props}
    />
  )
}

const TextArea = React.memo(({formik, ...props}) => {
  // allow adding additional onChange effects other than formik state updates
  const withFormikOnChange = ({props: {onChange = () => {}}, field, e}) => {
    onChange(e)
    field.onChange(e)
  }
  return formik ? (
    <Field
      component={({field, form}) => (
        <TextAreaInner {...props} {...field} {...form} onChange={e => withFormikOnChange({props, field, e})} />
      )}
      {...props}
    />
  ) : (
    <TextAreaInner {...props} />
  )
})

TextArea.displayName = 'TextArea'

export default TextArea
