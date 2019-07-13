import React from 'react'
import {Checkbox} from 'gatsby-theme-bjk-components'

const IndexPage = () => {
  const [checked, setChecked] = React.useState(false)
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <p>This is the home page</p>
      </div>
      <Checkbox toggleCheckbox={() => setChecked(old => !old)} checked={checked} />
    </div>
  )
}

export default IndexPage
