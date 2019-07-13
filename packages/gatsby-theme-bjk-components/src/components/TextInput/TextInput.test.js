import React from 'react'
import {render, fireEvent, act} from '@testing-library/react'
import TextInput from './TextInput'
import {Formik, Form} from 'formik'

describe('TextInput', () => {
  it('renders correctly', () => {
    render(<TextInput />)
  })

  it('handles uncontrolled state changes properly', () => {
    const initialValue = ''
    const changedValue = 'changed value!'

    const {getByTestId} = render(<TextInput data-testid="test" />)
    expect(getByTestId('test').value).toBe(initialValue)
    fireEvent.change(getByTestId('test'), {target: {value: changedValue}})
    expect(getByTestId('test').value).toBe(changedValue)
  })

  it('handles local state changes properly', () => {
    const initialValue = ''
    const changedValue = 'changed value!'

    const LocalStateInput = () => {
      const [value, setValue] = React.useState(initialValue)
      return (
        <div>
          <p data-testid="test-value">{value}</p>
          <TextInput data-testid="test-input" onChange={e => setValue(e.currentTarget.value)} />
        </div>
      )
    }
    const {getByTestId} = render(<LocalStateInput />)

    // confirm proper initial state
    expect(getByTestId('test-value').innerHTML).toBe(initialValue)

    // confirm proper state management on change
    act(() => {
      fireEvent.change(getByTestId('test-input'), {target: {value: changedValue}})
    })
    expect(getByTestId('test-value').innerHTML).toBe(changedValue)
  })

  it('throws an error when it has the formik prop without formik context', () => {
    expect(() => render(<TextInput formik />)).toThrow()
  })

  it('correctly updates formik state', () => {
    const initialValue = 'initial value'
    const changedValue = 'changed value'
    const {getByTestId} = render(
      <Formik
        initialValues={{
          input: initialValue,
        }}
      >
        {({values}) => {
          return (
            <div>
              <p data-testid="test-value">{values.input}</p>

              <Form>
                <TextInput formik name="input" data-testid="test-input" />
              </Form>
            </div>
          )
        }}
      </Formik>,
    )

    // confirm proper initial state
    expect(getByTestId('test-value').innerHTML).toBe(initialValue)

    // confirm proper state management on change
    act(() => {
      fireEvent.change(getByTestId('test-input'), {target: {value: changedValue}})
    })
    expect(getByTestId('test-value').innerHTML).toBe(changedValue)
  })
})
