/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from '../components/Layout'
import useLocalStorage from '../hooks/useLocalStorage'

const Sessions = () => {
  const sessions = useLocalStorage('sessions', [])
  return (
    <Layout>
      <h1>Sessions!</h1>
    </Layout>
  )
}

export default Sessions
