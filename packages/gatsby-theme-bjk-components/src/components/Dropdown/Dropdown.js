/** @jsx jsx */
import {jsx, Box} from 'theme-ui'
import PropTypes from 'prop-types'
import {Field} from 'formik'
import Downshift from 'downshift'
import {X} from 'react-feather'

const ControllerButton = ({children, ...props}) => {
  return (
    <button
      sx={{
        backgroundColor: 'transparent',
        border: 'none',
        position: 'absolute',
        right: 0,
        top: 0,
        cursor: 'pointer',
        width: '47px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
    >
      {children}
    </button>
  )
}

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

const StyledDropdownInput = ({isOpen, ...props}) => {
  return (
    <input
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
          borderColor: isOpen ? 'primary' : 'gray',
          transition: 'box-shadow 0.1s ease, width 0.1s ease',
          borderBottom: isOpen ? 'none' : null,
          borderBottomLeftRadius: isOpen ? 0 : null,
          borderBottomRightRadius: isOpen ? 0 : null,

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

const StyledMenu = ({children, innerRef, isOpen, ...props}) => {
  return (
    <ul
      ref={innerRef}
      sx={{
        padding: '0px',
        mt: '0px',
        position: 'absolute',
        bg: 'white',
        width: '100%',
        maxHeight: '20rem',
        overflowY: 'auto',
        overflowX: 'hidden',
        outline: 'none',
        transition: 'opacity 0.1s ease',
        borderColor: 'primary',
        borderTopWidth: '0px',
        borderRightWidth: '1px',
        borderBottomWidth: '1px',
        borderLeftWidth: '1px',
        borderStyle: 'solid',
        border: isOpen ? null : 'none',
        zIndex: 1,
      }}
      {...props}
    >
      {children}
    </ul>
  )
}

const StyledMenuOption = ({children, ...props}) => {
  return (
    <li
      sx={{
        position: 'relative',
        cursor: 'pointer',
        display: 'block',
        border: 'none',
        height: 'auto',
        textAlign: 'left',
        borderTop: 'none',
        lineHeight: '1em',
        color: 'black',
        fontSize: '1rem',
        boxShadow: 'none',
        padding: '0.8rem 1.1rem',
      }}
      {...props}
    >
      {children}
    </li>
  )
}

const DropdownInner = ({
  field,
  form,
  options = [],
  label,
  placeholder,
  formik,
  search,
  onChange = () => {},
  initialSelectedItem,
  onCreateNew,
  allowDelete = true,
  css,
  ...props
}) => {
  return (
    <Downshift
      onChange={async selection => {
        // if dropdown is Create New handle createNew case
        if (onCreateNew && selection && selection.value === '__createNew') {
          selection.clearSelection()
          onCreateNew()

          // if dropdown is formik input handle case
        } else if (formik) {
          let newFieldValue
          // handle multi select dropdown
          if (Array.isArray(field.value)) {
            // don't add selection if already exists
            const selectionExists = selection && field.value.find(value => value === selection.value)
            newFieldValue = selectionExists
              ? field.value
              : selection
              ? field.value.concat(selection.value)
              : field.value
            // handle normal dropdown
          } else {
            newFieldValue = selection ? selection.value : ''
          }
          await form.setFieldValue(field.name, newFieldValue)
          onChange(selection)

          // if dropdown is a normal controlled input handle case
        } else {
          onChange(selection)
        }
      }}
      itemToString={item => (item ? item.text : '')}
      initialSelectedItem={
        initialSelectedItem
          ? typeof initialSelectedItem === 'string'
            ? options.find(option => option.value === initialSelectedItem)
            : initialSelectedItem
          : field && field.value
          ? options.find(option => option.value === field.value)
          : ''
      }
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getRootProps,
        inputValue,
        isOpen,
        highlightedIndex,
        selectedItem,
        openMenu,
        clearSelection,
      }) => {
        const createNewOptions = onCreateNew ? [{text: '-- Create New --', value: '__createNew', clearSelection}] : []
        return (
          <div {...getRootProps()}>
            <label {...getLabelProps()}>{label}</label>
            <Box sx={{position: 'relative'}} {...props}>
              <Box>
                <StyledDropdownInput
                  {...getInputProps({
                    onFocus: openMenu,
                    isOpen,
                    placeholder,
                  })}
                />
                {selectedItem && allowDelete ? (
                  <ControllerButton type="button" onClick={() => clearSelection()}>
                    <X />
                  </ControllerButton>
                ) : null}
              </Box>
              <StyledMenu {...getMenuProps({refKey: 'innerRef', isOpen})}>
                {isOpen
                  ? createNewOptions
                      .concat(
                        options.filter(({text}) =>
                          search ? text.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 : true,
                        ),
                      )
                      .map((item, index) => {
                        return (
                          <StyledMenuOption
                            key={item.value}
                            {...getItemProps({
                              index,
                              item,
                              style: {
                                backgroundColor: highlightedIndex === index ? 'lightgray' : null,
                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                              },
                            })}
                          >
                            {item.text}
                          </StyledMenuOption>
                        )
                      })
                  : null}
              </StyledMenu>
            </Box>
          </div>
        )
      }}
    </Downshift>
  )
}

DropdownInner.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  initialSelectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  onCreateNew: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  formik: PropTypes.bool,
  name: PropTypes.string,
  allowDelete: PropTypes.bool,
  search: PropTypes.bool,
}

const Dropdown = ({formik = false, ...props}) => {
  return formik ? (
    <Field {...props} component={formikProps => <DropdownInner formik={formik} {...props} {...formikProps} />} />
  ) : (
    <DropdownInner {...props} />
  )
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  initialSelectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  onCreateNew: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.node,
  formik: PropTypes.bool,
  name: PropTypes.string,
  allowDelete: PropTypes.bool,
  search: PropTypes.bool,
}

export default Dropdown
