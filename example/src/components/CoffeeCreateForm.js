/** @jsx jsx */
import React from 'react'
import {jsx, Box, Flex} from 'theme-ui'
import {Formik, Form} from 'formik'
import {TextInput, Modal, TextArea, Dropdown} from 'gatsby-theme-bjk-components'
import Button from './Button'
import useLocalStorage from '../hooks/useLocalStorage'
import RoasterCreateForm from './RoasterCreateForm'

const CoffeeCreateForm = ({coffees, setCoffees, onClickOutside}) => {
  const [showCreateRoasterModal, setShowCreateRoasterModal] = React.useState(false)
  const toggleCreateRoasterModal = () => setShowCreateRoasterModal(old => !old)
  const [roasters, setRoasters] = useLocalStorage('roasters', [])
  return (
    <>
      {showCreateRoasterModal ? (
        <Modal onClickOutside={toggleCreateRoasterModal}>
          <Box sx={{p: 4}}>
            <RoasterCreateForm
              roasters={roasters}
              setRoasters={setRoasters}
              onClickOutside={toggleCreateRoasterModal}
            />
          </Box>
        </Modal>
      ) : null}
      <Formik
        initialValues={{
          name: '',
          notes: '',
          roaster: '',
          id: coffees.length + 1,
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setCoffees(coffees.concat(values))
          setSubmitting(false)
          resetForm()

          // if form is in a modal close the modal
          if (onClickOutside) onClickOutside()
        }}
      >
        {() => {
          return (
            <Form>
              <Flex sx={{flexDirection: 'column', mb: 4}}>
                <Flex sx={{flexDirection: ['column', 'column', 'row', 'row']}}>
                  <Box sx={{my: 2, flex: 1, mr: [0, 0, 3, 3]}}>
                    <label htmlFor="name">Name</label>
                    <TextInput formik name="name" id="name" />
                  </Box>
                  <Box sx={{my: 2, flex: 1}}>
                    <Dropdown
                      formik
                      name="roaster"
                      label="Roaster"
                      onCreateNew={toggleCreateRoasterModal}
                      options={roasters.map(roaster => ({text: roaster.name, value: roaster.id}))}
                    />
                  </Box>
                </Flex>
                <Box sx={{my: 2}}>
                  <label htmlFor="notes">Notes</label>
                  <TextArea formik name="notes" id="notes" rows={5} />
                </Box>
                <Box sx={{alignSelf: 'flex-end'}}>
                  <Button type="submit">Submit</Button>
                </Box>
              </Flex>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default CoffeeCreateForm
