/** @jsx jsx */
import React from 'react'
import {jsx, Flex, Box} from 'theme-ui'
import Layout from '../components/Layout'
import Button from '../components/Button'
import useTimer from '../hooks/useTimer'
import {animated, useTransition} from 'react-spring'
import useLocalStorage from '../hooks/useLocalStorage'
import {Dropdown, Modal} from 'gatsby-theme-bjk-components'
import CoffeeCreateForm from '../components/CoffeeCreateForm'

const convertSecondsToTimeString = seconds => new Date(seconds * 1000).toISOString().substr(14, 5)

const SectionOne = ({style, setSection}) => {
  const {session} = useTimer()

  React.useEffect(() => {
    if (session) setSection(2)
  }, [])
  return (
    <AnimatedBox style={style} sx={{position: 'absolute', top: '30vh'}}>
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

const SectionTwo = ({style, setSection, coffee, setCoffee}) => {
  const [localStorageCoffees, setLocalStorageCoffees] = useLocalStorage('coffees', [])
  const [showModal, setShowModal] = React.useState(false)
  const toggleModal = () => setShowModal(old => !old)
  return (
    <>
      {showModal ? (
        <Modal onClickOutside={toggleModal}>
          <Box sx={{p: 4}}>
            <CoffeeCreateForm
              coffees={localStorageCoffees}
              setCoffees={setLocalStorageCoffees}
              onClickOutside={toggleModal}
            />
          </Box>
        </Modal>
      ) : null}
      <AnimatedBox style={style} sx={{position: 'absolute', top: '30vh'}}>
        <Box sx={{textAlign: 'center'}}>
          <Box sx={{fontSize: 6}}>pick a coffee</Box>
          <Box sx={{my: 4}}>
            <Dropdown
              onChange={selection => setCoffee(selection ? selection.value : null)}
              onCreateNew={toggleModal}
              name="coffee"
              initialSelectedItem={coffee}
              options={localStorageCoffees.map(coffee => ({text: coffee.name, value: coffee.id}))}
            />
          </Box>
          <Button type="button" disabled={coffee ? false : true} onClick={() => setSection(2)}>
            Let's go!
          </Button>
        </Box>
      </AnimatedBox>
    </>
  )
}

const SectionThree = ({style, coffee}) => {
  const [sessions, setSessions] = useLocalStorage('sessions', [])
  const {time, isRunning, session, startSession, toggleTimer, resetTimer, resetSession} = useTimer()

  const handleSubmit = () => {
    setSessions(
      sessions.concat({
        ...session,
        ...time,
      }),
    )
    resetTimer()
    resetSession()
  }
  return (
    <AnimatedBox style={style} sx={{position: 'absolute', top: '30vh'}}>
      <Box sx={{textAlign: 'center'}}>
        <Box sx={{fontSize: 8, color: 'primary', mb: 5}}>
          {isRunning ? convertSecondsToTimeString(time.totalTime) : session ? 'save?' : 'ready?'}
        </Box>
        {session && !isRunning ? (
          <Box>
            <Button onClick={handleSubmit}>
              <h1>Save</h1>
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              onClick={() => {
                toggleTimer()
                if (!session) startSession({id: sessions.length + 1, coffee})
              }}
            >
              <h1>{isRunning ? 'Stop' : 'Start'}</h1>
            </Button>
          </Box>
        )}
        {session && !isRunning ? (
          <Flex sx={{mt: 5, flexDirection: ['column', 'column', 'row', 'row'], alignItems: 'center'}}>
            <Box sx={{mx: [0, 0, 4, 4], my: [3, 3, 0, 0]}}>
              <Button type="button" variant="secondary" onClick={toggleTimer}>
                Continue
              </Button>
            </Box>
            <Box sx={{mx: [0, 0, 4, 4], my: [3, 3, 0, 0]}}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  resetTimer()
                  resetSession()
                }}
              >
                Reset
              </Button>
            </Box>
          </Flex>
        ) : null}
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
  const [coffee, setCoffee] = React.useState(null)
  const transitions = useTransition(section, p => p, {
    from: {opacity: 0, transform: 'translate3d(200%,0,0)'},
    enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
    leave: {opacity: 0, transform: 'translate3d(-200%,0,0)'},
  })

  return (
    <Layout>
      <Flex sx={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', mb: 6}}>
        {transitions.map(({item, props, key}) => {
          const Section = sections[item]
          return <Section key={key} style={props} setSection={setSection} setCoffee={setCoffee} coffee={coffee} />
        })}
      </Flex>
    </Layout>
  )
}

export default IndexPage
