/** @jsx jsx */
import {jsx} from 'theme-ui'
import useTimer from '../hooks/useTimer'

const Example = () => {
  const {time} = useTimer()
  return (
    <div>
      <pre>{JSON.stringify(time, null, 2)}</pre>
    </div>
  )
}

export default Example
