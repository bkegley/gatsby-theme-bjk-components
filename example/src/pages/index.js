/** @jsx jsx */
import React from 'react'
import {jsx, Flex, Box} from 'theme-ui'
import Layout from '../components/Layout'
import Button from '../components/Button'
import useTimer from '../hooks/useTimer'
import {animated, useTransition} from 'react-spring'
import useLocalStorage from '../hooks/useLocalStorage'
import {Dropdown} from 'gatsby-theme-bjk-components'

const BrewButton = () => {
  const {toggleTimer, isRunning} = useTimer()
  return (
    <Button onClick={toggleTimer}>
      <h1>{isRunning ? 'Stop' : 'Start'}</h1>
    </Button>
  )
}

const SectionOne = ({style, setSection}) => {
  return (
    <AnimatedBox style={style} sx={{position: 'absolute'}}>
      <Box sx={{textAlign: 'center'}}>
        <Box sx={{fontSize: 6}}>Welcome to </Box>
        <Box sx={{fontSize: 8, color: 'primary', mb: 5}}>brewd</Box>
        <Button type="button" onClick={() => setSection(1)}>
          Let's go!
        </Button>
      </Box>
    </AnimatedBox>
  )
}

const SectionTwo = ({style, setSection, setCoffee}) => {
  const [coffees] = useLocalStorage('coffees', [])
  return (
    <AnimatedBox style={style} sx={{position: 'absolute'}}>
      <Box sx={{textAlign: 'center'}}>
        <Box sx={{fontSize: 6}}>pick a coffee</Box>
        <Box sx={{my: 4}}>
          <Dropdown
            onChange={selection => console.log({selection})}
            name="coffee"
            options={coffees.map(coffee => ({text: coffee.name, value: coffee.id}))}
          />
        </Box>
        <Button type="button" onClick={() => setSection(2)}>
          Let's go!
        </Button>
      </Box>
    </AnimatedBox>
  )
}

const SectionThree = ({style, setSection}) => {
  return (
    <AnimatedBox style={style} sx={{position: 'absolute'}}>
      <Box sx={{textAlign: 'center'}}>
        <Box sx={{fontSize: 6}}>hey </Box>
        <Box sx={{fontSize: 8, color: 'primary'}}>brewd</Box>
        <Box sx={{mt: 5, mb: 3}}>Let's get started</Box>
        <Button type="button" onClick={() => setSection(1)}>
          Let's go!
        </Button>
      </Box>
    </AnimatedBox>
  )
}

const AnimatedBox = animated(Box)

const sections = [
  props => <SectionOne {...props} />,
  props => <SectionTwo {...props} />,
  props => <SectionThree {...props} />,
]

const IndexPage = () => {
  const [section, setSection] = React.useState(0)
  const [coffee, setCoffee] = React.useState('')
  const [sessions, setSessions] = useLocalStorage('sessions', [])
  const transitions = useTransition(section, p => p, {
    from: {opacity: 0, transform: 'translate3d(200%,0,0)'},
    enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
    leave: {opacity: 0, transform: 'translate3d(-200%,0,0)'},
  })
  const handleSubmit = () => {
    setSessions(
      sessions.concat({
        id: sessions.length + 1,
        coffee: coffee.id,
      }),
    )
  }
  return (
    <Layout>
      <Flex sx={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', mb: 6}}>
        {transitions.map(({item, props, key}) => {
          const Section = sections[item]
          return (
            <Section
              key={key}
              style={props}
              setSection={setSection}
              setCoffee={setCoffee}
              handleSubmit={handleSubmit}
            />
          )
        })}
      </Flex>
    </Layout>
  )
}

export default IndexPage
