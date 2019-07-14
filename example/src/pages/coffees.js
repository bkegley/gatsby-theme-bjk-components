/** @jsx jsx */
import React from 'react'
import {jsx, Flex, Box, Styled} from 'theme-ui'
import Layout from '../components/Layout'
import useLocalStorage from '../hooks/useLocalStorage'
import CoffeeCreateForm from '../components/CoffeeCreateForm'
import ConfirmDeleteForm from '../components/ConfirmDeleteForm'
import Button from '../components/Button'
import {Modal} from 'gatsby-theme-bjk-components'
import {Trash} from 'react-feather'

const CoffeeCard = ({coffee, sessions, toggleConfirmDeleteModal}) => {
  return (
    <Flex sx={{flexDirection: 'column', bg: 'white', borderRadius: '5px', p: 4, boxShadow: 'small'}}>
      <Flex sx={{alignItems: 'center'}}>
        <Styled.h4 sx={{flex: 1}}>{coffee.name}</Styled.h4>
        <Box sx={{color: 'red', opacity: 0.5, ':hover': {opacity: 1}}} onClick={toggleConfirmDeleteModal}>
          <Trash />
        </Box>
      </Flex>
      <Box>
        {sessions.length} session{sessions.length > 1 ? 's' : ''}
      </Box>
      <Box>{coffee.notes}</Box>
    </Flex>
  )
}

const Coffees = () => {
  const [showCreateCoffeeModal, setShowCreateCoffeeModal] = React.useState(false)
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = React.useState(false)
  const [coffees, setCoffees] = useLocalStorage('coffees', [])
  const [sessions] = useLocalStorage('sessions', [])

  const toggleCreateCoffeeModal = () => setShowCreateCoffeeModal(old => !old)

  // store the coffee being deleted in local state until confirmed or cancelled
  const [coffeeToDelete, setCoffeeToDelete] = React.useState(null)
  const toggleConfirmDeleteModal = id => {
    setShowConfirmDeleteModal(old => !old)
    setCoffeeToDelete(coffeeToDelete ? null : id)
  }
  const confirmDelete = () => {
    setCoffees(coffees.filter(coffee => coffee.id !== coffeeToDelete))
    setCoffeeToDelete(null)
    setShowConfirmDeleteModal(false)
  }

  return (
    <Layout>
      {showCreateCoffeeModal ? (
        <Modal onClickOutside={toggleCreateCoffeeModal}>
          <Box sx={{p: 4}}>
            <CoffeeCreateForm coffees={coffees} setCoffees={setCoffees} onClickOutside={toggleCreateCoffeeModal} />
          </Box>
        </Modal>
      ) : null}
      {showConfirmDeleteModal ? (
        <Modal onClickOutside={toggleConfirmDeleteModal}>
          <Box sx={{px: 4, mb: 4}}>
            <ConfirmDeleteForm
              confirmDelete={confirmDelete}
              onClickOutside={() => toggleConfirmDeleteModal(coffeeToDelete)}
            />
          </Box>
        </Modal>
      ) : null}
      <Styled.h2 sx={{flex: 1}}>Coffees</Styled.h2>
      <Flex sx={{flexDirection: 'column'}}>
        <Box sx={{alignSelf: 'flex-end', my: 3}}>
          <Button variant="secondary" type="button" onClick={toggleCreateCoffeeModal}>
            <Flex sx={{alignItems: 'center'}}>
              <span>Add Coffee</span>
            </Flex>
          </Button>
        </Box>
        {coffees.length ? (
          coffees.map(coffee => {
            const coffeeSessions = sessions.filter(session => session.coffee === coffee.id)
            return (
              <Box sx={{my: 2, minWidth: 250}}>
                <CoffeeCard
                  coffee={coffee}
                  sessions={coffeeSessions}
                  toggleConfirmDeleteModal={() => toggleConfirmDeleteModal(coffee.id)}
                />
              </Box>
            )
          })
        ) : (
          <Box>Looks like you don't have any coffees!</Box>
        )}
      </Flex>
    </Layout>
  )
}

export default Coffees
