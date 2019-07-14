/** @jsx jsx */
import React from 'react'
import {jsx, Flex, Box, Styled} from 'theme-ui'
import Layout from '../components/Layout'
import useLocalStorage from '../hooks/useLocalStorage'
import ConfirmDeleteForm from '../components/ConfirmDeleteForm'
import Button from '../components/Button'
import {Modal} from 'gatsby-theme-bjk-components'
import {Trash} from 'react-feather'

const SessionCard = ({session, coffee, toggleConfirmDeleteModal}) => {
  return (
    <Flex sx={{flexDirection: 'column', bg: 'white', borderRadius: '5px', p: 4, boxShadow: 'small'}}>
      <Flex sx={{alignItems: 'center'}}>
        <Styled.h4 sx={{flex: 1}}>{coffee.name}</Styled.h4>
        <Box sx={{color: 'red', opacity: 0.5, ':hover': {opacity: 1}}} onClick={toggleConfirmDeleteModal}>
          <Trash />
        </Box>
      </Flex>
      <Box>{session.notes}</Box>
    </Flex>
  )
}

const Sessions = () => {
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = React.useState(false)
  const [sessions, setSessions] = useLocalStorage('sessions', [])
  const [coffees] = useLocalStorage('coffees', [])

  // store the session being deleted in local state until confirmed or cancelled
  const [sessionToDelete, setSessionToDelete] = React.useState(null)
  const toggleConfirmDeleteModal = id => {
    setShowConfirmDeleteModal(old => !old)
    setSessionToDelete(sessionToDelete ? null : id)
  }
  const confirmDelete = () => {
    setSessions(sessions.filter(session => session.id !== sessionToDelete))
    setSessionToDelete(null)
    setShowConfirmDeleteModal(false)
  }

  return (
    <Layout>
      {showConfirmDeleteModal ? (
        <Modal onClickOutside={toggleConfirmDeleteModal}>
          <Box sx={{px: 4, mb: 4}}>
            <ConfirmDeleteForm
              confirmDelete={confirmDelete}
              onClickOutside={() => toggleConfirmDeleteModal(sessionToDelete)}
            />
          </Box>
        </Modal>
      ) : null}
      <Styled.h2 sx={{flex: 1}}>Sessions</Styled.h2>
      <Flex sx={{flexDirection: 'column'}}>
        {sessions.length ? (
          sessions.map(session => {
            const coffee = coffees.find(coffee => coffee.id === session.coffee)
            return (
              <Box sx={{my: 2, minWidth: 250}}>
                <SessionCard
                  session={session}
                  coffee={coffee}
                  toggleConfirmDeleteModal={() => toggleConfirmDeleteModal(session.id)}
                />
              </Box>
            )
          })
        ) : (
          <Box>Looks like you don't have any sessions!</Box>
        )}
      </Flex>
    </Layout>
  )
}

export default Sessions
