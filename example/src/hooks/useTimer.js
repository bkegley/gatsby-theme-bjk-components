import React from 'react'

export const TimerContext = React.createContext({})

const UPDATE_TIME = 'UPDATE_TIME'
const TOGGLE_TIMER = 'TOGGLE_TIMER'
const RESET_TIMER = 'RESET_TIMER'
const ADD_TIMER_SPLIT = 'ADD_TIMER_SPLIT'
const START_SESSION = 'START_SESSION'
const RESET_SESSION = 'RESET_SESSION'

const initialState = {
  totalTime: 0,
  splits: [
    {
      startTime: 0,
    },
  ],
  isRunning: false,
  session: null,
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
      return {
        ...state,
        totalTime: initialState.totalTime,
        splits: initialState.splits,
        isRunning: initialState.isRunning,
      }
    }

    case ADD_TIMER_SPLIT: {
      if (!state.isRunning) {
        return state
      }
      return {
        ...state,
        splits: state.splits
          .map((split, index) => {
            // add end time to last split
            if (index === state.splits.length - 1) {
              return {
                ...split,
                endTime: state.totalTime,
              }
            }
            return split
          })
          .concat({startTime: state.totalTime}),
      }
    }

    case START_SESSION: {
      return {
        ...state,
        session: {
          id: action.id,
          coffee: action.coffee,
        },
      }
    }

    case RESET_SESSION: {
      return {
        ...state,
        session: initialState.session,
      }
    }

    default: {
      throw new Error('Please provide a valid action type')
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
  const addSplit = () => dispatch({type: ADD_TIMER_SPLIT})
  const startSession = ({id, coffee}) => dispatch({type: START_SESSION, id, coffee})
  const resetSession = () => dispatch({type: RESET_SESSION})

  const value = React.useMemo(
    () => ({
      toggleTimer,
      resetTimer,
      addSplit,
      startSession,
      resetSession,
      session: state.session,
      isRunning: state.isRunning,
      time: {totalTime: state.totalTime, splits: state.splits},
    }),
    [state.totalTime, state.isRunning, state.session],
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
