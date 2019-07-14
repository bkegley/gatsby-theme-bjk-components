/** @jsx jsx */
import React from 'react'
import {jsx, Flex, Box} from 'theme-ui'
import Layout from '../components/Layout'
import useLocalStorage from '../hooks/useLocalStorage'
import CoffeeCreateForm from '../components/CoffeeCreateForm'
import CoffeeCard from '../components/CoffeeCard'
import {ChevronDown, ChevronUp} from 'react-feather'
import Button from '../components/Button'

const Coffees = () => {
  const [showCreateCoffee, setShowCreateCoffee] = React.useState(false)
  const [coffees, setCoffees] = useLocalStorage('coffees', [])
  return (
    <Layout>
      <h1>Coffees!</h1>
      <Flex sx={{flexDirection: 'column'}}>
        <Box sx={{alignSelf: 'flex-end', my: 3}}>
          <Button variant="secondary" type="button" onClick={() => setShowCreateCoffee(old => !old)}>
            <Flex sx={{alignItems: 'center'}}>
              <span>Add Coffee</span>
              {showCreateCoffee ? <ChevronUp /> : <ChevronDown />}
            </Flex>
          </Button>
        </Box>
        {showCreateCoffee ? <CoffeeCreateForm coffees={coffees} setCoffees={setCoffees} /> : null}
        {coffees.length ? (
          coffees.map(coffee => {
            return (
              <Box sx={{my: 2, minWidth: 250}}>
                <CoffeeCard coffee={coffee} />
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
