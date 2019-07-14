import React from 'react'
import {TimerProvider} from './src/hooks/useTimer'

export const wrapRootElement = ({element}) => {
  return <TimerProvider>{element}</TimerProvider>
}
