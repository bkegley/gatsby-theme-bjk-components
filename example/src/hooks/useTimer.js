import React from 'react'

export const TimerContext = React.createContext({})

const UPDATE_TIME = 'UPDATE_TIME'
const TOGGLE_TIMER = 'TOGGLE_TIMER'
const RESET_TIMER = 'RESET_TIMER'
const ADD_TIMER_LAP = 'ADD_TIMER_LAP'

const initialState = {
  totalTime: 0,
  laps: [
    {
      startTime: 0,
    },
  ],
  isRunning: false,
}

const timerReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TIME: {
      return {
        ...state,
        totalTime: action.totalTime,
      }
    }
    case TOGGLE_TIMER: {
      return {
        ...state,
        isRunning: !state.isRunning,
      }
    }
    case RESET_TIMER: {
      return initialState
    }
    case ADD_TIMER_LAP: {
      if (!state.isRunning) {
        return state
      }
      return {
        ...state,
        laps: state.laps
          .map((lap, index) => {
            // add end time to last lap
            if (index === state.laps.length - 1) {
              return {
                ...lap,
                endTime: state.totalTime,
              }
            }
            return lap
          })
          .concat({startTime: state.totalTime}),
      }
    }
  }
}
export const TimerProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(timerReducer, initialState)

  React.useEffect(() => {
    let timerInterval
    if (state.isRunning) {
      timerInterval = setInterval(() => {
        dispatch({type: UPDATE_TIME, totalTime: state.totalTime + 1})
      }, 1000)
    }

    return () => clearInterval(timerInterval)
  }, [state.isRunning, state.totalTime])

  const toggleTimer = () => dispatch({type: TOGGLE_TIMER})
  const resetTimer = () => dispatch({type: RESET_TIMER})
  const addLap = () => dispatch({type: ADD_TIMER_LAP})

  const value = React.useMemo(
    () => ({
      toggleTimer,
      resetTimer,
      addLap,
      isRunning: state.isRunning,
      time: {totalTime: state.totalTime, laps: state.laps},
    }),
    [state.totalTime, state.isRunning],
  )
  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

const useTimer = () => {
  const context = React.useContext(TimerContext)
  if (!context) {
    throw new Error(`useTimer must be wrapped in a TimerProvider`)
  }
  return context
}

export default useTimer
