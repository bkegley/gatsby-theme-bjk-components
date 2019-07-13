import React from 'react'
import {Checkbox, Dropdown, TextInput, TextArea} from 'gatsby-theme-bjk-components'
import {Formik, Form} from 'formik'

const IndexPage = () => {
  const [checked, setChecked] = React.useState(false)
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <p>This is the home page</p>
      </div>
      <Checkbox toggleCheckbox={() => setChecked(old => !old)} checked={checked} />
      <Formik initialValues={{input: 'hey', textarea: 'hey there you guys'}}>
        {({values}) => {
          return (
            <div>
              <Form>
                <TextInput formik name="input" />
                <div style={{width: '100%'}}>
                  <TextArea formik name="textarea" rows={10} />
                </div>
                <div>
                  <Dropdown
                    formik
                    name="stage"
                    label="Stage"
                    options={[
                      {text: 'Lead', value: 'lead'},
                      {text: 'Lost', value: 'lost'},
                      {text: 'Current', value: 'current'},
                    ]}
                  />
                </div>
              </Form>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

export default IndexPage
