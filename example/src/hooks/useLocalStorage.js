import React from 'react'

const useLocalStorage = (key, initialValue) => {
  let initialItem = initialValue
  if (typeof window !== 'undefined') {
    initialItem = JSON.parse(window.localStorage.getItem(key)) || initialValue
  }
  const [item, setItem] = React.useState(initialItem)

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(item))
  }, [item])

  return [item, setItem]
}

export default useLocalStorage
