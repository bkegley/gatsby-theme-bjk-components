/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Formik, Form} from 'formik'
import {TextInput} from 'gatsby-theme-bjk-components'
import Button from './Button'

const RoasterCreateForm = ({roasters, setRoasters, onClickOutside}) => {
  return (
    <Formik
      initialValues={{name: '', id: roasters.length + 1}}
      onSubmit={(values, {setSubmitting}) => {
        setRoasters(roasters.concat(values))
        setSubmitting(false)

        // if form is in a modal close the modal
        if (onClickOutside) onClickOutside()
      }}
    >
      {() => {
        return (
          <Form>
            <TextInput formik name="name" />
            <Button type="submit">Submit</Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RoasterCreateForm
